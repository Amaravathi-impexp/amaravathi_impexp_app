/**
 * Role-Based Access Control (RBAC) Utilities
 * Helper functions for checking user roles and permissions
 * @version 2.0.0 - Updated to use ROLE_TRADER instead of ROLE_IMPORTER/ROLE_EXPORTER
 */

import { UserProfile, Role } from '../store/api/authApi';
import { Permission, getPermissionsForRoles } from './permissions';
import { RoleCode } from './roleConstants';

// Re-export RoleCode for convenience
export { RoleCode } from './roleConstants';

/**
 * Check if user has a specific role
 */
export const hasRole = (user: UserProfile | null, roleCode: RoleCode): boolean => {
  if (!user || !user.roles || user.roles.length === 0) {
    return false;
  }
  
  return user.roles.some((role: Role) => role.code === roleCode);
};

/**
 * Check if user is an Admin
 */
export const isAdmin = (user: UserProfile | null): boolean => {
  return hasRole(user, RoleCode.ADMIN);
};

/**
 * Check if user is a Super User
 */
export const isSuperUser = (user: UserProfile | null): boolean => {
  return hasRole(user, RoleCode.SUPER_USER);
};

/**
 * Check if user is a Trader (formerly Importer/Exporter)
 */
export const isTrader = (user: UserProfile | null): boolean => {
  return hasRole(user, RoleCode.TRADER);
};

/**
 * Check if user is Super User or Admin (elevated permissions)
 */
export const hasAdminAccess = (user: UserProfile | null): boolean => {
  return isSuperUser(user) || isAdmin(user);
};

/**
 * Get user's primary role (first role in the array)
 */
export const getPrimaryRole = (user: UserProfile | null): Role | null => {
  if (!user || !user.roles || user.roles.length === 0) {
    return null;
  }
  
  return user.roles[0];
};

/**
 * Get user's role display name
 */
export const getRoleDisplayName = (user: UserProfile | null): string => {
  const primaryRole = getPrimaryRole(user);
  return primaryRole ? primaryRole.name : 'User';
};

/**
 * Check if user has any of the specified roles
 */
export const hasAnyRole = (user: UserProfile | null, roleCodes: RoleCode[]): boolean => {
  if (!user || !user.roles || user.roles.length === 0) {
    return false;
  }
  
  return user.roles.some((role: Role) => roleCodes.includes(role.code as RoleCode));
};

/**
 * Check if user has all of the specified roles
 */
export const hasAllRoles = (user: UserProfile | null, roleCodes: RoleCode[]): boolean => {
  if (!user || !user.roles || user.roles.length === 0) {
    return false;
  }
  
  return roleCodes.every((roleCode) =>
    user.roles.some((role: Role) => role.code === roleCode)
  );
};

/**
 * Get list of all role codes the user has
 */
export const getUserRoleCodes = (user: UserProfile | null): string[] => {
  if (!user || !user.roles || user.roles.length === 0) {
    return [];
  }
  
  return user.roles.map((role: Role) => role.code);
};

/**
 * Check if user has a specific permission
 */
export const hasPermission = (user: UserProfile | null, permission: Permission): boolean => {
  if (!user || !user.roles || user.roles.length === 0) {
    return false;
  }
  
  const roleCodes = user.roles
    .map((role: Role) => role.code as RoleCode)
    .filter((code): code is RoleCode => 
      Object.values(RoleCode).includes(code as RoleCode)
    );
  
  const userPermissions = getPermissionsForRoles(roleCodes);
  return userPermissions.includes(permission);
};

/**
 * Check if user has any of the specified permissions
 */
export const hasAnyPermission = (user: UserProfile | null, permissions: Permission[]): boolean => {
  if (!user || !user.roles || user.roles.length === 0) {
    return false;
  }
  
  return permissions.some(permission => hasPermission(user, permission));
};

/**
 * Check if user has all of the specified permissions
 */
export const hasAllPermissions = (user: UserProfile | null, permissions: Permission[]): boolean => {
  if (!user || !user.roles || user.roles.length === 0) {
    return false;
  }
  
  return permissions.every(permission => hasPermission(user, permission));
};

/**
 * Get all permissions for the current user
 */
export const getUserPermissions = (user: UserProfile | null): Permission[] => {
  if (!user || !user.roles || user.roles.length === 0) {
    return [];
  }
  
  const roleCodes = user.roles
    .map((role: Role) => role.code as RoleCode)
    .filter((code): code is RoleCode => 
      Object.values(RoleCode).includes(code as RoleCode)
    );
  
  return getPermissionsForRoles(roleCodes);
};