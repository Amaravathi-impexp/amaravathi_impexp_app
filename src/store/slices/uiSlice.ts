/**
 * UI Slice
 * Manages UI state (current view, modals, notifications, etc.)
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ViewType = 'home' | 'signin' | 'signup' | 'verification' | 'dashboard' | 'about' | 'careers' | 'contact';

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

const initialState: UIState = {
  currentView: 'home',
  notifications: [],
  sidebarCollapsed: false,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentView: (state, action: PayloadAction<ViewType>) => {
      state.currentView = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => {
      const notification: Notification = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      };
      state.notifications.unshift(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const {
  setCurrentView,
  addNotification,
  removeNotification,
  clearNotifications,
  toggleSidebar,
  setSidebarCollapsed,
  setTheme,
} = uiSlice.actions;

export default uiSlice.reducer;