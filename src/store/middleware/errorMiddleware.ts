/**
 * Redux Middleware for Error Handling
 * Intercepts rejected actions and handles errors globally
 */

import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { parseApiError, errorLogger } from '../../utils/errorHandler';

/**
 * Error handling middleware
 * Logs all RTK Query errors and handles 401 authentication errors
 */
export const errorMiddleware: Middleware = (store) => (next) => (action) => {
  // Check if this is a rejected action from RTK Query
  if (isRejectedWithValue(action)) {
    const error = action.payload;
    
    // Parse and log the error
    const appError = parseApiError(error);
    errorLogger.log(appError);

    // Handle 401 - User session expired
    if (error?.status === 401) {
      // Dispatch logout action
      store.dispatch({ type: 'auth/logout' });
      
      // Clear all cached data
      store.dispatch({ type: 'api/util/resetApiState' });
    }

    // Note: Don't show notifications here as that would duplicate
    // notifications shown by individual components using useErrorHandler
    // Components should handle their own error notifications
  }

  return next(action);
};
