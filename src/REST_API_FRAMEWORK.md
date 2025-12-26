# 🌐 REST API Framework

## Overview

The **Amaravathi Imports & Exports** application uses **Native Fetch API** with a custom TypeScript wrapper for REST API calls.

---

## 📦 Framework Used

### **Native Fetch API**
- ✅ **Browser Built-in** - No external library needed
- ✅ **Promise-based** - Modern async/await syntax
- ✅ **TypeScript Wrapped** - Full type safety
- ✅ **Custom Error Handling** - Centralized error management
- ✅ **Redux Integrated** - Automatic token injection from Redux store

### **NOT Using:**
- ❌ Axios
- ❌ jQuery Ajax
- ❌ Superagent
- ❌ Request
- ❌ Got

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│              Component Layer                        │
│  (SignIn, Dashboard, Shipments, etc.)               │
└────────────────────┬────────────────────────────────┘
                     │
                     │ Uses
                     ▼
┌─────────────────────────────────────────────────────┐
│           Service Layer (Optional)                  │
│  auth.service.ts, shipments.service.ts, etc.        │
└────────────────────┬────────────────────────────────┘
                     │
                     │ Calls
                     ▼
┌─────────────────────────────────────────────────────┐
│            API Client (/services/api.ts)            │
│  Custom wrapper around Fetch API                    │
│  - GET, POST, PUT, PATCH, DELETE, Upload            │
│  - Auto token injection from Redux                  │
│  - Error handling                                   │
│  - TypeScript generics                              │
└────────────────────┬────────────────────────────────┘
                     │
                     │ Uses
                     ▼
┌─────────────────────────────────────────────────────┐
│          Native Fetch API (Browser)                 │
│  Built-in browser HTTP client                       │
└─────────────────────────────────────────────────────┘
```

---

## 📝 API Client Implementation

### **Location:** `/services/api.ts`

### **Core Components:**

#### 1. **Configuration**
```typescript
const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'https://api.amaravathi.com/v1',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
};
```

#### 2. **Token Management (Redux Integration)**
```typescript
import { store } from '../store';

const getAuthToken = (): string | null => {
  const state = store.getState();
  return state.auth.token;  // Gets token from Redux
};
```

#### 3. **Error Handling**
```typescript
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
```

#### 4. **Base Fetch Wrapper**
```typescript
async function fetchWithConfig<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...API_CONFIG.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError(response.status, data.message, data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(0, error.message, null);
  }
}
```

#### 5. **HTTP Methods**
```typescript
export const api = {
  // GET request
  get: async <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
    const queryString = params
      ? '?' + new URLSearchParams(params).toString()
      : '';
    return fetchWithConfig<T>(`${endpoint}${queryString}`, {
      method: 'GET',
    });
  },

  // POST request
  post: async <T>(endpoint: string, data?: any): Promise<T> => {
    return fetchWithConfig<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // PUT request
  put: async <T>(endpoint: string, data?: any): Promise<T> => {
    return fetchWithConfig<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // PATCH request
  patch: async <T>(endpoint: string, data?: any): Promise<T> => {
    return fetchWithConfig<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // DELETE request
  delete: async <T>(endpoint: string): Promise<T> => {
    return fetchWithConfig<T>(endpoint, {
      method: 'DELETE',
    });
  },

  // File Upload
  upload: async <T>(endpoint: string, formData: FormData): Promise<T> => {
    const token = getAuthToken();
    
    const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new ApiError(response.status, data.message, data);
    }
    return data;
  },
};
```

---

## 🎣 Custom React Hooks

### **Location:** `/hooks/useApi.ts`

### **1. useApi Hook**
For GET requests and data fetching:

```typescript
const { data, loading, error, execute } = useApi(shipmentsService.getAll);

useEffect(() => {
  execute({ page: 1, limit: 10 });
}, []);
```

**Features:**
- ✅ Automatic loading state
- ✅ Automatic error handling
- ✅ Type-safe data
- ✅ Reset function

### **2. useMutation Hook**
For POST, PUT, DELETE operations:

```typescript
const { loading, error, mutate } = useMutation(
  shipmentsService.create,
  (data) => {
    toast.success('Shipment created!');
    navigate('/shipments');
  }
);

const handleCreate = async () => {
  await mutate(formData);
};
```

**Features:**
- ✅ Optimistic updates support
- ✅ Success callbacks
- ✅ Automatic loading states
- ✅ Error handling

---

## 📋 Usage Examples

### **Direct API Calls**

#### GET Request
```typescript
import api from '../services/api';

const fetchShipments = async () => {
  try {
    const shipments = await api.get<Shipment[]>('/shipments', {
      page: 1,
      limit: 10
    });
    console.log(shipments);
  } catch (error) {
    console.error(error.message);
  }
};
```

#### POST Request
```typescript
import api from '../services/api';

const createShipment = async (data: CreateShipmentRequest) => {
  try {
    const newShipment = await api.post<Shipment>('/shipments', data);
    console.log('Created:', newShipment);
  } catch (error) {
    console.error(error.message);
  }
};
```

#### PUT Request
```typescript
const updateShipment = async (id: string, updates: Partial<Shipment>) => {
  try {
    const updated = await api.put<Shipment>(`/shipments/${id}`, updates);
    console.log('Updated:', updated);
  } catch (error) {
    console.error(error.message);
  }
};
```

#### DELETE Request
```typescript
const deleteShipment = async (id: string) => {
  try {
    await api.delete(`/shipments/${id}`);
    console.log('Deleted successfully');
  } catch (error) {
    console.error(error.message);
  }
};
```

#### File Upload
```typescript
const uploadDocument = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'invoice');

  try {
    const response = await api.upload<UploadResponse>('/documents/upload', formData);
    console.log('Uploaded:', response);
  } catch (error) {
    console.error(error.message);
  }
};
```

---

### **Using Service Layer**

#### Auth Service
```typescript
import { authService } from '../services/auth.service';

