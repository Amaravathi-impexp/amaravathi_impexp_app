# REST API Framework Documentation

This document explains how to use the REST API framework in the Amaravathi Imports & Exports application.

## 📁 File Structure

```
/services/
  ├── api.ts                    # Base HTTP client and configuration
  ├── auth.service.ts           # Authentication APIs
  ├── shipments.service.ts      # Shipment management APIs
  ├── partners.service.ts       # Partner directory APIs
  ├── users.service.ts          # User management APIs
  ├── invoices.service.ts       # Invoice and payment APIs
  ├── dashboard.service.ts      # Dashboard and analytics APIs
  ├── documents.service.ts      # Document upload/download APIs
  └── index.ts                  # Central export file

/types/
  └── index.ts                  # TypeScript type definitions

/hooks/
  └── useApi.ts                 # React hooks for API calls

/examples/
  └── ApiUsageExample.tsx       # Usage examples and patterns
```

## 🚀 Quick Start

### 1. Configuration

Update the API base URL in `/services/api.ts`:

```typescript
const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'https://api.amaravathi.com/v1',
  timeout: 30000,
};
```

Or set the environment variable in your `.env` file:

```
REACT_APP_API_URL=https://api.amaravathi.com/v1
```

### 2. Basic Usage

Import the service you need:

```typescript
import { shipmentsService } from '../services';
```

Make an API call:

```typescript
const shipments = await shipmentsService.getAll({ page: 1, limit: 10 });
```

## 📚 Available Services

### Authentication Service (`authService`)

```typescript
import { authService } from '../services';

// Login
const { token, user } = await authService.login({ 
  email: 'admin@gmail.com', 
  password: 'admin' 
});

// Register
const response = await authService.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
});

// Get current user
const user = await authService.getCurrentUser();

// Logout
await authService.logout();
```

### Shipments Service (`shipmentsService`)

```typescript
import { shipmentsService } from '../services';

// Get all shipments
const shipments = await shipmentsService.getAll({ 
  page: 1, 
  limit: 10,
  status: 'In Transit' 
});

// Get by ID
const shipment = await shipmentsService.getById('AMRV-2024-001');

// Create shipment
const newShipment = await shipmentsService.create({
  shipmentId: 'AMRV-2024-009',
  customerName: 'ABC Corp',
  origin: 'Mumbai',
  destination: 'New York',
  // ... other fields
});

// Update shipment
const updated = await shipmentsService.update('AMRV-2024-001', {
  status: 'Delivered',
  currentLocation: 'New York Port',
});

// Delete shipment
await shipmentsService.delete('AMRV-2024-001');

// Track shipment
const tracking = await shipmentsService.track('AMRV-2024-001');

// Search shipments
const results = await shipmentsService.search('Electronics');
```

### Partners Service (`partnersService`)

```typescript
import { partnersService } from '../services';

// Get all partners
const partners = await partnersService.getAll({ page: 1, limit: 10 });

// Create partner
const newPartner = await partnersService.create({
  companyName: 'ABC Logistics',
  contactPerson: 'John Smith',
  email: 'john@abc.com',
  phone: '+1-555-1234',
  // ... other fields
});

// Update partner
await partnersService.update('partner-id', { status: 'Active' });

// Delete partner
await partnersService.delete('partner-id');
```

### Users Service (`usersService`)

```typescript
import { usersService } from '../services';

// Get all users
const users = await usersService.getAll({ page: 1, limit: 10 });

// Create user
const newUser = await usersService.create({
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'Manager',
  phone: '+1-555-5678',
});

// Update user role
await usersService.updateRole('user-id', 'Admin');

// Update notifications
await usersService.updateNotifications('user-id', {
  email: true,
  sms: false,
  push: true,
});
```

### Invoices Service (`invoicesService`)

