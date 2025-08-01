import { Strings } from '../constants/strings';
import { ValidationErrors, ValidationRule } from '../types';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateField = (
  value: string,
  rules: ValidationRule[],
  fieldName: string
): string | null => {
  for (const rule of rules) {
    // Required validation
    if (rule.required && (!value || value.trim().length === 0)) {
      return Strings.validation.required;
    }

    // Skip other validations if value is empty and not required
    if (!value || value.trim().length === 0) {
      continue;
    }

    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      return Strings.validation.minLength(rule.minLength);
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return Strings.validation.maxLength(rule.maxLength);
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return `ערך לא תקין עבור ${fieldName}`;
    }

    // Custom validation
    if (rule.custom) {
      const result = rule.custom(value);
      if (typeof result === 'string') {
        return result;
      }
      if (result === false) {
        return `ערך לא תקין עבור ${fieldName}`;
      }
    }
  }

  return null;
};

export const validateForm = (
  formData: Record<string, string>,
  validationRules: Record<string, ValidationRule[]>
): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(validationRules).forEach((fieldName) => {
    const value = formData[fieldName] || '';
    const rules = validationRules[fieldName];
    const error = validateField(value, rules, fieldName);
    
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
};

// Predefined validation rules
export const ValidationRules = {
  required: { required: true },
  title: [
    { required: true },
    { minLength: 3 },
    { maxLength: 100 }
  ] as ValidationRule[],
  details: [
    { required: true },
    { minLength: 10 },
    { maxLength: 1000 }
  ] as ValidationRule[],
  email: [
    { required: true },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
  ] as ValidationRule[],
  phone: [
    { required: true },
    { pattern: /^[\d\s\-\+\(\)]+$/ }
  ] as ValidationRule[]
}; 