const handleLogin = async () => {
  try {
    const response = await authService.login({
      email: 'user@example.com',
      password: 'password123'
    });
    
    dispatch(setCredentials({
      user: response.user,
      token: response.token
    }));
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};
```

#### Shipments Service
```typescript
import { shipmentsService } from '../services/shipments.service';

const loadShipments = async () => {
  try {
    const response = await shipmentsService.getAll({ page: 1, limit: 20 });
    dispatch(setShipments(response.data));
  } catch (error) {
    console.error('Failed to load shipments:', error.message);
  }
};
```

---

### **Using Custom Hooks**

#### With useApi
```typescript
import { useApi } from '../hooks/useApi';
import { shipmentsService } from '../services/shipments.service';

function ShipmentsList() {
  const { data, loading, error, execute } = useApi(shipmentsService.getAll);
  
  useEffect(() => {
    execute({ page: 1, limit: 10 });
  }, []);
  
  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  
  return (
    <div>
      {data?.data.map(shipment => (
        <ShipmentCard key={shipment.id} shipment={shipment} />
      ))}
    </div>
  );
}
```

#### With useMutation
```typescript
import { useMutation } from '../hooks/useApi';
import { shipmentsService } from '../services/shipments.service';

function CreateShipment() {
  const { loading, error, mutate } = useMutation(
    shipmentsService.create,
    (data) => {
      toast.success('Shipment created successfully!');
      navigate('/shipments');
    }
  );
  
  const handleSubmit = async (formData) => {
    await mutate(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={loading}>
        {loading ? 'Creating...' : 'Create Shipment'}
      </button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </form>
  );
}
```

---

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────┐
│         Component makes API call                    │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│    api.get('/protected-route')                      │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│    getAuthToken() → Redux Store                     │
│    token = store.getState().auth.token              │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│    Add to headers:                                  │
│    Authorization: `Bearer ${token}`                 │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│    fetch(url, { headers: { ... } })                 │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 Key Features

### **1. Type Safety**
```typescript
// Fully typed requests and responses
interface Shipment { /* ... */ }
interface CreateShipmentRequest { /* ... */ }

const shipment = await api.get<Shipment>('/shipments/123');
// shipment is typed as Shipment

const newShipment = await api.post<Shipment, CreateShipmentRequest>(
  '/shipments',
  createData
);
```

### **2. Automatic Token Injection**
```typescript
// Token automatically added from Redux
const data = await api.get('/protected-route');
// Headers: { Authorization: 'Bearer eyJhbGc...' }
```

### **3. Error Handling**
```typescript
try {
  const data = await api.get('/shipments');
} catch (error) {
  if (error instanceof ApiError) {
    console.log('Status:', error.status);    // 404, 500, etc.
    console.log('Message:', error.message);  // Error message
    console.log('Data:', error.data);        // Server response
  }
}
```

### **4. Query Parameters**
```typescript
// Automatic query string generation
const shipments = await api.get('/shipments', {
  page: 1,
  limit: 10,
  status: 'In Transit',
  sortBy: 'createdAt'
});
// URL: /shipments?page=1&limit=10&status=In%20Transit&sortBy=createdAt
```

### **5. File Uploads**
```typescript
const formData = new FormData();
formData.append('file', file);
formData.append('metadata', JSON.stringify({ type: 'invoice' }));

const result = await api.upload('/documents/upload', formData);
```

---

## 📊 Comparison: Fetch vs Axios

| Feature | Native Fetch (Our App) | Axios |
|---------|------------------------|-------|
| **Bundle Size** | 0 KB (built-in) | ~13 KB |
| **Automatic JSON** | Manual (.json()) | ✅ Automatic |
| **Error Handling** | Manual (we handle it) | ✅ Automatic |
| **Request/Response Interceptors** | Manual | ✅ Built-in |
| **TypeScript** | ✅ Full support | ✅ Full support |
| **Browser Support** | Modern browsers | All browsers |
| **Progress Tracking** | ❌ | ✅ |
| **Cancel Requests** | AbortController | CancelToken |

### **Why We Use Fetch:**
- ✅ No extra dependencies
- ✅ Modern, promise-based API
- ✅ Sufficient for our needs
- ✅ Custom wrapper provides Axios-like features
- ✅ Smaller bundle size

---

## 🛠️ Service Layer Pattern

### **Structure:**
```
/services
├── api.ts                  # Core API client (Fetch wrapper)
├── mock-api.ts             # Mock implementation
├── auth.service.ts         # Authentication endpoints
├── shipments.service.ts    # Shipments CRUD
├── partners.service.ts     # Partners CRUD
├── users.service.ts        # User management
├── documents.service.ts    # Document management
├── invoices.service.ts     # Invoices & payments
├── dashboard.service.ts    # Dashboard stats
└── index.ts                # Export all services
```

### **Example Service:**
```typescript
// /services/shipments.service.ts
import api from './api';
import type { Shipment, CreateShipmentRequest, PaginatedResponse } from '../types';

export const shipmentsService = {
  // Get all shipments
  getAll: (params?: PaginationParams) => 
    api.get<PaginatedResponse<Shipment>>('/shipments', params),
  
  // Get single shipment
  getById: (id: string) => 
    api.get<Shipment>(`/shipments/${id}`),
  
  // Create shipment
  create: (data: CreateShipmentRequest) => 
    api.post<Shipment>('/shipments', data),
  
  // Update shipment
  update: (id: string, data: Partial<Shipment>) => 
    api.put<Shipment>(`/shipments/${id}`, data),
  
  // Delete shipment
  delete: (id: string) => 
    api.delete(`/shipments/${id}`),
  
  // Track shipment
  track: (trackingNumber: string) => 
    api.get<TrackingInfo>(`/shipments/track/${trackingNumber}`),
};
```

---

## 🧪 Mock API

For development without a backend:

```typescript
// /services/mock-api.ts
export const mockApi = {
  auth: {
    login: async (credentials) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (credentials.email === 'admin@gmail.com' && 
          credentials.password === 'admin') {
        return {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: '1',
            name: 'Admin User',
            email: 'admin@gmail.com',
            role: 'Admin'
          }
        };
      }
      
      throw new Error('Invalid credentials');
    }
  },
  
  shipments: {
    list: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockShipments;
    },
    
    create: async (data) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const newShipment = { id: Date.now().toString(), ...data };
      mockShipments.push(newShipment);
      return newShipment;
    }
  }
};
```

---

## ✅ Best Practices

### **1. Always Use TypeScript Generics**
```typescript
// ✅ Good - Type-safe
const shipments = await api.get<Shipment[]>('/shipments');

