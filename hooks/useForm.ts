import { ValidationErrors, ValidationRule } from '@/types';
import { validateField, validateForm } from '@/utils/validation';
import { useCallback, useState } from 'react';

interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: Record<keyof T, ValidationRule[]>;
  onSubmit?: (values: T) => void | Promise<void>;
}

interface UseFormReturn<T> {
  values: T;
  errors: ValidationErrors;
  loading: boolean;
  setValue: (field: keyof T, value: string) => void;
  setValues: (values: Partial<T>) => void;
  validateField: (field: keyof T) => string | null;
  validateForm: () => boolean;
  handleSubmit: () => Promise<void>;
  reset: () => void;
  hasErrors: boolean;
}

export function useForm<T extends Record<string, string>>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);

  const setValue = useCallback((field: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field as string]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  }, [errors]);

  const setValuesPartial = useCallback((newValues: Partial<T>) => {
    setValues(prev => ({ ...prev, ...newValues }));
  }, []);

  const validateFieldValue = useCallback((field: keyof T): string | null => {
    const fieldRules = validationRules[field];
    if (!fieldRules) return null;
    
    const value = values[field];
    return validateField(value, fieldRules, field as string);
  }, [values, validationRules]);

  const validateFormValues = useCallback((): boolean => {
    const newErrors = validateForm(values, validationRules);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validationRules]);

  const handleSubmit = useCallback(async () => {
    if (!onSubmit) return;

    const isValid = validateFormValues();
    if (!isValid) return;

    setLoading(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  }, [values, validateFormValues, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setLoading(false);
  }, [initialValues]);

  const hasErrors = Object.keys(errors).length > 0;

  return {
    values,
    errors,
    loading,
    setValue,
    setValues: setValuesPartial,
    validateField: validateFieldValue,
    validateForm: validateFormValues,
    handleSubmit,
    reset,
    hasErrors,
  };
} 