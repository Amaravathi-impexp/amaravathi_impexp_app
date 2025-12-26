# ⚡ RTK Query Quick Reference

## 🎯 Common Patterns

### Query (GET)
```typescript
const { data, isLoading, error } = useGetShipmentsQuery(params);
```

### Mutation (POST/PUT/DELETE)
```typescript
const [mutate, { isLoading, error }] = useCreateShipmentMutation();
await mutate(data).unwrap();
```

### Lazy Query (Manual trigger)
```typescript
const [trigger, { data, isLoading }] = useLazyGetShipmentsQuery();
trigger(params);
```

---

## 📋 All Available Hooks

### Auth API
```typescript
import {
  useLoginMutation,
  useSignUpMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
  useRefreshTokenMutation,
} from '../store/api';
```

### Shipments API
```typescript
import {
  useGetShipmentsQuery,
  useGetShipmentByIdQuery,
  useTrackShipmentQuery,
  useCreateShipmentMutation,
  useUpdateShipmentMutation,
  useDeleteShipmentMutation,
  useBulkUpdateShipmentsMutation,
  useLazyGetShipmentsQuery,
  useLazyTrackShipmentQuery,
} from '../store/api';
```

### Partners API
```typescript
import {
  useGetPartnersQuery,
  useGetPartnerByIdQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
  useLazyGetPartnersQuery,
} from '../store/api';
```

### Users API
```typescript
import {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useBulkUpdateUsersMutation,
  useLazyGetUsersQuery,
} from '../store/api';
```

### Dashboard API
```typescript
import {
  useGetDashboardStatsQuery,
  useGetShipmentsByStatusQuery,
  useGetRevenueDataQuery,
  useGetTopPartnersQuery,
  useGetRecentActivitiesQuery,
} from '../store/api';
```

---

## 🔧 Query Options

```typescript
useGetShipmentsQuery(params, {
  pollingInterval: 30000,        // Refetch every 30s
  refetchOnMountOrArgChange: true, // Refetch on mount
  refetchOnFocus: true,          // Refetch on window focus
  refetchOnReconnect: true,      // Refetch on reconnect
  skip: !userId,                 // Skip query conditionally
});
```

---

## 📊 Response Properties

### Query Response
```typescript
{
  data,           // Response data
  error,          // Error object
  isLoading,      // Initial load (no data)
  isFetching,     // Fetching (may have cached data)
  isSuccess,      // Successful
  isError,        // Failed
  refetch,        // Manual refetch
  currentData,    // Current data (stable)
  originalArgs,   // Query arguments
}
```

### Mutation Response
```typescript
{
  data,           // Response data
  error,          // Error object
  isLoading,      // In progress
  isSuccess,      // Successful
  isError,        // Failed
  reset,          // Reset state
}
```

---

## 🎨 Code Snippets

### Fetch List with Pagination
```typescript
const [page, setPage] = useState(1);
const { data, isLoading } = useGetShipmentsQuery({ page, limit: 20 });

return (
  <>
    {data?.data.map(item => <Item key={item.id} />)}
    <Pagination page={page} onChange={setPage} />
  </>
);
```

### Create Item
```typescript
const [create, { isLoading }] = useCreateShipmentMutation();

const handleSubmit = async (formData) => {
  try {
    await create(formData).unwrap();
    toast.success('Created!');
  } catch (err) {
    toast.error('Failed!');
  }
};
```

### Update Item
```typescript
const [update] = useUpdateShipmentMutation();

const handleUpdate = async () => {
  await update({ id, data: updates }).unwrap();
};
```

### Delete Item
```typescript
const [deleteItem] = useDeleteShipmentMutation();

const handleDelete = async () => {
  if (confirm('Delete?')) {
    await deleteItem(id).unwrap();
  }
};
```

### Auto-refresh Dashboard
```typescript
const { data } = useGetDashboardStatsQuery(undefined, {
  pollingInterval: 30000, // 30 seconds
});
```

### Search with Lazy Query
```typescript
const [search, { data, isLoading }] = useLazyGetShipmentsQuery();

<input onChange={(e) => search({ search: e.target.value })} />
```

---

## 🏷️ Tag Types

```typescript
'Auth'       // Authentication
'Shipments'  // Shipments
'Partners'   // Partners
'Users'      // Users
'Documents'  // Documents
'Invoices'   // Invoices
'Dashboard'  // Dashboard stats
```

---

## 🔄 Cache Invalidation

### Automatic (via tags)
```typescript
// Create invalidates LIST
createShipment: builder.mutation({
  invalidatesTags: [{ type: 'Shipments', id: 'LIST' }],
}),

// getShipments provides LIST
getShipments: builder.query({
  providesTags: [{ type: 'Shipments', id: 'LIST' }],
}),
```

### Manual
```typescript
import { useDispatch } from 'react-redux';
import { baseApi } from '../store/api';

const dispatch = useDispatch();

// Invalidate specific tags
dispatch(baseApi.util.invalidateTags(['Shipments']));

// Reset entire cache
dispatch(baseApi.util.resetApiState());
```

---

## ⚡ Performance Tips

1. **Use `skip` for conditional queries**
   ```typescript
   useGetShipmentByIdQuery(id, { skip: !id });
   ```

2. **Lazy queries for manual control**
   ```typescript
   const [trigger] = useLazyGetShipmentsQuery();
   ```

3. **Polling for real-time data**
   ```typescript
   useGetDashboardStatsQuery(undefined, { pollingInterval: 30000 });
   ```

4. **Optimistic updates for instant UX**
   ```typescript
   onQueryStarted: async ({ id, data }, { dispatch, queryFulfilled }) => {
     const patch = dispatch(
       api.util.updateQueryData('getShipments', undefined, (draft) => {
         // Update draft
       })
     );
     try {
       await queryFulfilled;
     } catch {
       patch.undo();
     }
   }
   ```

---

## 🐛 Common Issues

### Issue: Query not refetching
**Solution:** Check tag invalidation
```typescript
invalidatesTags: [{ type: 'Shipments', id: 'LIST' }],
```

### Issue: "Cannot read property of undefined"
**Solution:** Use optional chaining
```typescript
{data?.data.map(...)}
```

### Issue: Mutation error not showing
**Solution:** Use `.unwrap()`
```typescript
await mutation(data).unwrap();
```

### Issue: Stale data
**Solution:** Add `refetchOnMountOrArgChange`
```typescript
useQuery(params, { refetchOnMountOrArgChange: true });
```

---

## 📚 Resources

- API Files: `/store/api/*.ts`
- Full Guide: `/RTK_QUERY_GUIDE.md`
- Migration: `/RTK_QUERY_MIGRATION.md`
- Redux Store: `/store/index.ts`

---

**🚀 Happy Coding!**
