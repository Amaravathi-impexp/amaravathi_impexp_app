# 🚀 Redux Quick Reference Guide

Quick reference for common Redux operations in the Amaravathi Imports & Exports application.

---

## 📦 Import Statements

```typescript
// Always use these imports at the top of your component
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCredentials, logout, updateUser } from '../store/slices/authSlice';
import { setCurrentView, addNotification } from '../store/slices/uiSlice';
import { addShipment, setShipments } from '../store/slices/shipmentsSlice';
import { addPartner, setPartners } from '../store/slices/partnersSlice';
import { addUser, setUsers } from '../store/slices/usersSlice';
```

---

## 🔐 Authentication

### Login
```typescript
const dispatch = useAppDispatch();

const handleLogin = async () => {
  const response = await mockApi.auth.login({ email, password });
  
  dispatch(setCredentials({
    user: response.user,
    token: response.token
  }));
};
```

### Logout
```typescript
const dispatch = useAppDispatch();

const handleLogout = () => {
  dispatch(logout());
  dispatch(setCurrentView('home'));
};
```

### Get Current User
```typescript
const currentUser = useAppSelector((state) => state.auth.user);
const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
const token = useAppSelector((state) => state.auth.token);
```

### Check User Role
```typescript
const currentUser = useAppSelector((state) => state.auth.user);
const isAdmin = currentUser?.role === 'Admin';
const isImporter = currentUser?.role === 'Importer';
const isExporter = currentUser?.role === 'Exporter';
```

### Update User Profile
```typescript
const dispatch = useAppDispatch();
const currentUser = useAppSelector((state) => state.auth.user);

const handleUpdateProfile = () => {
  if (currentUser) {
    dispatch(updateUser({
      ...currentUser,
      name: 'New Name',
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    }));
  }
};
```

---

## 🎨 UI State

### Change View/Page
```typescript
const dispatch = useAppDispatch();

// Navigate to different views
dispatch(setCurrentView('home'));
dispatch(setCurrentView('signin'));
dispatch(setCurrentView('signup'));
dispatch(setCurrentView('dashboard'));
dispatch(setCurrentView('about'));
dispatch(setCurrentView('careers'));
dispatch(setCurrentView('contact'));
```

### Get Current View
```typescript
const currentView = useAppSelector((state) => state.ui.currentView);

if (currentView === 'dashboard') {
  // Show dashboard
}
```

### Add Notification
```typescript
const dispatch = useAppDispatch();

// Success notification
dispatch(addNotification({
  type: 'success',
  message: 'Shipment created successfully!'
}));

// Error notification
dispatch(addNotification({
  type: 'error',
  message: 'Failed to create shipment'
}));

// Warning notification
dispatch(addNotification({
  type: 'warning',
  message: 'Some fields are missing'
}));

// Info notification
dispatch(addNotification({
  type: 'info',
  message: 'New feature available'
}));
```

### Get Notifications
```typescript
const notifications = useAppSelector((state) => state.ui.notifications);
```

### Remove Notification
```typescript
const dispatch = useAppDispatch();

dispatch(removeNotification(notificationId));
```

### Clear All Notifications
```typescript
const dispatch = useAppDispatch();

dispatch(clearNotifications());
```

### Sidebar State
```typescript
const dispatch = useAppDispatch();
const sidebarCollapsed = useAppSelector((state) => state.ui.sidebarCollapsed);

// Toggle sidebar
dispatch(toggleSidebar());

// Set sidebar state
dispatch(setSidebarCollapsed(true));
dispatch(setSidebarCollapsed(false));
```

### Theme
```typescript
const dispatch = useAppDispatch();
const theme = useAppSelector((state) => state.ui.theme);

// Change theme
dispatch(setTheme('dark'));
dispatch(setTheme('light'));
```

---

## 📦 Shipments

### Get All Shipments
```typescript
const shipments = useAppSelector((state) => state.shipments.shipments);
const loading = useAppSelector((state) => state.shipments.loading);
const error = useAppSelector((state) => state.shipments.error);
```

### Load Shipments from API
```typescript
const dispatch = useAppDispatch();

useEffect(() => {
  const loadShipments = async () => {
    dispatch(setLoading(true));
    try {
      const data = await mockApi.shipments.list();
      dispatch(setShipments(data));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
  loadShipments();
}, [dispatch]);
```

