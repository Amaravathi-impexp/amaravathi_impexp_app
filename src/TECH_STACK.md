# 🚀 Technology Stack - Amaravathi Imports & Exports

## Frontend Framework
- **React 18+** - Component-based UI library with hooks
- **TypeScript** - Type-safe JavaScript superset for better code quality and developer experience

## State Management
- **Redux Toolkit** - Modern Redux with simplified API
  - Centralized state management
  - TypeScript support out of the box
  - Redux DevTools integration
  - Slices for modular state organization
- **RTK Query** - Data fetching and caching (NEW ⭐)
  - Built into Redux Toolkit
  - Automatic caching with tag-based invalidation
  - Auto-generated hooks for queries and mutations
  - Optimistic updates support
  - Request deduplication
  - Polling and refetching
  - TypeScript-first design
- **React-Redux** - Official React bindings for Redux
  - Typed hooks (`useAppDispatch`, `useAppSelector`)
  - Provider component for store injection

## Styling & UI
- **Tailwind CSS v4.0** - Utility-first CSS framework
  - Custom design tokens in `globals.css`
  - Responsive design system
  - Custom color palette and spacing
- **shadcn/ui Components** - Pre-built, accessible React components
  - 40+ production-ready components
  - Fully customizable with Tailwind
  - Accessible by default (ARIA compliant)
- **Lucide React** - Modern icon library with 1000+ icons

## API Layer
- **REST API Architecture** - Complete REST client implementation
  - **Native Fetch API** - Browser built-in HTTP client (no external dependencies)
  - Custom TypeScript wrapper for type safety
  - Centralized error handling with ApiError class
  - Request/response interceptors
  - Authentication token management via Redux
  - Support for GET, POST, PUT, PATCH, DELETE, and file uploads
- **Mock API** - In-memory mock implementations for development
  - Simulates real API responses
  - Supports all CRUD operations
  - No backend required for testing
- **Custom React Hooks**
  - `useApi` - For GET requests with automatic loading/error states
  - `useMutation` - For POST/PUT/DELETE with success callbacks

## Service Layer
Organized service modules for different domains:
- `auth.service.ts` - Authentication & authorization
- `shipments.service.ts` - Shipment management
- `partners.service.ts` - Partner directory
- `users.service.ts` - User management
- `documents.service.ts` - Document handling
- `invoices.service.ts` - Payments & invoicing
- `dashboard.service.ts` - Dashboard analytics

## Type System
- **TypeScript Interfaces** - Comprehensive type definitions
  - User, Shipment, Partner, Document, Invoice, Role types
  - API Request & Response types
  - Pagination & Filtering types
  - Redux state types (RootState, AppDispatch)

## Custom Hooks
- `useApi.ts` - Reusable hook for API calls with loading/error states
- `hooks.ts` (Redux) - Typed Redux hooks for TypeScript safety

## Authentication & Authorization
- **Role-based Access Control (RBAC)** - Admin, Importer, Exporter roles
- **JWT Token-based Authentication** - Stored in Redux state
- **Protected Routes** - Dashboard access requires authentication
- **Token Management** - Automatic injection in API requests

## Form Handling
- **Controlled Components** - React state for form management
- **Multi-step Forms** - Wizard-style forms for shipments (5 steps) and partners (3 steps)
- **Client-side Validation** - Real-time validation with error messages
- **TypeScript Form Types** - Type-safe form data structures

## State Management Architecture

### Redux Store Slices
1. **Auth Slice** (`authSlice.ts`)
   - User authentication state
   - JWT token storage
   - Login/logout actions

2. **Shipments Slice** (`shipmentsSlice.ts`)
   - Shipment data management
   - CRUD operations
   - Loading and error states

3. **Partners Slice** (`partnersSlice.ts`)
   - Partner directory management
   - Partner CRUD operations
   - Selection state

4. **Users Slice** (`usersSlice.ts`)
   - User management
   - Admin user operations
   - User selection state

5. **UI Slice** (`uiSlice.ts`)
   - Current view state
   - Notifications management
   - Sidebar collapse state
   - Theme preferences

## Data Management
- **Redux Store** - Centralized in-memory state
- **No localStorage** - Pure Redux state management
- **Mock Database** - Simulated backend with CRUD operations
- **Optimistic Updates** - Immediate UI updates with Redux

## UI/UX Features
- **Responsive Design** - Mobile-first approach with Tailwind breakpoints
- **Loading States** - Custom animated loaders with circular progress
- **Success/Error Overlays** - Modal notifications for user actions
- **Breadcrumb Navigation** - Clear navigation hierarchy
- **Search & Filter** - Real-time search in dropdowns and tables
- **Animations** - CSS animations for progress, icons, and transitions
- **Tooltips & Popovers** - Contextual help and information
- **Dark Mode Ready** - Theme state in Redux (light/dark)

