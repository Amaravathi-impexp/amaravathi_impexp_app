/**
 * Centralized Error Handler
 * Provides consistent error handling across the application
 */

import { config, isDevelopment, isDebugMode } from '../config/env';

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum ErrorCategory {
  NETWORK = 'network',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  VALIDATION = 'validation',
  API = 'api',
  RUNTIME = 'runtime',
  UNKNOWN = 'unknown',
}

export interface AppError {
  message: string;
  code?: string | number;
  category: ErrorCategory;
  severity: ErrorSeverity;
  timestamp: string;
  userMessage: string;
  technicalDetails?: any;
  stack?: string;
}

/**
 * Error Logger - Production-ready logging without console exposure
 * In production, this will send errors to monitoring service (Sentry, etc.)
 */
class ErrorLogger {
  private isDevelopment = isDevelopment();
  
  log(error: AppError): void {
    if (this.isDevelopment && config.logging.enableConsoleLogs) {
      // Development: Log to console for debugging
      console.error('[Error]', {
        message: error.message,
        category: error.category,
        severity: error.severity,
        timestamp: error.timestamp,
      });
      
      if (isDebugMode() && error.technicalDetails) {
        console.error('[Technical Details]', error.technicalDetails);
      }
    } else if (config.features.errorTracking) {
      // Production: Send to error monitoring service
      this.sendToMonitoringService(error);
    }
  }

  private sendToMonitoringService(error: AppError): void {
    // TODO: Integrate with Sentry or other monitoring service
    // Example:
    // if (config.services.sentry.dsn) {
    //   Sentry.captureException(new Error(error.message), {
    //     level: error.severity,
    //     tags: {
    //       category: error.category,
    //     },
    //     extra: error.technicalDetails,
    //   });
    // }
    
    // For now, store in session for debugging (not exposed in production builds)
    try {
      const errors = JSON.parse(sessionStorage.getItem('app_errors') || '[]');
      errors.push(error);
      // Keep only last 50 errors
      if (errors.length > 50) {
        errors.shift();
      }
      sessionStorage.setItem('app_errors', JSON.stringify(errors));
    } catch (e) {
      // Silent fail - don't break app if storage is full
    }
  }
}

export const errorLogger = new ErrorLogger();

/**
 * Parse API error response to extract meaningful error information
 */
