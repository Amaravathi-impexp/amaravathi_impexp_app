/**
 * Redux Store Configuration
 * Combines all slices and configures the store with RTK Query
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import shipmentsReducer from './slices/shipmentsSlice';
import partnersReducer from './slices/partnersSlice';
import usersReducer from './slices/usersSlice';
import uiReducer from './slices/uiSlice';
import dashboardReducer from './slices/dashboardSlice';
import { baseApi } from './api/baseApi';
import { tokenRefreshMiddleware } from './middleware/tokenRefreshMiddleware';
import { errorMiddleware } from './middleware/errorMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shipments: shipmentsReducer,
    partners: partnersReducer,
    users: usersReducer,
    ui: uiReducer,
    dashboard: dashboardReducer,
    // Add RTK Query reducer
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from RTK Query
        ignoredActions: ['api/executeMutation/pending', 'api/executeMutation/fulfilled', 'api/executeMutation/rejected', 'api/executeQuery/pending', 'api/executeQuery/fulfilled', 'api/executeQuery/rejected'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'meta.baseQueryMeta', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['api.queries', 'api.mutations'],
      },
    })
    // Add RTK Query middleware
    .concat(baseApi.middleware)
    // Add error handling middleware
    .concat(errorMiddleware)
    // Add token refresh middleware
    .concat(tokenRefreshMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export default for Figma preview compatibility
export default store;