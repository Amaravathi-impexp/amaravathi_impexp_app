/**
 * Authentication Service
 * Handles login, logout, registration, and session management
 */

import api, { setAuthToken, removeAuthToken } from './api';
import type { LoginRequest, LoginResponse, RegisterRequest, User } from '../types';

export const authService = {
  /**
   * Login user
   * @param credentials - User email and password
   * @returns Login response with token and user data
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      
      // Store token in localStorage
      if (response.token) {
        setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Register new user
   * @param userData - User registration data
   * @returns Registration response with token and user data
   */
  register: async (userData: RegisterRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/auth/register', userData);
      
      // Store token in localStorage
      if (response.token) {
        setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   * Clears token and session data
   */
  logout: async (): Promise<void> => {
    try {
      // Call logout endpoint if needed
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always remove token even if API call fails
      removeAuthToken();
    }
  },

  /**
   * Get current user profile
   * @returns Current user data
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      return await api.get<User>('/auth/me');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Refresh authentication token
   * @returns New token
   */
  refreshToken: async (): Promise<{ token: string }> => {
    try {
      const response = await api.post<{ token: string }>('/auth/refresh');
      
      if (response.token) {
        setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Request password reset
   * @param email - User email
   */
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    try {
      return await api.post<{ message: string }>('/auth/forgot-password', { email });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Reset password with token
   * @param token - Reset token from email
   * @param newPassword - New password
   */
  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    try {
      return await api.post<{ message: string }>('/auth/reset-password', {
        token,
        newPassword,
      });
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
