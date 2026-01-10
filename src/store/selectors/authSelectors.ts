/**
 * Auth Selectors
 * Reusable selectors for auth state and role-based access control
 */

import { RootState } from '../index';
import { UserProfile } from '../api/authApi';
import { isAdmin, isImporter, isExporter, getPrimaryRole, getRoleDisplayName } from '../../utils/roleUtils';

/**
 * Get current user
 */
export const selectCurrentUser = (state: RootState): UserProfile | null => {
  return state.auth.user;
};

/**
 * Get authentication status
 */
export const selectIsAuthenticated = (state: RootState): boolean => {
  return state.auth.isAuthenticated;
};

/**
 * Get access token
 */
export const selectAccessToken = (state: RootState): string | null => {
  return state.auth.token;
};

/**
 * Get refresh token
 */
export const selectRefreshToken = (state: RootState): string | null => {
  return state.auth.refreshToken;
};

/**
 * Check if current user is an admin
 */
export const selectIsAdmin = (state: RootState): boolean => {
  return isAdmin(state.auth.user);
};

/**
 * Check if current user is an importer
 */
export const selectIsImporter = (state: RootState): boolean => {
  return isImporter(state.auth.user);
};

/**
 * Check if current user is an exporter
 */
export const selectIsExporter = (state: RootState): boolean => {
  return isExporter(state.auth.user);
};

/**
 * Get user's primary role
 */
export const selectPrimaryRole = (state: RootState) => {
  return getPrimaryRole(state.auth.user);
};

/**
 * Get user's role display name
 */
export const selectRoleDisplayName = (state: RootState): string => {
  return getRoleDisplayName(state.auth.user);
};

/**
 * Get user's full name
 */
export const selectUserFullName = (state: RootState): string | null => {
  return state.auth.user?.fullName || null;
};

/**
 * Get user's email
 */
export const selectUserEmail = (state: RootState): string | null => {
  return state.auth.user?.email || null;
};
