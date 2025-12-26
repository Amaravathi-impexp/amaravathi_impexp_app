# ⚡ Redux State Management - Amaravathi Imports & Exports

## 📋 Overview

The **Amaravathi Imports & Exports** application now uses **Redux Toolkit** for centralized state management. All `localStorage` usage has been **completely removed** and replaced with an in-memory Redux store.

---

## 🎯 Key Changes

### ❌ What Was Removed
- All `localStorage.getItem()` calls
- All `localStorage.setItem()` calls  
- All `localStorage.removeItem()` calls
- Manual JSON parsing/stringifying
- Scattered state across components

### ✅ What Was Added
- Redux Toolkit store (`@reduxjs/toolkit`)
- React-Redux bindings (`react-redux`)
- 5 Redux slices (auth, shipments, partners, users, ui)
- Typed hooks (`useAppDispatch`, `useAppSelector`)
- Centralized state management
- Redux DevTools support

---

## 📁 New File Structure

```
/store
├── index.ts                      # Store configuration with all reducers
├── hooks.ts                      # Typed hooks for TypeScript
└── slices/
    ├── authSlice.ts             # User authentication & token
    ├── shipmentsSlice.ts        # Shipment management
    ├── partnersSlice.ts         # Partner directory
    ├── usersSlice.ts            # User management (admin)
    └── uiSlice.ts               # UI state (views, notifications, theme)
```

---

## 🔧 Modified Files

### Core Application
- ✅ `/App.tsx` - Wrapped with Redux Provider
- ✅ `/services/api.ts` - Gets token from Redux instead of localStorage

### Components
- ✅ `/components/SignIn.tsx` - Dispatches credentials to Redux
- ✅ `/components/Dashboard.tsx` - Reads user from Redux
- ✅ `/components/Settings.tsx` - Updates user via Redux
- ✅ `/components/ProfileMenu.tsx` - Displays user from Redux

---

## 📊 Redux State Shape

```typescript
{
  auth: {
    user: User | null,
    token: string | null,
    isAuthenticated: boolean
  },
  shipments: {
    shipments: Shipment[],
    selectedShipment: Shipment | null,
    loading: boolean,
    error: string | null
  },
  partners: {
    partners: Partner[],
    selectedPartner: Partner | null,
    loading: boolean,
    error: string | null
  },
  users: {
    users: User[],
    selectedUser: User | null,
    loading: boolean,
    error: string | null
  },
  ui: {
    currentView: 'home' | 'signin' | 'signup' | 'dashboard' | 'about' | 'careers' | 'contact',
    notifications: Notification[],
    sidebarCollapsed: boolean,
    theme: 'light' | 'dark'
  }
}
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install @reduxjs/toolkit react-redux
```

### 2. Import and Use

```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCredentials, logout } from '../store/slices/authSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  
  const handleLogin = () => {
    dispatch(setCredentials({ user, token }));
  };
  
  return <div>Hello, {user?.name}</div>;
}
```

---

## 📖 Documentation

We've created comprehensive guides to help you work with Redux:

### 1. **REDUX_IMPLEMENTATION.md**
   - Complete Redux architecture overview
   - All slices explained in detail
   - State shapes and actions
   - Usage examples for each slice

### 2. **MIGRATION_GUIDE.md**
   - Step-by-step migration from localStorage to Redux
   - Before/after code comparisons
   - Common issues and solutions
   - Testing checklist

### 3. **REDUX_QUICK_REFERENCE.md**
   - Quick copy-paste snippets
   - Common patterns
   - Best practices
   - Full example components

### 4. **TECH_STACK.md**
   - Complete technology stack
   - Redux integration details
   - Architecture overview

---

## 🎨 Usage Examples

### Authentication
```typescript
// Login
dispatch(setCredentials({ user, token }));

// Get current user
const user = useAppSelector((state) => state.auth.user);

// Logout
dispatch(logout());
```

### Navigation
```typescript
// Change view
dispatch(setCurrentView('dashboard'));

// Get current view
const view = useAppSelector((state) => state.ui.currentView);
```

### Notifications
```typescript
// Add notification
dispatch(addNotification({
  type: 'success',
  message: 'Action completed!'
}));
```

### Data Management
```typescript
// Add shipment
dispatch(addShipment(newShipment));

// Get all shipments
const shipments = useAppSelector((state) => state.shipments.shipments);
```

---

## 🔍 Benefits

| Feature | Before (localStorage) | After (Redux) |
|---------|----------------------|---------------|
| **State Access** | Parse JSON every time | Direct reference |
| **Type Safety** | Manual typing | Automatic inference |
| **Debugging** | Console logs | Redux DevTools |
| **Performance** | Synchronous blocking | Optimized |
| **Testing** | Difficult | Easy to mock |
| **State Updates** | Manual sync | Automatic |
| **Persistence** | Browser storage | In-memory (session) |

