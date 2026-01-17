# Role-Based Access Control (RBAC) Implementation

## Overview
This document describes the comprehensive RBAC system implemented in the TIMPEX.club application.

## Architecture

### 1. Role Constants (`/utils/roleConstants.ts`)
Defines the three role codes matching the backend API:
- `ROLE_SUPER_USER` - Super User with all permissions
- `ROLE_ADMIN` - Administrator
- `ROLE_TRADER` - Trader role (for import/export activities)

### 2. Permissions System (`/utils/permissions.ts`)
Defines 35+ granular permissions across all features:

#### Permission Categories
- **Dashboard & Analytics**: VIEW_DASHBOARD, VIEW_ANALYTICS
- **Shipments**: VIEW, CREATE, EDIT, DELETE, TRACK
- **Users**: VIEW, CREATE, EDIT, DELETE
- **Roles**: VIEW, CREATE, EDIT, DELETE
- **Partners**: VIEW, CREATE, EDIT, DELETE
- **Documents**: VIEW, UPLOAD, DOWNLOAD, DELETE
- **Payments**: VIEW, CREATE_INVOICE, PROCESS_PAYMENT, VIEW_ALL
- **Settings**: VIEW, EDIT, EDIT_SYSTEM_SETTINGS
- **Training**: VIEW, MANAGE
- **Profile**: VIEW, EDIT

#### Role-Permission Mapping

**Super User**
- Has ALL permissions in the system

**Admin**
- Full access to all features
- Can manage users, roles, analytics
- Can edit system settings

**Trader**
- View dashboard
- Manage own shipments (create, edit, track)
- View partners (read-only)
- Upload and view own documents
- View own payments
- Edit personal settings
- View training

### 3. Role Utilities (`/utils/roleUtils.ts`)
Helper functions for role and permission checking:

#### Role Checking Functions
```typescript
isAdmin(user) // Check if user is Admin
isSuperUser(user) // Check if user is Super User
isTrader(user) // Check if user is Trader
hasAdminAccess(user) // Check if user is Super User OR Admin
```

#### Permission Checking Functions
```typescript
hasPermission(user, permission) // Check single permission
hasAnyPermission(user, permissions[]) // Check if user has ANY permission
hasAllPermissions(user, permissions[]) // Check if user has ALL permissions
getUserPermissions(user) // Get all user's permissions
```

### 4. Redux Selectors (`/store/selectors/authSelectors.ts`)
Redux selectors for accessing auth state and permissions:

```typescript
selectIsAdmin(state)
selectIsSuperUser(state)
selectHasAdminAccess(state)
selectIsTrader(state)
selectHasPermission(state, permission)
selectHasAnyPermission(state, permissions)
selectHasAllPermissions(state, permissions)
selectUserPermissions(state)
```

### 5. Protected Component (`/components/ProtectedComponent.tsx`)
React component for protecting UI elements:

```typescript
<ProtectedComponent permission={Permission.VIEW_ANALYTICS}>
  <Analytics />
</ProtectedComponent>

<ProtectedComponent 
  anyPermissions={[Permission.CREATE_USER, Permission.EDIT_USER]}
>
  <UserManagement />
</ProtectedComponent>

<ProtectedComponent 
  permission={Permission.ADMIN_ONLY}
  fallback={<CustomAccessDenied />}
>
  <AdminPanel />
</ProtectedComponent>
```

## Implementation Patterns

### Pattern 1: Conditional Rendering with Hooks
```typescript
import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../store/selectors/authSelectors';
import { hasPermission } from '../utils/roleUtils';
import { Permission } from '../utils/permissions';

function MyComponent() {
  const currentUser = useAppSelector(selectCurrentUser);
  const canCreate = hasPermission(currentUser, Permission.CREATE_USER);

  return (
    <div>
      {canCreate && <Button>Create User</Button>}
    </div>
  );
}
```

### Pattern 2: Protected Component Wrapper
```typescript
<ProtectedComponent permission={Permission.VIEW_USERS}>
  <UsersList />
</ProtectedComponent>
```

