# 🔄 Migration Guide: Manual API → RTK Query

## Overview

This guide shows how to migrate from manual API calls to RTK Query hooks in your components.

---

## 📋 Before & After Examples

### Example 1: Fetching Data (GET)

#### ❌ Before (Manual API)
```typescript
import { useState, useEffect } from 'react';
import { shipmentsService } from '../services';

function ShipmentsList() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchShipments = async () => {
      setLoading(true);
      try {
        const response = await shipmentsService.getAll({ page: 1, limit: 10 });
        setShipments(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchShipments();
  }, []);
  
  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  
  return (
    <div>
      {shipments.map(shipment => (
        <ShipmentCard key={shipment.id} shipment={shipment} />
      ))}
    </div>
  );
}
```

#### ✅ After (RTK Query)
```typescript
import { useGetShipmentsQuery } from '../store/api';

function ShipmentsList() {
  const { data, isLoading, error } = useGetShipmentsQuery({ 
    page: 1, 
    limit: 10 
  });
  
  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  
  return (
    <div>
      {data?.data.map(shipment => (
        <ShipmentCard key={shipment.id} shipment={shipment} />
      ))}
    </div>
  );
}
```

**Benefits:**
- ✅ 60% less code
- ✅ Automatic caching
- ✅ Automatic refetching
- ✅ Better type safety

---

### Example 2: Creating Data (POST)

#### ❌ Before (Manual API)
```typescript
import { useState } from 'react';
import { shipmentsService } from '../services';
import { toast } from 'sonner';

function CreateShipment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (formData: CreateShipmentRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await shipmentsService.create(formData);
      toast.success('Shipment created!');
      navigate('/shipments');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to create shipment');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
      </button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </form>
  );
}
```

#### ✅ After (RTK Query)
```typescript
import { useCreateShipmentMutation } from '../store/api';
import { toast } from 'sonner';

function CreateShipment() {
  const [createShipment, { isLoading, error }] = useCreateShipmentMutation();
  
  const handleSubmit = async (formData: CreateShipmentRequest) => {
    try {
      await createShipment(formData).unwrap();
      toast.success('Shipment created!');
      navigate('/shipments');
    } catch (err) {
      toast.error('Failed to create shipment');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create'}
      </button>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </form>
  );
}
```

**Benefits:**
- ✅ Automatic cache invalidation
- ✅ List refreshes automatically
- ✅ Less state management
- ✅ Built-in error handling

---

### Example 3: Updating Data (PUT)

#### ❌ Before (Manual API)
```typescript
import { useState } from 'react';
import { shipmentsService } from '../services';

function UpdateShipmentStatus({ shipmentId }: { shipmentId: string }) {
  const [loading, setLoading] = useState(false);
  
  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    try {
      await shipmentsService.update(shipmentId, { status: newStatus });
      toast.success('Status updated!');
      // Manually refetch shipments list
      refetchShipments();
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <select onChange={(e) => handleStatusChange(e.target.value)} disabled={loading}>
      <option>Pending</option>
      <option>In Transit</option>
      <option>Delivered</option>
    </select>
  );
}
```

#### ✅ After (RTK Query)
```typescript
import { useUpdateShipmentMutation } from '../store/api';

function UpdateShipmentStatus({ shipmentId }: { shipmentId: string }) {
  const [updateShipment, { isLoading }] = useUpdateShipmentMutation();
  
  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateShipment({ 
        id: shipmentId, 
        data: { status: newStatus } 
      }).unwrap();
      toast.success('Status updated!');
      // Cache invalidation is automatic!
    } catch (err) {
      toast.error('Update failed');
    }
  };
  
  return (
    <select onChange={(e) => handleStatusChange(e.target.value)} disabled={isLoading}>
      <option>Pending</option>
      <option>In Transit</option>
      <option>Delivered</option>
    </select>
  );
}
```

**Benefits:**
- ✅ Auto-refetch (no manual refetchShipments call)
- ✅ Optimistic updates possible
- ✅ Cache stays in sync

---

### Example 4: Deleting Data (DELETE)

#### ❌ Before (Manual API)
```typescript
import { useState } from 'react';
import { shipmentsService } from '../services';

function DeleteShipmentButton({ shipmentId }: { shipmentId: string }) {
  const [loading, setLoading] = useState(false);
  
  const handleDelete = async () => {
    if (!confirm('Delete this shipment?')) return;
    
    setLoading(true);
    try {
      await shipmentsService.delete(shipmentId);
      toast.success('Shipment deleted');
      // Manually update local state or refetch
      refetchShipments();
    } catch (err) {
      toast.error('Delete failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
}
```