## Design System
- **Custom CSS Variables** - Consistent color palette and spacing
- **Design Tokens** - Typography, colors, borders, shadows
- **Component Library** - Reusable UI components in `/components/ui`
- **Figma Integration** - ImageWithFallback component for assets

## Project Structure
```
/
├── App.tsx                          # Main app with Redux Provider
├── store/                           # Redux store
│   ├── index.ts                    # Store configuration + RTK Query
│   ├── hooks.ts                    # Typed Redux hooks
│   ├── slices/                     # Redux slices (UI state)
│   │   ├── authSlice.ts
│   │   ├── shipmentsSlice.ts
│   │   ├── partnersSlice.ts
│   │   ├── usersSlice.ts
│   │   └── uiSlice.ts
│   └── api/                        # RTK Query API slices (NEW ⭐)
│       ├── baseApi.ts              # Base API configuration
│       ├── authApi.ts              # Auth endpoints
│       ├── shipmentsApi.ts         # Shipments endpoints
│       ├── partnersApi.ts          # Partners endpoints
│       ├── usersApi.ts             # Users endpoints
│       ├── dashboardApi.ts         # Dashboard endpoints
│       └── index.ts                # API exports
├── components/                      # Feature components
│   ├── ui/                         # Reusable UI components (shadcn)
│   ├── figma/                      # Figma integration components
│   ├── Navigation.tsx
│   ├── Dashboard.tsx
│   ├── Shipments.tsx
│   ├── PartnerDirectory.tsx
│   └── ...
├── services/                        # API services layer (Legacy)
│   ├── api.ts                      # HTTP client with Redux integration
│   ├── mock-api.ts                 # Mock API implementation
│   ├── auth.service.ts
│   └── ...
├── types/                           # TypeScript definitions
│   └── index.ts
├── hooks/                           # Custom React hooks
│   └── useApi.ts
├── styles/                          # Global styles
│   └── globals.css
├── examples/                        # API usage examples
└── docs/                            # Documentation
    ├── DOCUMENTATION_INDEX.md      # Documentation hub
    ├── RTK_QUERY_GUIDE.md          # RTK Query complete guide
    ├── RTK_QUERY_MIGRATION.md      # Migration guide
    └── RTK_QUERY_QUICK_REFERENCE.md # Quick reference
```

## NPM Packages
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-redux": "^9.x",
    "@reduxjs/toolkit": "^2.x",
    "typescript": "^5.x",
    "tailwindcss": "^4.0",
    "lucide-react": "latest"
  }
}
```

## Key Features Implemented
✅ Multi-role authentication (Admin, Importer, Exporter)  
✅ Dashboard with analytics & statistics  
✅ Shipment tracking & management (5-step creation wizard)  
✅ Partner directory (3-step creation wizard)  
✅ User management with RBAC  
✅ Document upload & management  
✅ Payments & invoicing  
✅ Responsive navigation with mobile support  
✅ About, Careers, Contact pages  
✅ Real-time search & filtering  
✅ Professional loading states & animations  
✅ Redux state management (no localStorage)  
✅ RTK Query data fetching with automatic caching ⭐  
✅ Type-safe API layer  
✅ Mock backend for development  

## Development Tools
- **Redux DevTools** - State inspection and time travel debugging
- **TypeScript Compiler** - Type checking and IntelliSense
- **ESLint** - Code linting (if configured)
- **Prettier** - Code formatting (if configured)

## Performance Optimizations
- **Memoized Selectors** - Redux selectors prevent unnecessary re-renders
- **Code Splitting** - Lazy loading of components (potential)
- **Optimistic Updates** - Immediate UI feedback with Redux
- **Efficient Re-renders** - React.memo and useMemo where needed

## Security Features
- **JWT Token Management** - Secure token storage in Redux
- **Role-based Access** - Admin-only routes and features
- **API Error Handling** - Centralized error management
- **Input Validation** - Client-side validation for all forms

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Architecture Patterns
- **Component-based Architecture** - Reusable React components
- **Service Layer Pattern** - Separated API logic
- **Redux Toolkit Slices** - Modular state management
- **TypeScript Generics** - Reusable type-safe utilities
- **Custom Hooks** - Shared logic extraction

## Future Enhancements (Potential)
- Redux Persist - Persist state across page refreshes
- Redux Thunk/Saga - Advanced async operations
- React Query - Server state management
- WebSocket Integration - Real-time updates
- Internationalization (i18n) - Multi-language support
- Progressive Web App (PWA) - Offline support

---

## 🎯 Summary

**Amaravathi Imports & Exports** is a modern, production-ready web application built with:
- **React 18** + **TypeScript** for type-safe component development
- **Redux Toolkit** for centralized state management (no localStorage)
- **Tailwind CSS v4** + **shadcn/ui** for beautiful, responsive design
- **Mock API** for development without backend dependencies
- **Complete RBAC** with admin, importer, and exporter roles
- **Professional UX** with loading states, animations, and notifications

This is a **pure frontend application** with a complete mock backend, perfect for prototyping, demonstrations, and learning modern React development patterns! 🚀