### Pattern 3: Navigation Menu Protection
```typescript
const canViewAnalytics = hasPermission(currentUser, Permission.VIEW_ANALYTICS);

{canViewAnalytics && (
  <MenuItem onClick={() => navigate('/analytics')}>
    Analytics
  </MenuItem>
)}
```

### Pattern 4: Section Access Control
```typescript
const handleSectionChange = (section: string) => {
  const sectionPermissions = {
    'users': Permission.VIEW_USERS,
    'analytics': Permission.VIEW_ANALYTICS,
  };

  const required = sectionPermissions[section];
  if (required && !hasPermission(currentUser, required)) {
    showAccessDenied();
    return;
  }

  setActiveSection(section);
};
```

## Components Updated with RBAC

### 1. MainLayout (`/components/MainLayout.tsx`)
- Permission-based section access control
- Snackbar alerts for access denied
- Protected component wrappers for admin sections

### 2. LeftMenu (`/components/LeftMenu.tsx`)
- Permission checks for menu item visibility
- Analytics shown only with VIEW_ANALYTICS permission
- Admin submenu shown only with VIEW_USERS or VIEW_ROLES

### 3. Users (`/components/Users.tsx`)
- Create button shown only with CREATE_USER permission
- Edit buttons shown only with EDIT_USER permission
- Delete actions require DELETE_USER permission

### 4. Header (`/components/Header.tsx`)
- Uses selectIsAdmin for admin-specific features

## Security Considerations

### Frontend Protection
✅ Menu items hidden based on permissions
✅ Sections protected with ProtectedComponent
✅ Action buttons conditionally rendered
✅ Route access checked before navigation

### Backend Protection (Required)
⚠️ **Important**: Frontend RBAC is for UX only. All API endpoints MUST validate permissions on the backend.

## Testing RBAC

### Test User Accounts
Based on your backend roles:

1. **Super User** (`ROLE_SUPER_USER`)
   - Should have access to everything

2. **Admin** (`ROLE_ADMIN`)
   - Should see all menus except Super User exclusive features
   - Can manage users, roles, analytics

3. **Trader** (`ROLE_TRADER`)
   - Should NOT see Analytics, Users, Roles menus
   - Can manage own shipments and documents

### Test Checklist
- [ ] Menu items appear/disappear based on role
- [ ] Access denied message shown when trying to access restricted sections
- [ ] Action buttons (Create, Edit, Delete) shown only with proper permissions
- [ ] Protected sections show access denied screen
- [ ] Navigation blocked for unauthorized sections

## Migration Notes

### From Role Names to Role Codes
- ✅ Updated from checking `role.name` to `role.code`
- ✅ Role codes match backend: `ROLE_SUPER_USER`, `ROLE_ADMIN`, `ROLE_TRADER`
- ✅ `role.name` still used for display purposes only

### Avoiding Circular Dependencies
- ✅ Separated `RoleCode` enum into `/utils/roleConstants.ts`
- ✅ `permissions.ts` imports from `roleConstants.ts`
- ✅ `roleUtils.ts` imports from both and re-exports `RoleCode`

## Future Enhancements

1. **Dynamic Permissions**
   - Load permissions from backend API
   - Support custom roles with configurable permissions

2. **Permission Caching**
   - Cache user permissions in Redux
   - Invalidate on role changes

3. **Audit Logging**
   - Log permission checks
   - Track access denied attempts

4. **Feature Flags**
   - Combine permissions with feature flags
   - Gradual feature rollouts

## API Integration

The RBAC system integrates with your backend:

```typescript
// Backend returns user with roles
{
  "id": 123,
  "email": "admin@timpex.club",
  "roles": [
    {
      "id": 1,
      "code": "ROLE_ADMIN",
      "name": "Admin",
      "type": "SYSTEM",
      "description": "Admin role"
    }
  ]
}
```

The system extracts `role.code` for permission checks and uses `role.name` for display.

## Support

For questions or issues with RBAC:
1. Check `/docs/rbac-examples.tsx` for code examples
2. Review permission mappings in `/utils/permissions.ts`
3. Test with different role accounts
4. Ensure backend API returns correct role codes