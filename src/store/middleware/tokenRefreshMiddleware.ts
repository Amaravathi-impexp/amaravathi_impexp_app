/**
 * Token Refresh Middleware
 * Automatically refreshes access token when it expires
 */

import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { setCredentials, logout } from '../slices/authSlice';
import { authApi } from '../api/authApi';

export const tokenRefreshMiddleware: Middleware<{}, RootState> = (store) => (next) => async (action) => {
  const result = next(action);
  
  // Check if we have auth state
  const state = store.getState();
  const { token, refreshToken, tokenExpiry } = state.auth;
  
  // If we have a token and it's about to expire (within 1 minute)
  if (token && refreshToken && tokenExpiry) {
    const now = Date.now();
    const timeUntilExpiry = tokenExpiry - now;
    
    // Refresh if token expires in less than 1 minute
    if (timeUntilExpiry < 60000 && timeUntilExpiry > 0) {
      // Token expiring soon, attempting refresh
      
      try {
        const newTokens = await store.dispatch(
          authApi.endpoints.refreshToken.initiate({ refreshToken })
        ).unwrap();
        
        // Token refreshed successfully
        
        // Update tokens in Redux
        store.dispatch(setCredentials({
          ...state.auth.user,
          tokenDetails: {
            ...state.auth.user?.tokenDetails,
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken,
          },
        } as any));
      } catch (error) {
        // Token refresh failed, logging out
        store.dispatch(logout());
      }
    }
  }
  
  return result;
};