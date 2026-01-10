/**
 * AdminOnly Component
 * Wrapper component that only renders children if user is an admin
 * Shows an access denied message for non-admin users
 */

import { ReactNode } from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectIsAdmin, selectRoleDisplayName } from '../../store/selectors/authSelectors';
import { Shield, Lock } from 'lucide-react';

interface AdminOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
  showMessage?: boolean;
}

export function AdminOnly({ 
  children, 
  fallback, 
  showMessage = true 
}: AdminOnlyProps) {
  const isAdmin = useAppSelector(selectIsAdmin);
  const userRole = useAppSelector(selectRoleDisplayName);

  // If user is admin, render children
  if (isAdmin) {
    return <>{children}</>;
  }

  // If custom fallback is provided, render it
  if (fallback) {
    return <>{fallback}</>;
  }

  // If showMessage is false, render nothing
  if (!showMessage) {
    return null;
  }

  // Default: Show access denied message
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-red-600" />
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Access Denied
        </h2>
        
        <p className="text-gray-600 mb-4">
          This section is only available to administrators.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
            <Shield className="w-4 h-4" />
            <span>Your current role: <strong>{userRole}</strong></span>
          </div>
        </div>
        
        <p className="text-sm text-gray-500">
          Please contact your system administrator if you believe you should have access to this section.
        </p>
      </div>
    </div>
  );
}

/**
 * Hook to check if current user is admin
 * Use this for conditional rendering in components
 */
export function useIsAdmin() {
  return useAppSelector(selectIsAdmin);
}
