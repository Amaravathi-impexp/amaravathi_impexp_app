/**
 * Dashboard Slice
 * Manages dashboard alerts and activity data
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AlertType = 'error' | 'warning' | 'info';
export type AlertSeverity = 'high' | 'medium' | 'low';

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  description: string;
  shipmentInfo?: string;
  timestamp: string;
  timeAgo: string;
}

export type ActivityType = 'shipment' | 'payment' | 'message' | 'document' | 'delivery';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  timeAgo: string;
}

interface DashboardState {
  alerts: Alert[];
  activities: Activity[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  alerts: [
    {
      id: 'alert-1',
      type: 'error',
      severity: 'high',
      title: 'Customs Issue',
      description: 'AMRV-2024-004 requires additional documentation',
      shipmentInfo: 'Shanghai → Los Angeles',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      timeAgo: '2h ago',
    },
    {
      id: 'alert-2',
      type: 'warning',
      severity: 'medium',
      title: 'Shipment Delay',
      description: 'AMRV-2024-001 delayed due to weather conditions',
      shipmentInfo: 'New ETA: Dec 30, 2024',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      timeAgo: '5h ago',
    },
    {
      id: 'alert-3',
      type: 'warning',
      severity: 'medium',
      title: 'Compliance Warning',
      description: 'Certificate of Origin expires in 3 days',
      shipmentInfo: 'Action required before Dec 24',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      timeAgo: '1d ago',
    },
  ],
  activities: [
    {
      id: 'activity-1',
      type: 'delivery',
      title: 'Shipment AMRV-2024-002 delivered successfully',
      description: 'Dubai → London',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      timeAgo: '3 hours ago',
    },
    {
      id: 'activity-2',
      type: 'payment',
      title: 'Payment received for INV-2024-156',
      description: 'Amount: $12,450.00',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      timeAgo: '5 hours ago',
    },
    {
      id: 'activity-3',
      type: 'message',
      title: 'New message from Port Authority',
      description: 'Regarding AMRV-2024-003',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      timeAgo: '6 hours ago',
    },
    {
      id: 'activity-4',
      type: 'document',
      title: 'Invoice uploaded for AMRV-2024-005',
      description: 'Invoice #INV-2024-157',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      timeAgo: '8 hours ago',
    },
    {
      id: 'activity-5',
      type: 'shipment',
      title: 'Shipment AMRV-2024-001 departed from port',
      description: 'Mumbai, India',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      timeAgo: '12 hours ago',
    },
  ],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setAlerts: (state, action: PayloadAction<Alert[]>) => {
      state.alerts = action.payload;
      state.loading = false;
      state.error = null;
    },
    addAlert: (state, action: PayloadAction<Alert>) => {
      state.alerts.unshift(action.payload);
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
    setActivities: (state, action: PayloadAction<Activity[]>) => {
      state.activities = action.payload;
      state.loading = false;
      state.error = null;
    },
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.activities.unshift(action.payload);
    },
    clearActivities: (state) => {
      state.activities = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setAlerts,
  addAlert,
  removeAlert,
  setActivities,
  addActivity,
  clearActivities,
  setLoading,
  setError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