```typescript
import { invoicesService } from '../services';

// Get all invoices
const invoices = await invoicesService.getAll({ page: 1, limit: 10 });

// Create invoice
const newInvoice = await invoicesService.create({
  customerName: 'ABC Corp',
  items: [
    { description: 'Shipping Fee', quantity: 1, unitPrice: 500, total: 500 },
    { description: 'Handling', quantity: 1, unitPrice: 100, total: 100 },
  ],
  dueDate: '2025-01-15',
  currency: 'USD',
});

// Mark as paid
await invoicesService.markAsPaid('invoice-id');

// Download PDF
const pdfBlob = await invoicesService.downloadPDF('invoice-id');
```

## 🎣 React Hooks

### useApi Hook

For fetching data:

```typescript
import { useApi } from '../hooks/useApi';
import { shipmentsService } from '../services';

function ShipmentsList() {
  const { data, loading, error, execute } = useApi(shipmentsService.getAll);

  useEffect(() => {
    execute({ page: 1, limit: 10 });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data?.data.map(shipment => (
        <div key={shipment.id}>{shipment.cargo}</div>
      ))}
    </div>
  );
}
```

### useMutation Hook

For creating/updating/deleting data:

```typescript
import { useMutation } from '../hooks/useApi';
import { shipmentsService } from '../services';

function CreateShipment() {
  const { loading, error, mutate } = useMutation(
    shipmentsService.create,
    (newShipment) => {
      alert('Shipment created!');
      // Redirect or refresh list
    }
  );

  const handleSubmit = async (formData) => {
    await mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
```

## 🔒 Authentication

The framework automatically handles authentication tokens:

1. **Login**: Token is automatically stored in localStorage
2. **Subsequent requests**: Token is automatically included in headers
3. **Logout**: Token is automatically removed

Manual token management:

```typescript
import { setAuthToken, removeAuthToken } from '../services';

// Set token manually
setAuthToken('your-jwt-token');

// Remove token manually
removeAuthToken();
```

## ⚠️ Error Handling

All API errors are caught and wrapped in an `ApiError` class:

```typescript
try {
  const shipment = await shipmentsService.getById('invalid-id');
} catch (error) {
  if (error instanceof ApiError) {
    console.log('Status:', error.status);
    console.log('Message:', error.message);
    console.log('Data:', error.data);
  }
}
```

## 🔄 Loading States

Using hooks:

```typescript
const { data, loading, error } = useApi(shipmentsService.getAll);

if (loading) return <Spinner />;
if (error) return <ErrorMessage message={error} />;
return <ShipmentsList data={data} />;
```

Manual handling:

```typescript
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const data = await shipmentsService.getAll();
    // handle data
  } finally {
    setLoading(false);
  }
};
```

## 📖 TypeScript Support

All services have full TypeScript support with type definitions:

```typescript
import type { Shipment, CreateShipmentRequest } from '../types';

const handleCreate = async (data: CreateShipmentRequest): Promise<Shipment> => {
  return await shipmentsService.create(data);
};
```

## 🌐 Environment Variables

Create a `.env` file in your project root:

```env
REACT_APP_API_URL=https://api.amaravathi.com/v1
```

## 📝 Integration Steps

1. **Update API base URL** in `/services/api.ts` or `.env` file
2. **Import the service** you need in your component
3. **Use the hook or direct call** to fetch/mutate data
4. **Handle loading and error states** in your UI
5. **Update TypeScript types** in `/types/index.ts` as needed

## 💡 Best Practices

1. ✅ Use `useApi` hook for GET requests
2. ✅ Use `useMutation` hook for POST/PUT/DELETE requests
3. ✅ Always handle loading and error states
4. ✅ Use TypeScript types for type safety
5. ✅ Keep API logic in services, not components
6. ✅ Use parallel requests with `Promise.all()` when possible
7. ✅ Implement proper error messages for users
8. ✅ Clear auth token on logout

## 🔗 Example Integration

See `/examples/ApiUsageExample.tsx` for complete working examples of:
- Fetching data with hooks
- Creating/updating records
- Search functionality
- Pagination
- Error handling
- Multiple API calls

## 🎯 Next Steps

1. Replace placeholder API URL with your actual backend
2. Customize error handling as needed
3. Add more services for additional features
4. Implement request/response interceptors if needed
5. Add retry logic for failed requests
6. Implement caching strategy if needed
