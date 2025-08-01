import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { Strings } from '../constants/strings';

export interface ErrorHandlerOptions {
  showAlert?: boolean;
  logError?: boolean;
  onError?: (error: Error) => void;
}

export function useErrorHandler(options: ErrorHandlerOptions = {}) {
  const [error, setError] = useState<Error | null>(null);
  const [isError, setIsError] = useState(false);

  const {
    showAlert = true,
    logError = true,
    onError,
  } = options;

  const handleError = useCallback((error: Error, customMessage?: string) => {
    const errorMessage = customMessage || error.message || Strings.common.error;
    
    setError(error);
    setIsError(true);

    if (logError) {
      console.error('Error occurred:', error);
    }

    if (showAlert) {
      Alert.alert(Strings.common.error, errorMessage);
    }

    if (onError) {
      onError(error);
    }
  }, [showAlert, logError, onError]);

  const clearError = useCallback(() => {
    setError(null);
    setIsError(false);
  }, []);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    customMessage?: string
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      handleError(error, customMessage);
      return null;
    }
  }, [handleError]);

  return {
    error,
    isError,
    handleError,
    clearError,
    handleAsyncError,
  };
} 