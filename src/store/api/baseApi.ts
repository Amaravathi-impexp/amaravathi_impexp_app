/**
 * RTK Query Base API Configuration
 * Defines the base API with authentication, error handling, and retry logic
 * 
 * NOTE: This uses the Trade Identity API as the base URL.
 * For Trade Operation endpoints, use full URLs in your queries.
 */

import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';
import { isRetryableError, getRetryDelay } from '../../utils/errorHandler';
import { config } from '../../config/env';

// Base query with authentication (uses Trade Identity API by default)
const baseQuery = fetchBaseQuery({
  baseUrl: config.apiEndpoints.tradeIdentity,
  timeout: config.api.timeout,
  prepareHeaders: (headers, { getState }) => {
    // Set Content-Type for JSON requests
    headers.set('Content-Type', 'application/json');
    
    // Get token from Redux state - with safety check
    const state = getState() as RootState;
    const token = state?.auth?.token;
    
    // If we have a token, add it to headers
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  },
});

// Custom retry function with exponential backoff
const customRetry = retry(
  async (args: any, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions);
    
    // Don't retry if error is not retryable
    if (result.error && !isRetryableError(result.error)) {
      // Stop retrying immediately
      retry.fail(result.error);
    }
    
    return result;
  },
  {
    maxRetries: config.api.maxRetries,
    backoff: (attempt: number) => {
      return new Promise((resolve) => {
        setTimeout(resolve, getRetryDelay(attempt));
      });
    },
  }
);

// Base API with retry logic and error handling
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  // Use retry wrapper for resilient API calls
  let result = await customRetry(args, api, extraOptions);
  
  // Handle 401 Unauthorized - logout user
  if (result.error && result.error.status === 401) {
    // Dispatch logout action
    api.dispatch({ type: 'auth/logout' });
  }
  
  return result;
};

/**
 * Base API Configuration
 * All API slices will extend from this
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Shipments', 'Partners', 'Users', 'Roles', 'Documents', 'Invoices', 'Dashboard', 'Countries', 'ProductTypes'],
  endpoints: () => ({}),
});