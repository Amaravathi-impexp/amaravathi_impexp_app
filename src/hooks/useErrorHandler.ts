/**
 * Custom hook for error handling
 * Provides consistent error handling across components
 */

import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import {
  parseApiError,
  parseRuntimeError,
  errorLogger,
  getUserFriendlyMessage,
} from '../utils/errorHandler';

export function useErrorHandler() {
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Handle API errors
   */
  const handleApiError = useCallback(
    (error: any, customMessage?: string) => {
      const appError = parseApiError(error);
      
      // Log error
      errorLogger.log(appError);

      // Show user notification
      const message = customMessage || appError.userMessage;
      enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: appError.severity === 'critical' ? null : 5000,
      });

      return appError;
    },
    [enqueueSnackbar]
  );

  /**
   * Handle runtime errors
   */
  const handleRuntimeError = useCallback(
    (error: Error, errorInfo?: any, customMessage?: string) => {
      const appError = parseRuntimeError(error, errorInfo);
      
      // Log error
      errorLogger.log(appError);

      // Show user notification
      const message = customMessage || appError.userMessage;
      enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 5000,
      });

      return appError;
    },
    [enqueueSnackbar]
  );

  /**
   * Show success message
   */
  const showSuccess = useCallback(
    (message: string) => {
      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 3000,
      });
    },
    [enqueueSnackbar]
  );

  /**
   * Show info message
   */
  const showInfo = useCallback(
    (message: string) => {
      enqueueSnackbar(message, {
        variant: 'info',
        autoHideDuration: 3000,
      });
    },
    [enqueueSnackbar]
  );

  /**
   * Show warning message
   */
  const showWarning = useCallback(
    (message: string) => {
      enqueueSnackbar(message, {
        variant: 'warning',
        autoHideDuration: 4000,
      });
    },
    [enqueueSnackbar]
  );

  return {
    handleApiError,
    handleRuntimeError,
    showSuccess,
    showInfo,
    showWarning,
    getUserFriendlyMessage,
  };
}
