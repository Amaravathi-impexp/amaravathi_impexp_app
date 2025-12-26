# 🚀 RTK Query Implementation Guide

## Overview

**RTK Query** is now fully integrated into the Amaravathi Imports & Exports application. It provides powerful data fetching, caching, and state management capabilities built on top of Redux Toolkit.

---

## 📦 What is RTK Query?

RTK Query is a **data fetching and caching tool** built into Redux Toolkit that provides:

✅ **Automatic Caching** - Smart cache management with tags  
✅ **Auto Refetching** - Invalidates and refetches data automatically  
✅ **Optimistic Updates** - Update UI before server responds  
✅ **Polling** - Auto-refresh data at intervals  
✅ **TypeScript First** - Full type safety out of the box  
✅ **Loading States** - Automatic loading, error, success states  
✅ **Request Deduplication** - Prevents duplicate requests  
✅ **Normalized Cache** - Efficient data storage  

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│              Component Layer                        │
│   Uses RTK Query Hooks                              │
│   (useGetShipmentsQuery, etc.)                      │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│           RTK Query API Slices                      │
│   - authApi.ts                                      │
│   - shipmentsApi.ts                                 │
│   - partnersApi.ts                                  │
│   - usersApi.ts                                     │
│   - dashboardApi.ts                                 │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│           Base API (baseApi.ts)                     │
│   - fetchBaseQuery                                  │
│   - Auto token injection from Redux                 │
│   - Error handling & reauth                         │
│   - Tag-based cache invalidation                    │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│          Native Fetch API (Browser)                 │
└─────────────────────────────────────────────────────┘
```

---

## 📁 File Structure

```
/store
├── index.ts                    # Store config with RTK Query middleware
├── hooks.ts                    # Typed Redux hooks
├── slices/                     # Redux slices (existing)
│   ├── authSlice.ts
│   ├── shipmentsSlice.ts
│   └── ...
└── api/                        # RTK Query API slices (NEW)
    ├── baseApi.ts             # Base API configuration
    ├── authApi.ts             # Authentication endpoints
    ├── shipmentsApi.ts        # Shipments CRUD
    ├── partnersApi.ts         # Partners CRUD
    ├── usersApi.ts            # User management
    ├── dashboardApi.ts        # Dashboard analytics
    └── index.ts               # API exports
```

---

## 🔧 Configuration

### Store Setup (`/store/index.ts`)

```typescript
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import authReducer from './slices/authSlice';
// ... other reducers

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // ... other slices
    [baseApi.reducerPath]: baseApi.reducer,  // Add RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware),  // Add RTK Query middleware
});
```

### Base API (`/store/api/baseApi.ts`)

```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.amaravathi.com/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Shipments', 'Partners', 'Users', 'Documents', 'Invoices', 'Dashboard'],
  endpoints: () => ({}),
});
```

---

## 📋 API Slices

### 1. Auth API (`authApi.ts`)

```typescript
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    
    signUp: builder.mutation<LoginResponse, SignUpRequest>({
      query: (data) => ({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
    }),
    
    getCurrentUser: builder.query<User, void>({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),
  }),
});