export function parseApiError(error: any): AppError {
  const timestamp = new Date().toISOString();
  
  // Handle network errors
  if (!error.status && error.error === 'FETCH_ERROR') {
    return {
      message: 'Network connection failed',
      code: 'NETWORK_ERROR',
      category: ErrorCategory.NETWORK,
      severity: ErrorSeverity.HIGH,
      timestamp,
      userMessage: 'Unable to connect to the server. Please check your internet connection and try again.',
      technicalDetails: { originalError: error },
    };
  }

  // Handle timeout errors
  if (error.error === 'TIMEOUT_ERROR') {
    return {
      message: 'Request timed out',
      code: 'TIMEOUT',
      category: ErrorCategory.NETWORK,
      severity: ErrorSeverity.MEDIUM,
      timestamp,
      userMessage: 'The request took too long. Please try again.',
      technicalDetails: { originalError: error },
    };
  }

  // Handle 401 Unauthorized
  if (error.status === 401) {
    return {
      message: 'Authentication failed',
      code: 401,
      category: ErrorCategory.AUTHENTICATION,
      severity: ErrorSeverity.HIGH,
      timestamp,
      userMessage: 'Your session has expired. Please sign in again.',
      technicalDetails: { status: error.status },
    };
  }

  // Handle 403 Forbidden
  if (error.status === 403) {
    return {
      message: 'Access denied',
      code: 403,
      category: ErrorCategory.AUTHORIZATION,
      severity: ErrorSeverity.MEDIUM,
      timestamp,
      userMessage: 'You do not have permission to perform this action.',
      technicalDetails: { status: error.status },
    };
  }

  // Handle 404 Not Found
  if (error.status === 404) {
    return {
      message: 'Resource not found',
      code: 404,
      category: ErrorCategory.API,
      severity: ErrorSeverity.LOW,
      timestamp,
      userMessage: 'The requested resource could not be found.',
      technicalDetails: { status: error.status },
    };
  }

  // Handle 422 Validation Error
  if (error.status === 422) {
    const validationMessage = error.data?.message || 'Validation failed';
    return {
      message: validationMessage,
      code: 422,
      category: ErrorCategory.VALIDATION,
      severity: ErrorSeverity.MEDIUM,
      timestamp,
      userMessage: validationMessage,
      technicalDetails: { status: error.status, errors: error.data?.errors },
    };
  }

  // Handle 500 Internal Server Error
  if (error.status === 500) {
    return {
      message: 'Internal server error',
      code: 500,
      category: ErrorCategory.API,
      severity: ErrorSeverity.CRITICAL,
      timestamp,
      userMessage: 'An unexpected error occurred on the server. Our team has been notified.',
      technicalDetails: { status: error.status },
    };
  }

  // Handle other HTTP errors
  if (error.status) {
    return {
      message: error.data?.message || `HTTP ${error.status} error`,
      code: error.status,
      category: ErrorCategory.API,
      severity: ErrorSeverity.MEDIUM,
      timestamp,
      userMessage: error.data?.message || 'An error occurred while processing your request.',
      technicalDetails: { status: error.status, data: error.data },
    };
  }

  // Handle unknown errors
  return {
    message: error.message || 'Unknown error',
    code: 'UNKNOWN',
    category: ErrorCategory.UNKNOWN,
    severity: ErrorSeverity.MEDIUM,
    timestamp,
    userMessage: 'An unexpected error occurred. Please try again.',
    technicalDetails: { originalError: error },
  };
}

/**
 * Parse component/runtime errors
 */
export function parseRuntimeError(error: Error, errorInfo?: any): AppError {
  return {
    message: error.message,
    code: 'RUNTIME_ERROR',
    category: ErrorCategory.RUNTIME,
    severity: ErrorSeverity.HIGH,
    timestamp: new Date().toISOString(),
    userMessage: 'Something went wrong. Please refresh the page and try again.',
    technicalDetails: {
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
    },
    stack: error.stack,
  };
}

/**
 * Get user-friendly error message based on error type
 */
export function getUserFriendlyMessage(error: any): string {
  const appError = parseApiError(error);
  return appError.userMessage;
}

/**
 * Check if error should trigger user logout
 */
export function shouldLogout(error: any): boolean {
  return error?.status === 401;
}

/**
 * Check if error is retryable
 */
export function isRetryableError(error: any): boolean {
  // Retry network errors, timeouts, and 5xx server errors
  if (!error.status) return true; // Network error
  if (error.status >= 500 && error.status < 600) return true; // Server error
  if (error.error === 'TIMEOUT_ERROR') return true;
  
  return false;
}

/**
 * Get retry delay based on attempt number (exponential backoff)
 */
export function getRetryDelay(attemptNumber: number): number {
  const baseDelay = 1000; // 1 second
  const maxDelay = 10000; // 10 seconds
  
  const delay = Math.min(baseDelay * Math.pow(2, attemptNumber), maxDelay);
  
  // Add jitter to prevent thundering herd
  const jitter = Math.random() * 500;
  
  return delay + jitter;
}

/**
 * Sanitize error for logging (remove sensitive data)
 */
export function sanitizeError(error: any): any {
  if (!error) return error;
  
  // Create a copy to avoid mutating original
  const sanitized = { ...error };
  
  // Remove sensitive fields
  const sensitiveFields = [
    'password',
    'token',
    'refreshToken',
    'accessToken',
    'authorization',
    'cookie',
    'session',
  ];
  
  sensitiveFields.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]';
    }
    if (sanitized.data?.[field]) {
      sanitized.data[field] = '[REDACTED]';
    }
  });
  
  return sanitized;
}