#### ✅ After (RTK Query)
```typescript
import { useDeleteShipmentMutation } from '../store/api';

function DeleteShipmentButton({ shipmentId }: { shipmentId: string }) {
  const [deleteShipment, { isLoading }] = useDeleteShipmentMutation();
  
  const handleDelete = async () => {
    if (!confirm('Delete this shipment?')) return;
    
    try {
      await deleteShipment(shipmentId).unwrap();
      toast.success('Shipment deleted');
      // List updates automatically!
    } catch (err) {
      toast.error('Delete failed');
    }
  };
  
  return (
    <button onClick={handleDelete} disabled={isLoading}>
      {isLoading ? 'Deleting...' : 'Delete'}
    </button>
  );
}
```

---

### Example 5: Authentication

#### ❌ Before (Manual API)
```typescript
import { useState } from 'react';
import { authService } from '../services';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';

function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  
  const handleSubmit = async (credentials: LoginRequest) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await authService.login(credentials);
      dispatch(setCredentials(response));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <button disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
```

#### ✅ After (RTK Query)
```typescript
import { useLoginMutation } from '../store/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';

function SignIn() {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  
  const handleSubmit = async (credentials: LoginRequest) => {
    try {
      const response = await login(credentials).unwrap();
      dispatch(setCredentials(response));
      navigate('/dashboard');
    } catch (err) {
      // Error already in `error` state
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <button disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
```

---

### Example 6: Lazy/Manual Queries

#### ❌ Before (Manual API)
```typescript
import { useState } from 'react';
import { shipmentsService } from '../services';

function TrackShipment() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleTrack = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await shipmentsService.track(trackingNumber);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <input 
        value={trackingNumber} 
        onChange={(e) => setTrackingNumber(e.target.value)} 
      />
      <button onClick={handleTrack} disabled={loading}>
        {loading ? 'Tracking...' : 'Track'}
      </button>
      {error && <Error>{error}</Error>}
      {result && <ShipmentDetails shipment={result} />}
    </div>
  );
}
```

#### ✅ After (RTK Query)
```typescript
import { useLazyTrackShipmentQuery } from '../store/api';

function TrackShipment() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [track, { data, isLoading, error }] = useLazyTrackShipmentQuery();
  
  const handleTrack = () => {
    track(trackingNumber);
  };
  
  return (
    <div>
      <input 
        value={trackingNumber} 
        onChange={(e) => setTrackingNumber(e.target.value)} 
      />
      <button onClick={handleTrack} disabled={isLoading}>
        {isLoading ? 'Tracking...' : 'Track'}
      </button>
      {error && <Error>{error.message}</Error>}
      {data && <ShipmentDetails shipment={data} />}
    </div>
  );
}
```

---

## 🔄 Step-by-Step Migration Process

### Step 1: Keep Both Approaches Initially
```typescript
// ✅ Use RTK Query for new features
import { useGetShipmentsQuery } from '../store/api';

// ⚠️ Keep old API calls for existing features (for now)
import { shipmentsService } from '../services';
```

### Step 2: Migrate Component by Component
1. Start with simple GET queries
2. Then migrate mutations (POST, PUT, DELETE)
3. Test each component thoroughly
4. Remove old API call imports

### Step 3: Update Redux Slices (if needed)
```typescript
// Before: Manual data in Redux slice
const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState: { data: [], loading: false },
  reducers: {
    setShipments: (state, action) => {
      state.data = action.payload;
    },
  },
});

// After: RTK Query handles data, Redux slice only for UI state
const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState: { 
    selectedShipment: null,
    filters: {},
  },
  reducers: {
    setSelectedShipment: (state, action) => {
      state.selectedShipment = action.payload;
    },
  },
});
```

---

## 📊 Benefits Summary

| Aspect | Manual API | RTK Query |
|--------|-----------|-----------|
| **Code Lines** | 100% | ~40% |
| **Boilerplate** | High | Minimal |
| **Caching** | Manual | Automatic |
| **Refetching** | Manual | Automatic |
| **Loading States** | Manual useState | Built-in |
| **Error Handling** | Manual try/catch | Built-in |
| **Type Safety** | Partial | Complete |
| **Performance** | Good | Excellent |
| **Developer Experience** | Okay | Great |

---

## ✅ Migration Checklist

- [ ] Install `@reduxjs/toolkit` (already done)
- [ ] Create base API configuration (`/store/api/baseApi.ts`)
- [ ] Create API slices for each domain
- [ ] Update store with RTK Query middleware
- [ ] Export generated hooks
- [ ] Migrate components one by one
- [ ] Test cache invalidation
- [ ] Remove old API service imports
- [ ] Update documentation

---

## 🎉 Result

After migration:
- ✅ **60% less code**
- ✅ **Automatic caching**
- ✅ **Better performance**
- ✅ **Improved DX**
- ✅ **Type-safe**
- ✅ **Less bugs**

---

## 📚 Next Steps

1. Read `/RTK_QUERY_GUIDE.md` for complete documentation
2. Start with simple queries (GET)
3. Progress to mutations (POST, PUT, DELETE)
4. Implement optimistic updates
5. Add polling where needed
6. Remove old API calls

**Happy migrating! 🚀**
