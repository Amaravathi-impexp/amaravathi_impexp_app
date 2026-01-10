/**
 * Auth Slice
 * Manages authentication state with full user profile from backend
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile, TokenDetails } from '../api/authApi';

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  refreshToken: string | null;
  tokenExpiry: number | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  tokenExpiry: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set credentials after sign-in (stores full user profile)
    setCredentials: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
      state.token = action.payload.tokenDetails.accessToken;
      state.refreshToken = action.payload.tokenDetails.refreshToken;
      state.tokenExpiry = Date.now() + (action.payload.tokenDetails.expiresInSeconds * 1000);
      state.isAuthenticated = true;
    },
    
    // Update user profile (partial update)
    updateUser: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    
    // Update tokens after refresh
    updateToken: (state, action: PayloadAction<TokenDetails>) => {
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.tokenExpiry = Date.now() + (action.payload.expiresInSeconds * 1000);
    },
    
    // Logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.tokenExpiry = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, updateUser, updateToken, logout } = authSlice.actions;
export default authSlice.reducer;
