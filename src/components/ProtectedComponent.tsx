/**
 * Protected Component
 * HOC and component for enforcing role-based access control
 */

import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Lock } from 'lucide-react';
import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../store/selectors/authSelectors';
import { hasPermission, hasAnyPermission, hasAllPermissions, hasAdminAccess } from '../utils/roleUtils';
import { Permission } from '../utils/permissions';

interface ProtectedComponentProps {
  children: React.ReactNode;
  // Permission-based access
  permission?: Permission;
  anyPermissions?: Permission[];
  allPermissions?: Permission[];
  // Role-based access (legacy support)
  requireAdmin?: boolean;
  // Fallback UI
  fallback?: React.ReactNode;
  // Show default "Access Denied" message
  showAccessDenied?: boolean;
}

/**
 * ProtectedComponent - Conditionally renders content based on user permissions
 */
export function ProtectedComponent({
  children,
  permission,
  anyPermissions,
  allPermissions,
  requireAdmin,
  fallback,
  showAccessDenied = true,
}: ProtectedComponentProps) {
  const currentUser = useAppSelector(selectCurrentUser);

  // Check permissions
  let hasAccess = true;

  if (requireAdmin) {
    hasAccess = hasAdminAccess(currentUser);
  }

  if (permission) {
    hasAccess = hasAccess && hasPermission(currentUser, permission);
  }

  if (anyPermissions && anyPermissions.length > 0) {
    hasAccess = hasAccess && hasAnyPermission(currentUser, anyPermissions);
  }

  if (allPermissions && allPermissions.length > 0) {
    hasAccess = hasAccess && hasAllPermissions(currentUser, allPermissions);
  }

  // If user has access, render children
  if (hasAccess) {
    return <>{children}</>;
  }

  // If custom fallback provided, render it
  if (fallback) {
    return <>{fallback}</>;
  }

  // If showAccessDenied is false, render nothing
  if (!showAccessDenied) {
    return null;
  }

  // Default access denied UI
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        p: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: 'center',
          maxWidth: '500px',
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Box
          sx={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            bgcolor: '#FEF3F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
          }}
        >
          <Lock size={32} color="#D92D20" />
        </Box>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#1A3D32' }}>
          Access Denied
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          You don't have permission to view this content. Please contact your administrator if you believe this is an error.
        </Typography>
        <Button
          variant="outlined"
          onClick={() => window.history.back()}
          sx={{
            borderColor: '#1A3D32',
            color: '#1A3D32',
            '&:hover': {
              borderColor: '#3D7A68',
              bgcolor: 'rgba(26, 61, 50, 0.04)',
            },
          }}
        >
          Go Back
        </Button>
      </Paper>
    </Box>
  );
}

/**
 * Higher-Order Component for protecting components with permissions
 */
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  permission: Permission
) {
  return function ProtectedComponentWrapper(props: P) {
    return (
      <ProtectedComponent permission={permission}>
        <Component {...props} />
      </ProtectedComponent>
    );
  };
}

/**
 * Higher-Order Component for protecting components requiring admin access
 */
export function withAdminAccess<P extends object>(
  Component: React.ComponentType<P>
) {
  return function AdminProtectedWrapper(props: P) {
    return (
      <ProtectedComponent requireAdmin>
        <Component {...props} />
      </ProtectedComponent>
    );
  };
}
