/**
 * RBAC (Role-Based Access Control) System - Usage Examples
 * 
 * This file demonstrates how to use the RBAC system throughout the application
 */

import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../store/selectors/authSelectors';
import { hasPermission, hasAnyPermission, hasAllPermissions, isAdmin, isSuperUser } from '../utils/roleUtils';
import { Permission } from '../utils/permissions';
import { ProtectedComponent } from '../components/ProtectedComponent';
import { Button, Box, Typography } from '@mui/material';

/**
 * EXAMPLE 1: Using hasPermission directly in components
 */
function Example1_DirectPermissionCheck() {
  const currentUser = useAppSelector(selectCurrentUser);
  const canCreateUser = hasPermission(currentUser, Permission.CREATE_USER);

  return (
    <Box>
      {canCreateUser && (
        <Button variant="contained">
          Create User
        </Button>
      )}
    </Box>
  );
}

/**
 * EXAMPLE 2: Using ProtectedComponent wrapper
 */
function Example2_ProtectedComponentWrapper() {
  return (
    <ProtectedComponent permission={Permission.VIEW_ANALYTICS}>
      <Box>
        <Typography variant="h6">Analytics Dashboard</Typography>
        <Typography>This content is only visible to users with VIEW_ANALYTICS permission</Typography>
      </Box>
    </ProtectedComponent>
  );
}

/**
 * EXAMPLE 3: Checking multiple permissions (ANY)
 */
function Example3_AnyPermissions() {
  const currentUser = useAppSelector(selectCurrentUser);
  const canManageData = hasAnyPermission(currentUser, [
    Permission.CREATE_USER,
    Permission.EDIT_USER,
    Permission.DELETE_USER,
  ]);

  return (
    <ProtectedComponent 
      anyPermissions={[Permission.CREATE_USER, Permission.EDIT_USER, Permission.DELETE_USER]}
    >
      <Box>
        <Typography>User Management Tools</Typography>
        {canManageData && <Button>Manage Users</Button>}
      </Box>
    </ProtectedComponent>
  );
}

/**
 * EXAMPLE 4: Checking multiple permissions (ALL)
 */
function Example4_AllPermissions() {
  const currentUser = useAppSelector(selectCurrentUser);
  const hasFullAccess = hasAllPermissions(currentUser, [
    Permission.VIEW_USERS,
    Permission.CREATE_USER,
    Permission.EDIT_USER,
    Permission.DELETE_USER,
  ]);

  return (
    <Box>
      {hasFullAccess && (
        <Typography color="success.main">
          You have full user management access
        </Typography>
      )}
    </Box>
  );
}

/**
 * EXAMPLE 5: Using role checks (legacy support)
 */
function Example5_RoleChecks() {
  const currentUser = useAppSelector(selectCurrentUser);
  const userIsAdmin = isAdmin(currentUser);
  const userIsSuperUser = isSuperUser(currentUser);

  return (
    <Box>
      {userIsSuperUser && <Typography>Welcome, Super User!</Typography>}
      {userIsAdmin && <Typography>Welcome, Admin!</Typography>}
    </Box>
  );
}

/**
 * EXAMPLE 6: Custom fallback UI for access denied
 */
function Example6_CustomFallback() {
  return (
    <ProtectedComponent
      permission={Permission.VIEW_ANALYTICS}
      fallback={
        <Box sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="h6" color="text.secondary">
            Analytics not available
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contact your administrator to request access
          </Typography>
        </Box>
      }
    >
      <Box>Analytics Content</Box>
    </ProtectedComponent>
  );
}

/**
 * EXAMPLE 7: Hiding without showing access denied message
 */
function Example7_SilentHide() {
  return (
    <ProtectedComponent 
      permission={Permission.EDIT_SYSTEM_SETTINGS}
      showAccessDenied={false}
    >
      <Button variant="contained" color="error">
        Delete System Data
      </Button>
    </ProtectedComponent>
  );
}

/**
 * PERMISSION MAPPING REFERENCE
 * 
 * Super User: Has ALL permissions
 * 
 * Admin:
 * - Dashboard & Analytics: VIEW_DASHBOARD, VIEW_ANALYTICS
 * - Shipments: All permissions (VIEW, CREATE, EDIT, DELETE, TRACK)
 * - Users: All permissions (VIEW, CREATE, EDIT, DELETE)
 * - Roles: All permissions (VIEW, CREATE, EDIT, DELETE)
 * - Partners: All permissions (VIEW, CREATE, EDIT, DELETE)
 * - Documents: All permissions (VIEW, UPLOAD, DOWNLOAD, DELETE)
 * - Payments: All permissions (VIEW, CREATE_INVOICE, PROCESS_PAYMENT, VIEW_ALL)
 * - Settings: All permissions including EDIT_SYSTEM_SETTINGS
 * - Training: All permissions (VIEW, MANAGE)
 * 
 * Importer:
 * - Dashboard: VIEW_DASHBOARD
 * - Shipments: VIEW, CREATE, EDIT (own), TRACK
 * - Partners: VIEW (read-only)
 * - Documents: VIEW, UPLOAD, DOWNLOAD (own)
 * - Payments: VIEW (own)
 * - Settings: VIEW, EDIT (personal only)
 * - Training: VIEW
 * - Profile: VIEW, EDIT
 * 
 * Exporter:
 * - Dashboard: VIEW_DASHBOARD
 * - Shipments: VIEW, CREATE, EDIT (own), TRACK
 * - Partners: VIEW (read-only)
 * - Documents: VIEW, UPLOAD, DOWNLOAD (own)
 * - Payments: VIEW (own), CREATE_INVOICE
 * - Settings: VIEW, EDIT (personal only)
 * - Training: VIEW
 * - Profile: VIEW, EDIT
 */

/**
 * BEST PRACTICES
 * 
 * 1. Always use Permission enum instead of hardcoded strings
 * 2. Use ProtectedComponent for entire sections/features
 * 3. Use hasPermission for conditional rendering of buttons/actions
 * 4. Check permissions at both UI and API level
 * 5. Provide clear feedback when access is denied
 * 6. Use permission checks, not role checks (more flexible)
 * 7. Document permission requirements for each feature
 */

export {
  Example1_DirectPermissionCheck,
  Example2_ProtectedComponentWrapper,
  Example3_AnyPermissions,
  Example4_AllPermissions,
  Example5_RoleChecks,
  Example6_CustomFallback,
  Example7_SilentHide,
};
