/**
 * Auth Selectors
 * Reusable selectors for auth state and role-based access control
 * @version 2.0.0 - Updated to use ROLE_TRADER instead of ROLE_IMPORTER/ROLE_EXPORTER
 */

import { RootState } from '../index';
import { UserProfile } from '../api/authApi';
import { 
  isAdmin, 
  isSuperUser,
  isTrader, 
  hasAdminAccess,
  getPrimaryRole, 
  getRoleDisplayName,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  getUserPermissions,
} from '../../utils/roleUtils';
import { Permission } from '../../utils/permissions';

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
 * Check if current user is a super user
 */
export const selectIsSuperUser = (state: RootState): boolean => {
  return isSuperUser(state.auth.user);
};

/**
 * Check if current user has admin access
 */
export const selectHasAdminAccess = (state: RootState): boolean => {
  return hasAdminAccess(state.auth.user);
};

/**
 * Check if current user is a trader
 */
export const selectIsTrader = (state: RootState): boolean => {
  return isTrader(state.auth.user);
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

/**
 * Check if user has a specific permission
 */
export const selectHasPermission = (state: RootState, permission: Permission): boolean => {
  return hasPermission(state.auth.user, permission);
};

/**
 * Check if user has any of the specified permissions
 */
export const selectHasAnyPermission = (state: RootState, permissions: Permission[]): boolean => {
  return hasAnyPermission(state.auth.user, permissions);
};

/**
 * Check if user has all of the specified permissions
 */
export const selectHasAllPermissions = (state: RootState, permissions: Permission[]): boolean => {
  return hasAllPermissions(state.auth.user, permissions);
};

/**
 * Get all permissions for the current user
 */
export const selectUserPermissions = (state: RootState): Permission[] => {
  return getUserPermissions(state.auth.user);
};