### Add New Shipment
```typescript
const dispatch = useAppDispatch();

const handleCreateShipment = async (shipmentData) => {
  const newShipment = await mockApi.shipments.create(shipmentData);
  dispatch(addShipment(newShipment));
};
```

### Update Shipment
```typescript
const dispatch = useAppDispatch();

const handleUpdateShipment = async (id, updates) => {
  const updatedShipment = await mockApi.shipments.update(id, updates);
  dispatch(updateShipment(updatedShipment));
};
```

### Delete Shipment
```typescript
const dispatch = useAppDispatch();

const handleDeleteShipment = async (id) => {
  await mockApi.shipments.delete(id);
  dispatch(deleteShipment(id));
};
```

### Select Shipment
```typescript
const dispatch = useAppDispatch();
const selectedShipment = useAppSelector((state) => state.shipments.selectedShipment);

// Select a shipment
dispatch(setSelectedShipment(shipment));

// Clear selection
dispatch(setSelectedShipment(null));
```

---

## 🤝 Partners

### Get All Partners
```typescript
const partners = useAppSelector((state) => state.partners.partners);
const loading = useAppSelector((state) => state.partners.loading);
const error = useAppSelector((state) => state.partners.error);
```

### Add New Partner
```typescript
const dispatch = useAppDispatch();

const handleCreatePartner = async (partnerData) => {
  const newPartner = await mockApi.partners.create(partnerData);
  dispatch(addPartner(newPartner));
};
```

### Update Partner
```typescript
const dispatch = useAppDispatch();

const handleUpdatePartner = async (id, updates) => {
  const updatedPartner = await mockApi.partners.update(id, updates);
  dispatch(updatePartner(updatedPartner));
};
```

### Delete Partner
```typescript
const dispatch = useAppDispatch();

const handleDeletePartner = async (id) => {
  await mockApi.partners.delete(id);
  dispatch(deletePartner(id));
};
```

### Select Partner
```typescript
const dispatch = useAppDispatch();
const selectedPartner = useAppSelector((state) => state.partners.selectedPartner);

// Select a partner
dispatch(setSelectedPartner(partner));

// Clear selection
dispatch(setSelectedPartner(null));
```

---

## 👥 Users

### Get All Users (Admin Only)
```typescript
const users = useAppSelector((state) => state.users.users);
const loading = useAppSelector((state) => state.users.loading);
```

### Add New User
```typescript
const dispatch = useAppDispatch();

const handleCreateUser = async (userData) => {
  const newUser = await mockApi.users.create(userData);
  dispatch(addUser(newUser));
};
```

### Update User
```typescript
const dispatch = useAppDispatch();

const handleUpdateUser = async (id, updates) => {
  const updatedUser = await mockApi.users.update(id, updates);
  dispatch(updateUser(updatedUser));
};
```

### Delete User
```typescript
const dispatch = useAppDispatch();

const handleDeleteUser = async (id) => {
  await mockApi.users.delete(id);
  dispatch(deleteUser(id));
};
```

---

## 🔄 Loading & Error States

### Set Loading State
```typescript
const dispatch = useAppDispatch();

// For shipments
dispatch(setLoading(true));
// ... perform async operation
dispatch(setLoading(false));

// Same pattern for partners and users slices
```

### Handle Errors
```typescript
const dispatch = useAppDispatch();

try {
  const data = await mockApi.shipments.list();
  dispatch(setShipments(data));
} catch (err) {
  dispatch(setError(err.message));
  
  // Optionally show notification
  dispatch(addNotification({
    type: 'error',
    message: err.message
  }));
}
```

### Clear Errors
```typescript
const dispatch = useAppDispatch();

dispatch(setError(null));
```

---

## 💡 Common Patterns

### Form Submission with Redux
```typescript
const dispatch = useAppDispatch();
const [formData, setFormData] = useState({ /* ... */ });
const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const result = await mockApi.shipments.create(formData);
    dispatch(addShipment(result));
    dispatch(addNotification({
      type: 'success',
      message: 'Shipment created successfully!'
    }));
    // Reset form or navigate away
  } catch (err) {
    dispatch(addNotification({
      type: 'error',
      message: err.message
    }));
  } finally {
    setLoading(false);
  }
};
```

