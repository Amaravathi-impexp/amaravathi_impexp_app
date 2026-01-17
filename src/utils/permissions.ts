/**
 * Permission Management System
 * Defines all permissions and their role mappings
 * @version 2.0.0 - Updated to use ROLE_TRADER instead of ROLE_IMPORTER/ROLE_EXPORTER
 */

import { RoleCode } from './roleConstants';

/**
 * All available permissions in the system
 */
export enum Permission {
  // Dashboard & Overview
  VIEW_DASHBOARD = 'VIEW_DASHBOARD',
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  
  // Shipments
  VIEW_SHIPMENTS = 'VIEW_SHIPMENTS',
  CREATE_SHIPMENT = 'CREATE_SHIPMENT',
  EDIT_SHIPMENT = 'EDIT_SHIPMENT',
  DELETE_SHIPMENT = 'DELETE_SHIPMENT',
  TRACK_SHIPMENT = 'TRACK_SHIPMENT',
  
  // Users
  VIEW_USERS = 'VIEW_USERS',
  CREATE_USER = 'CREATE_USER',
  EDIT_USER = 'EDIT_USER',
  DELETE_USER = 'DELETE_USER',
  
  // Roles
  VIEW_ROLES = 'VIEW_ROLES',
  CREATE_ROLE = 'CREATE_ROLE',
  EDIT_ROLE = 'EDIT_ROLE',
  DELETE_ROLE = 'DELETE_ROLE',
  
  // Partners
  VIEW_PARTNERS = 'VIEW_PARTNERS',
  CREATE_PARTNER = 'CREATE_PARTNER',
  EDIT_PARTNER = 'EDIT_PARTNER',
  DELETE_PARTNER = 'DELETE_PARTNER',
  
  // Documents
  VIEW_DOCUMENTS = 'VIEW_DOCUMENTS',
  UPLOAD_DOCUMENTS = 'UPLOAD_DOCUMENTS',
  DOWNLOAD_DOCUMENTS = 'DOWNLOAD_DOCUMENTS',
  DELETE_DOCUMENTS = 'DELETE_DOCUMENTS',
  
  // Payments & Invoicing
  VIEW_PAYMENTS = 'VIEW_PAYMENTS',
  CREATE_INVOICE = 'CREATE_INVOICE',
  PROCESS_PAYMENT = 'PROCESS_PAYMENT',
  VIEW_ALL_PAYMENTS = 'VIEW_ALL_PAYMENTS',
  
  // Settings
  VIEW_SETTINGS = 'VIEW_SETTINGS',
  EDIT_SETTINGS = 'EDIT_SETTINGS',
  EDIT_SYSTEM_SETTINGS = 'EDIT_SYSTEM_SETTINGS',
  
  // Training
  VIEW_MY_TRAININGS = 'VIEW_MY_TRAININGS', // For ROLE_TRADER
  MANAGE_ALL_TRAININGS = 'MANAGE_ALL_TRAININGS', // For ROLE_ADMIN and ROLE_SUPER_USER
  
  // Profile
  VIEW_PROFILE = 'VIEW_PROFILE',
  EDIT_PROFILE = 'EDIT_PROFILE',
}

/**
 * Permission mappings for each role
 */
export const ROLE_PERMISSIONS: Record<RoleCode, Permission[]> = {
  [RoleCode.SUPER_USER]: [
    // Super User has ALL permissions
    ...Object.values(Permission),
  ],
  
  [RoleCode.ADMIN]: [
    // Training Management
    Permission.MANAGE_ALL_TRAININGS, // Can create/manage/view all training schedules
    
    // Profile - Accessible to all roles
    Permission.VIEW_PROFILE,
    Permission.EDIT_PROFILE,
  ],
  
  [RoleCode.TRADER]: [
    // My Trainings - View and enroll
    Permission.VIEW_MY_TRAININGS,
    
    // Profile - Accessible to all roles
    Permission.VIEW_PROFILE,
    Permission.EDIT_PROFILE,
  ],
};

/**
 * Get all permissions for a role code
 */
export const getPermissionsForRole = (roleCode: RoleCode): Permission[] => {
  return ROLE_PERMISSIONS[roleCode] || [];
};

/**
 * Get all permissions for multiple role codes
 */
export const getPermissionsForRoles = (roleCodes: RoleCode[]): Permission[] => {
  const permissionsSet = new Set<Permission>();
  
  roleCodes.forEach(roleCode => {
    const permissions = getPermissionsForRole(roleCode);
    permissions.forEach(permission => permissionsSet.add(permission));
  });
  
  return Array.from(permissionsSet);
};