---

## 🛠️ Development Tools

### Redux DevTools
Install the browser extension:
- [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

**Features:**
- 🕐 Time travel debugging
- 📊 State inspection
- 📝 Action logging
- 💾 Export/import state
- 🔄 Action replay

---

## 📝 Available Actions

### Auth Slice
- `setCredentials({ user, token })` - Login
- `updateUser(user)` - Update user info
- `logout()` - Clear auth state

### UI Slice
- `setCurrentView(view)` - Navigate
- `addNotification({ type, message })` - Show notification
- `removeNotification(id)` - Remove notification
- `clearNotifications()` - Clear all
- `toggleSidebar()` - Toggle sidebar
- `setSidebarCollapsed(boolean)` - Set sidebar state
- `setTheme('light' | 'dark')` - Change theme

### Shipments Slice
- `setShipments(shipments[])` - Set all shipments
- `addShipment(shipment)` - Add new shipment
- `updateShipment(shipment)` - Update existing
- `deleteShipment(id)` - Remove shipment
- `setSelectedShipment(shipment)` - Select shipment
- `setLoading(boolean)` - Set loading state
- `setError(message)` - Set error state

### Partners Slice
- `setPartners(partners[])` - Set all partners
- `addPartner(partner)` - Add new partner
- `updatePartner(partner)` - Update existing
- `deletePartner(id)` - Remove partner
- `setSelectedPartner(partner)` - Select partner

### Users Slice
- `setUsers(users[])` - Set all users
- `addUser(user)` - Add new user
- `updateUser(user)` - Update existing
- `deleteUser(id)` - Remove user
- `setSelectedUser(user)` - Select user

---

## 🧪 Testing

### Manual Testing
```typescript
// 1. Open Redux DevTools
// 2. Sign in
// 3. Check auth state in DevTools
// 4. Navigate around
// 5. Verify state updates
// 6. Sign out
// 7. Verify state cleared
```

### Automated Testing (Future)
```typescript
import { store } from './store';
import { setCredentials } from './store/slices/authSlice';

test('login sets credentials', () => {
  store.dispatch(setCredentials({ user: mockUser, token: 'abc123' }));
  expect(store.getState().auth.user).toEqual(mockUser);
  expect(store.getState().auth.isAuthenticated).toBe(true);
});
```

---

## ⚠️ Important Notes

### Session-Based State
- ✅ State is **in-memory only**
- ✅ Clears on page refresh
- ✅ No data persists in browser
- ⚠️ Users must re-login after refresh

### If You Need Persistence
Add Redux Persist:
```bash
npm install redux-persist
```

Then configure in `/store/index.ts`:
```typescript
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // Only persist auth
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
```

---

## 🎓 Learning Resources

### Official Documentation
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React-Redux Hooks](https://react-redux.js.org/api/hooks)
- [Redux Style Guide](https://redux.js.org/style-guide/)

### Video Tutorials
- [Redux Toolkit Tutorial](https://www.youtube.com/watch?v=9zySeP5vH9c)
- [Redux for Beginners](https://www.youtube.com/watch?v=poQXNp9ItL4)

### Interactive Learning
- [Redux Essentials Tutorial](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
- [TypeScript with Redux](https://redux.js.org/usage/usage-with-typescript)

---

## 🆘 Troubleshooting

### Issue: "Cannot read property 'user' of undefined"
**Solution:** Ensure Provider wraps your app
```typescript
<Provider store={store}>
  <App />
</Provider>
```

### Issue: State not updating
**Solution:** Use typed hooks
```typescript
import { useAppDispatch } from '../store/hooks'; // ✅
// Not: import { useDispatch } from 'react-redux'; // ❌
```

### Issue: TypeScript errors
**Solution:** Import from correct location
```typescript
import { useAppSelector } from '../store/hooks'; // ✅
```

---

## 🎉 Summary

**Redux Implementation Complete!**

✅ No localStorage usage  
✅ Centralized state management  
✅ Type-safe with TypeScript  
✅ Redux DevTools integration  
✅ Better developer experience  
✅ Production-ready architecture  

---

## 📞 Need Help?

Refer to these guides:
1. **Quick Reference** → `/REDUX_QUICK_REFERENCE.md`
2. **Implementation Details** → `/REDUX_IMPLEMENTATION.md`
3. **Migration Guide** → `/MIGRATION_GUIDE.md`
4. **Tech Stack** → `/TECH_STACK.md`

---

**Happy Coding! 🚀**