### Conditional Rendering Based on Auth
```typescript
const currentUser = useAppSelector((state) => state.auth.user);
const isAdmin = currentUser?.role === 'Admin';

return (
  <div>
    {isAdmin && (
      <AdminPanel />
    )}
    {currentUser && (
      <UserDashboard user={currentUser} />
    )}
  </div>
);
```

### Multiple Selectors
```typescript
// Get multiple values at once
const { user, isAuthenticated } = useAppSelector((state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
}));

// Or separately for better performance
const user = useAppSelector((state) => state.auth.user);
const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
```

### Derived State
```typescript
const shipments = useAppSelector((state) => state.shipments.shipments);

// Compute derived values
const activeShipments = shipments.filter(s => s.status === 'In Transit');
const completedShipments = shipments.filter(s => s.status === 'Delivered');
const totalValue = shipments.reduce((sum, s) => sum + s.value, 0);
```

---

## 🎯 Best Practices

### 1. Always Use Typed Hooks
```typescript
// ✅ Good
import { useAppDispatch, useAppSelector } from '../store/hooks';

// ❌ Bad
import { useDispatch, useSelector } from 'react-redux';
```

### 2. Dispatch Actions, Don't Mutate State
```typescript
// ✅ Good
dispatch(updateUser({ ...currentUser, name: 'New Name' }));

// ❌ Bad - Never do this!
currentUser.name = 'New Name';
```

### 3. Use Descriptive Action Names
```typescript
// ✅ Good
dispatch(addNotification({ type: 'success', message: 'Saved!' }));

// ❌ Bad
dispatch({ type: 'NOTIF', payload: 'Saved!' });
```

### 4. Handle Loading and Errors
```typescript
// ✅ Good
const loading = useAppSelector((state) => state.shipments.loading);
const error = useAppSelector((state) => state.shipments.error);

if (loading) return <Spinner />;
if (error) return <ErrorMessage error={error} />;
```

### 5. Clean Up on Unmount
```typescript
useEffect(() => {
  // Load data on mount
  dispatch(setLoading(true));
  loadData();
  
  return () => {
    // Clean up on unmount (if needed)
    dispatch(setSelectedShipment(null));
    dispatch(setError(null));
  };
}, [dispatch]);
```

---

## 🐛 Debugging

### Redux DevTools
1. Install [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)
2. Open browser DevTools
3. Select "Redux" tab
4. Inspect state, actions, and time travel

### Console Logging
```typescript
const shipments = useAppSelector((state) => {
  console.log('Current shipments:', state.shipments.shipments);
  return state.shipments.shipments;
});
```

### Get Entire State
```typescript
const entireState = useAppSelector((state) => state);
console.log('Entire Redux State:', entireState);
```

---

## 📚 Full Example Component

```typescript
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setShipments, addShipment, setLoading, setError } from '../store/slices/shipmentsSlice';
import { addNotification } from '../store/slices/uiSlice';
import { mockApi } from '../services/mock-api';

export function ShipmentsList() {
  const dispatch = useAppDispatch();
  
  // Get state from Redux
  const shipments = useAppSelector((state) => state.shipments.shipments);
  const loading = useAppSelector((state) => state.shipments.loading);
  const error = useAppSelector((state) => state.shipments.error);
  const currentUser = useAppSelector((state) => state.auth.user);
  
  // Load shipments on mount
  useEffect(() => {
    const loadShipments = async () => {
      dispatch(setLoading(true));
      try {
        const data = await mockApi.shipments.list();
        dispatch(setShipments(data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };
    
    loadShipments();
  }, [dispatch]);
  
  // Handle create
  const handleCreate = async (shipmentData) => {
    try {
      const newShipment = await mockApi.shipments.create(shipmentData);
      dispatch(addShipment(newShipment));
      dispatch(addNotification({
        type: 'success',
        message: 'Shipment created successfully!'
      }));
    } catch (err) {
      dispatch(addNotification({
        type: 'error',
        message: err.message
      }));
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>Shipments for {currentUser?.name}</h1>
      <ul>
        {shipments.map(shipment => (
          <li key={shipment.id}>{shipment.cargo}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🎉 That's It!

You now have everything you need to work with Redux in the Amaravathi Imports & Exports application. Happy coding! 🚀