// Auto-generated hooks
export const {
  useLoginMutation,
  useSignUpMutation,
  useGetCurrentUserQuery,
} = authApi;
```

### 2. Shipments API (`shipmentsApi.ts`)

```typescript
export const shipmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShipments: builder.query<PaginatedResponse<Shipment>, ShipmentQueryParams>({
      query: (params) => ({ url: '/shipments', params }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Shipments' as const, id })),
              { type: 'Shipments', id: 'LIST' },
            ]
          : [{ type: 'Shipments', id: 'LIST' }],
    }),
    
    createShipment: builder.mutation<Shipment, CreateShipmentRequest>({
      query: (data) => ({
        url: '/shipments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Shipments', id: 'LIST' }, 'Dashboard'],
    }),
    
    updateShipment: builder.mutation<Shipment, { id: string; data: UpdateShipmentRequest }>({
      query: ({ id, data }) => ({
        url: `/shipments/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Shipments', id },
        { type: 'Shipments', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetShipmentsQuery,
  useCreateShipmentMutation,
  useUpdateShipmentMutation,
} = shipmentsApi;
```

---

## 🎣 Using RTK Query Hooks

### Query Hooks (GET requests)

#### Basic Usage
```typescript
import { useGetShipmentsQuery } from '../store/api';

function ShipmentsList() {
  const { data, error, isLoading, isFetching, refetch } = useGetShipmentsQuery({
    page: 1,
    limit: 10,
  });
  
  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  
  return (
    <div>
      {data?.data.map(shipment => (
        <ShipmentCard key={shipment.id} shipment={shipment} />
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

#### With Polling (Auto-refresh)
```typescript
const { data } = useGetShipmentsQuery(
  { page: 1 },
  {
    pollingInterval: 30000, // Refetch every 30 seconds
  }
);
```

#### Skip Query
```typescript
const { data } = useGetShipmentByIdQuery(
  shipmentId,
  {
    skip: !shipmentId, // Skip if no ID
  }
);
```

#### Lazy Query (Manual trigger)
```typescript
import { useLazyGetShipmentsQuery } from '../store/api';

function SearchShipments() {
  const [trigger, { data, isLoading }] = useLazyGetShipmentsQuery();
  
  const handleSearch = (query: string) => {
    trigger({ search: query });
  };
  
  return (
    <div>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {isLoading && <Spinner />}
      {data && <Results data={data} />}
    </div>
  );
}
```

### Mutation Hooks (POST, PUT, DELETE)

#### Create
```typescript
import { useCreateShipmentMutation } from '../store/api';

function CreateShipment() {
  const [createShipment, { isLoading, error }] = useCreateShipmentMutation();
  
  const handleSubmit = async (formData: CreateShipmentRequest) => {
    try {
      const result = await createShipment(formData).unwrap();
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

#### Update
```typescript
const [updateShipment, { isLoading }] = useUpdateShipmentMutation();

const handleUpdate = async () => {
  await updateShipment({
    id: shipmentId,
    data: { status: 'Delivered' }
  }).unwrap();
};
```

#### Delete
```typescript
const [deleteShipment] = useDeleteShipmentMutation();

const handleDelete = async (id: string) => {
  if (confirm('Delete this shipment?')) {
    await deleteShipment(id).unwrap();
    toast.success('Shipment deleted');
  }
};
```

---

## 🎯 Cache Management

### Tag-Based Invalidation

RTK Query uses **tags** to manage cache invalidation:

```typescript
// Provide tags (marks data in cache)
getShipments: builder.query({
  query: () => '/shipments',
  providesTags: (result) => [
    ...result.data.map(({ id }) => ({ type: 'Shipments', id })),
    { type: 'Shipments', id: 'LIST' },
  ],
}),

// Invalidate tags (clears cache and refetches)
createShipment: builder.mutation({
  query: (data) => ({ url: '/shipments', method: 'POST', body: data }),
  invalidatesTags: [{ type: 'Shipments', id: 'LIST' }],
}),
```

**When a shipment is created:**
1. `createShipment` mutation runs
2. It invalidates the `Shipments:LIST` tag
3. Any component using `useGetShipmentsQuery` automatically refetches
4. UI updates with new data

### Manual Cache Management

```typescript
import { useDispatch } from 'react-redux';
import { baseApi } from '../store/api';

function ManualRefresh() {
  const dispatch = useDispatch();
  
  const handleRefresh = () => {
    // Invalidate specific tags
    dispatch(baseApi.util.invalidateTags(['Shipments']));
    
    // Reset entire API cache
    dispatch(baseApi.util.resetApiState());
  };
  
  return <button onClick={handleRefresh}>Refresh All</button>;
}
```

---

## ⚡ Optimistic Updates

Update UI immediately before server responds:

```typescript
updateShipment: builder.mutation({
  query: ({ id, data }) => ({
    url: `/shipments/${id}`,
    method: 'PUT',
    body: data,
  }),
  async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
    // Optimistic update
    const patchResult = dispatch(
      shipmentsApi.util.updateQueryData('getShipments', undefined, (draft) => {
        const shipment = draft.data.find(s => s.id === id);
        if (shipment) {
          Object.assign(shipment, data);
        }
      })
    );
    
    try {
      await queryFulfilled;
    } catch {
      // Rollback on error
      patchResult.undo();
    }
  },
}),
```

---

## 📊 Response States

Every query hook returns:

```typescript
const {
  data,           // Response data
  error,          // Error object
  isLoading,      // Initial loading (no data yet)
  isFetching,     // Fetching (may have cached data)
  isSuccess,      // Request succeeded
  isError,        // Request failed
  refetch,        // Manual refetch function
  currentData,    // Current data (doesn't revert to undefined)
  originalArgs,   // Original query arguments
} = useGetShipmentsQuery(params);
```

Mutation hooks return:

```typescript
const [
  mutate,         // Trigger function
  {
    data,         // Response data
    error,        // Error object
    isLoading,    // Mutation in progress
    isSuccess,    // Mutation succeeded
    isError,      // Mutation failed
    reset,        // Reset mutation state
  }
] = useCreateShipmentMutation();
```

---

## 🔐 Authentication Flow

```typescript
// 1. Login mutation
const [login] = useLoginMutation();

const handleLogin = async (credentials: LoginRequest) => {
  try {
    const result = await login(credentials).unwrap();
    
    // 2. Update auth slice
    dispatch(setCredentials({
      user: result.user,
      token: result.token,
    }));
    
    // 3. Token automatically added to all future requests
    navigate('/dashboard');
  } catch (err) {
    toast.error('Login failed');
  }
};
```

Token is automatically injected via `prepareHeaders`:

```typescript
prepareHeaders: (headers, { getState }) => {
  const token = (getState() as RootState).auth.token;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
}
```

---

## 🎨 Example Components

### Dashboard with Real-time Stats
```typescript
import { 
  useGetDashboardStatsQuery,
  useGetShipmentsByStatusQuery,
  useGetRecentActivitiesQuery,
} from '../store/api';

function Dashboard() {
  const { data: stats } = useGetDashboardStatsQuery();
  const { data: statusData } = useGetShipmentsByStatusQuery();
  const { data: activities } = useGetRecentActivitiesQuery(
    { limit: 10 },
    { pollingInterval: 30000 } // Auto-refresh every 30s
  );
  
  return (
    <div>
      <StatsCards stats={stats} />
      <StatusChart data={statusData} />
      <ActivityFeed activities={activities} />
    </div>
  );
}
```

### Shipments List with Filters
```typescript
function ShipmentsList() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<ShipmentQueryParams>({});
  
  const { data, isLoading, isFetching } = useGetShipmentsQuery({
    page,
    limit: 20,
    ...filters,
  });
  
  return (
    <div>
      <Filters onChange={setFilters} />
      {isLoading && <Spinner />}
      {data?.data.map(shipment => (
        <ShipmentCard key={shipment.id} shipment={shipment} />
      ))}
      {isFetching && <InlineSpinner />}
      <Pagination 
        page={page} 
        total={data?.total} 
        onChange={setPage} 
      />
    </div>
  );
}
```

### Create Shipment Form
```typescript
function CreateShipmentForm() {
  const [createShipment, { isLoading, error }] = useCreateShipmentMutation();
  const navigate = useNavigate();
  
  const handleSubmit = async (data: CreateShipmentRequest) => {
    try {
      const result = await createShipment(data).unwrap();
      toast.success(`Shipment ${result.trackingNumber} created!`);
      navigate('/shipments');
    } catch (err) {
      console.error('Failed to create shipment:', err);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Shipment'}
      </button>
      {error && <ErrorMessage error={error} />}
    </form>
  );
}
```

---

## 🆚 RTK Query vs Manual API Calls

| Feature | Manual API | RTK Query |
|---------|-----------|-----------|
| **Caching** | Manual | ✅ Automatic |
| **Loading States** | Manual useState | ✅ Built-in |
| **Error Handling** | Manual try/catch | ✅ Built-in |
| **Refetching** | Manual | ✅ Automatic |
| **Deduplication** | No | ✅ Yes |
| **Polling** | Manual setInterval | ✅ Built-in |
| **Optimistic Updates** | Complex | ✅ Simple API |
| **Type Safety** | Manual types | ✅ Auto-generated |
| **DevTools** | No | ✅ Redux DevTools |

---

## ✅ Best Practices

### 1. Use Tags for Cache Management
```typescript
// ✅ Good - Specific tags
providesTags: (result) => [
  { type: 'Shipments', id: 'LIST' },
  ...result.data.map(({ id }) => ({ type: 'Shipments', id })),
]

// ❌ Bad - Generic tags
providesTags: ['Shipments']
```

### 2. Handle Errors Properly
```typescript
// ✅ Good - Use unwrap()
try {
  await createShipment(data).unwrap();
  toast.success('Success!');
} catch (err) {
  toast.error(err.data?.message || 'Failed');
}

// ❌ Bad - No error handling
await createShipment(data);
```

### 3. Use Lazy Queries for Manual Control
```typescript
// ✅ Good - Manual trigger
const [trigger, result] = useLazyGetShipmentsQuery();
const handleSearch = () => trigger({ search: query });

// ❌ Bad - Query runs immediately
const { data } = useGetShipmentsQuery({ search: query });
```

### 4. Skip Unnecessary Queries
```typescript
// ✅ Good - Skip when no ID
const { data } = useGetShipmentByIdQuery(id, { skip: !id });

// ❌ Bad - Query fails with undefined ID
const { data } = useGetShipmentByIdQuery(id);
```

---

## 🎉 Summary

RTK Query provides:

✅ **Automatic caching** - Smart cache with tag-based invalidation  
✅ **Loading states** - Built-in isLoading, isFetching, isError  
✅ **Auto-refetching** - Invalidate tags to trigger refetch  
✅ **Type safety** - Full TypeScript support  
✅ **Optimistic updates** - Update UI before server responds  
✅ **Polling** - Auto-refresh data at intervals  
✅ **Request deduplication** - Prevents duplicate requests  
✅ **DevTools integration** - Debug with Redux DevTools  

**Result:** Less boilerplate, better UX, and more maintainable code! 🚀

---

## 📚 Resources

- [RTK Query Official Docs](https://redux-toolkit.js.org/rtk-query/overview)
- [RTK Query TypeScript Guide](https://redux-toolkit.js.org/rtk-query/usage-with-typescript)
- [Cache Behavior](https://redux-toolkit.js.org/rtk-query/usage/cache-behavior)
- [Optimistic Updates](https://redux-toolkit.js.org/rtk-query/usage/optimistic-updates)
