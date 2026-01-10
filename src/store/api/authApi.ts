/**
 * RTK Query - Auth API
 * Handles authentication endpoints with REAL backend integration
 * NO MOCK DATA - All endpoints use actual backend
 */

import { baseApi } from './baseApi';
import type { Country, ProductType, Role } from './types';

// Re-export shared types for backward compatibility
export type { Country, ProductType, Role };

// Token Details interface
export interface TokenDetails {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
}

// User interface matching backend response
export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  originCountry: Country;
  destinationCountry: Country;
  productType: ProductType;
  roles: Role[];
  tokenDetails: TokenDetails;
  // Notification preferences
  appNotificationEnabled?: boolean;
  emailNotificationEnabled?: boolean;
  phoneNotificationEnabled?: boolean;
  // Optional fields that may be included in some responses
  createdAt?: string;
  updatedAt?: string;
  notifications?: {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
  };
}

// Sign-in request/response
export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse extends UserProfile {}

// Sign-up request/response
export interface SignUpRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface SignUpResponse {
  message: string;
}

// Logout request
export interface LogoutRequest {
  refreshToken: string;
  allSessions?: boolean;
}

// Refresh token request/response
export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Sign In - POST /auth/sign-in
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (credentials) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    
    // Sign Up - POST /auth/sign-up
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (data) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    
    // Logout - POST /auth/logout
    logout: builder.mutation<{ message: string }, LogoutRequest>({
      query: (data) => ({
        url: '/auth/logout',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    
    // Refresh Token - POST /auth/refresh-token
    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
      query: (data) => ({
        url: '/auth/refresh-token',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} = authApi;