/**
 * Role-Based Access Control (RBAC) Utilities
 * Helper functions for checking user roles and permissions
 */

import { UserProfile, Role } from '../store/api/authApi';

/**
 * Role codes enum for type safety
 */
export enum RoleCode {
  ADMIN = 'ADMIN',
  IMPORTER = 'IMPT',
  EXPORTER = 'EXPT',
}

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
 * Check if user is an Importer
 */
export const isImporter = (user: UserProfile | null): boolean => {
  return hasRole(user, RoleCode.IMPORTER);
};

/**
 * Check if user is an Exporter
 */
export const isExporter = (user: UserProfile | null): boolean => {
  return hasRole(user, RoleCode.EXPORTER);
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
