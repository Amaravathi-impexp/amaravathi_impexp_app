/**
 * Role Constants
 * Role codes enum for type safety and reuse
 * @version 2.0.0 - Updated to use ROLE_TRADER instead of ROLE_IMPORTER/ROLE_EXPORTER
 */

/**
 * Role codes enum matching backend role codes
 */
export enum RoleCode {
  SUPER_USER = 'ROLE_SUPER_USER',
  ADMIN = 'ROLE_ADMIN',
  TRADER = 'ROLE_TRADER',
}