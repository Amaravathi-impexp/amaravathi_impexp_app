# Redux Implementation Guide

## 🎯 Overview

The **Amaravathi Imports & Exports** application now uses **Redux Toolkit** for centralized state management. All `localStorage` usage has been removed and replaced with Redux store.

---

## 📦 Redux Store Structure

```
/store
├── index.ts                  # Store configuration
├── hooks.ts                  # Typed hooks (useAppDispatch, useAppSelector)
└── slices/
    ├── authSlice.ts         # Authentication state
    ├── shipmentsSlice.ts    # Shipments data
    ├── partnersSlice.ts     # Partners directory
    ├── usersSlice.ts        # User management
    └── uiSlice.ts           # UI state (views, notifications)
```

---

## 🔐 Auth Slice

**Location:** `/store/slices/authSlice.ts`

### State Shape
```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
```

### Actions
- `setCredentials(payload: { user: User, token: string })` - Set user and token after login
- `updateUser(payload: User)` - Update current user information
- `logout()` - Clear auth state

### Usage Example
```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCredentials, logout } from '../store/slices/authSlice';

// Get current user
const currentUser = useAppSelector((state) => state.auth.user);
const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
const token = useAppSelector((state) => state.auth.token);

// Login
dispatch(setCredentials({ user, token }));

// Logout
dispatch(logout());
```

---

## 📦 Shipments Slice

**Location:** `/store/slices/shipmentsSlice.ts`

### State Shape
```typescript
interface ShipmentsState {
  shipments: Shipment[];
  selectedShipment: Shipment | null;
  loading: boolean;
  error: string | null;
}
```

### Actions
- `setShipments(payload: Shipment[])` - Set all shipments
- `addShipment(payload: Shipment)` - Add new shipment
- `updateShipment(payload: Shipment)` - Update existing shipment
- `deleteShipment(payload: string)` - Delete shipment by ID
- `setSelectedShipment(payload: Shipment | null)` - Set selected shipment
- `setLoading(payload: boolean)` - Set loading state
- `setError(payload: string | null)` - Set error state

### Usage Example
```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addShipment, setShipments } from '../store/slices/shipmentsSlice';

// Get shipments
const shipments = useAppSelector((state) => state.shipments.shipments);
const loading = useAppSelector((state) => state.shipments.loading);

// Add shipment
dispatch(addShipment(newShipment));

// Set all shipments
dispatch(setShipments(shipmentsArray));
```

---

## 🤝 Partners Slice

**Location:** `/store/slices/partnersSlice.ts`

### State Shape
```typescript
interface PartnersState {
  partners: Partner[];
  selectedPartner: Partner | null;
  loading: boolean;
  error: string | null;
}
```

### Actions
- `setPartners(payload: Partner[])` - Set all partners
- `addPartner(payload: Partner)` - Add new partner
- `updatePartner(payload: Partner)` - Update existing partner
- `deletePartner(payload: string)` - Delete partner by ID
- `setSelectedPartner(payload: Partner | null)` - Set selected partner
- `setLoading(payload: boolean)` - Set loading state
- `setError(payload: string | null)` - Set error state

---

## 👥 Users Slice

**Location:** `/store/slices/usersSlice.ts`

### State Shape
```typescript
interface UsersState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}
```

### Actions
- `setUsers(payload: User[])` - Set all users
- `addUser(payload: User)` - Add new user
- `updateUser(payload: User)` - Update existing user
- `deleteUser(payload: string)` - Delete user by ID
- `setSelectedUser(payload: User | null)` - Set selected user
- `setLoading(payload: boolean)` - Set loading state
- `setError(payload: string | null)` - Set error state

---

## 🎨 UI Slice

**Location:** `/store/slices/uiSlice.ts`

### State Shape
```typescript
type ViewType = 'home' | 'signin' | 'signup' | 'dashboard' | 'about' | 'careers' | 'contact';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timestamp: string;
}

interface UIState {
  currentView: ViewType;
  notifications: Notification[];
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
}
```