// ❌ Bad - No type safety
const shipments = await api.get('/shipments');
```

### **2. Handle Errors Properly**
```typescript
// ✅ Good
try {
  const data = await api.get('/shipments');
  dispatch(setShipments(data));
} catch (error) {
  dispatch(setError(error.message));
  toast.error('Failed to load shipments');
}

// ❌ Bad - Silent failure
const data = await api.get('/shipments').catch(() => null);
```

### **3. Use Service Layer**
```typescript
// ✅ Good - Centralized
import { shipmentsService } from '../services';
const data = await shipmentsService.getAll();

// ❌ Bad - Direct API calls scattered
const data = await api.get('/shipments');
```

### **4. Leverage Custom Hooks**
```typescript
// ✅ Good - Automatic state management
const { data, loading, error } = useApi(shipmentsService.getAll);

// ❌ Bad - Manual state management
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
// ... lots of boilerplate
```

---

## 🎉 Summary

The app uses a **custom Fetch wrapper** that provides:
- ✅ **Zero dependencies** - Built-in browser API
- ✅ **Type safety** - Full TypeScript support
- ✅ **Redux integration** - Automatic token injection
- ✅ **Error handling** - Centralized ApiError class
- ✅ **Service layer** - Organized API endpoints
- ✅ **Custom hooks** - useApi and useMutation
- ✅ **Mock API** - Development without backend

**Result:** A lightweight, type-safe, production-ready REST API framework! 🚀