### Actions
- `setCurrentView(payload: ViewType)` - Change current view
- `addNotification(payload: { type, message })` - Add notification
- `removeNotification(payload: string)` - Remove notification by ID
- `clearNotifications()` - Clear all notifications
- `toggleSidebar()` - Toggle sidebar state
- `setSidebarCollapsed(payload: boolean)` - Set sidebar state
- `setTheme(payload: 'light' | 'dark')` - Set theme

### Usage Example
```typescript
import { setCurrentView, addNotification } from '../store/slices/uiSlice';

// Change view
dispatch(setCurrentView('dashboard'));

// Add notification
dispatch(addNotification({
  type: 'success',
  message: 'Shipment created successfully!'
}));
```

---

## 🔧 Typed Hooks

**Location:** `/store/hooks.ts`

### Pre-typed Hooks
```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';

// Instead of:
const dispatch = useDispatch();
const user = useSelector((state: RootState) => state.auth.user);

// Use:
const dispatch = useAppDispatch();
const user = useAppSelector((state) => state.auth.user);
```

These hooks provide full TypeScript type safety without manual type annotations.

---

## 🚀 Getting Started

### 1. Access Redux Store

```typescript
import { useAppSelector, useAppDispatch } from '../store/hooks';

function MyComponent() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  
  return <div>Hello, {user?.name}</div>;
}
```

### 2. Dispatch Actions

```typescript
import { setCredentials } from '../store/slices/authSlice';

// Login example
const handleLogin = async () => {
  const response = await mockApi.auth.login({ email, password });
  dispatch(setCredentials({
    user: response.user,
    token: response.token
  }));
};
```

### 3. Read State

```typescript
// Single value
const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

// Multiple values
const { user, token, isAuthenticated } = useAppSelector((state) => state.auth);
```

---

## 📝 Migration from localStorage

### Before (localStorage)
```typescript
// Save
localStorage.setItem('auth_token', token);
localStorage.setItem('user', JSON.stringify(user));

// Read
const token = localStorage.getItem('auth_token');
const user = JSON.parse(localStorage.getItem('user') || '{}');

// Clear
localStorage.removeItem('auth_token');
localStorage.removeItem('user');
```

### After (Redux)
```typescript
// Save
dispatch(setCredentials({ user, token }));

// Read
const user = useAppSelector((state) => state.auth.user);
const token = useAppSelector((state) => state.auth.token);

// Clear
dispatch(logout());
```

---

## 🔄 API Integration

The API service (`/services/api.ts`) now gets the auth token from Redux:

```typescript
import { store } from '../store';

const getAuthToken = (): string | null => {
  const state = store.getState();
  return state.auth.token;
};
```

---

## ✅ Benefits of Redux

1. **Centralized State** - All app state in one place
2. **No localStorage** - Pure in-memory state management
3. **Time Travel Debugging** - Redux DevTools support
4. **Type Safety** - Full TypeScript support
5. **Predictable State** - Explicit state updates via actions
6. **Developer Experience** - Better debugging and testing
7. **Performance** - Optimized re-renders with selectors

---

## 🎯 Best Practices

### 1. Use Selectors
```typescript
// Good - Memoized selector
const user = useAppSelector((state) => state.auth.user);

// Avoid - Inline object creation
const data = useAppSelector((state) => ({
  user: state.auth.user,
  token: state.auth.token
})); // Creates new object every time
```

### 2. Batch Updates
```typescript
// Good - Single dispatch
dispatch(setCredentials({ user, token }));

// Avoid - Multiple dispatches
dispatch(setUser(user));
dispatch(setToken(token));
```

### 3. Type Safety
```typescript
// Always use typed hooks
import { useAppDispatch, useAppSelector } from '../store/hooks';

// Not
import { useDispatch, useSelector } from 'react-redux';
```

---

## 🛠️ Redux DevTools

Install the [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools) to:
- Inspect state changes
- Time travel through actions
- Debug state mutations
- Export/import state

---

## 📚 Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Redux Hooks](https://react-redux.js.org/api/hooks)
- [Redux Style Guide](https://redux.js.org/style-guide/)

---

## 🎉 Summary

The app now uses Redux for all state management:
- ✅ No localStorage usage
- ✅ Centralized auth state
- ✅ Type-safe actions and selectors
- ✅ Better developer experience
- ✅ Ready for advanced features (persistence, middleware, etc.)
