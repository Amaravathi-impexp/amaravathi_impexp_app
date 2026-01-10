/**
 * RTK Query - Dashboard API
 * Handles dashboard statistics and analytics
 */

import { baseApi } from './baseApi';

export interface DashboardStats {
  totalShipments: number;
  activeShipments: number;
  completedShipments: number;
  delayedShipments: number;
  totalPartners: number;
  totalUsers: number;
  totalRevenue: number;
  revenueGrowth: number;
}

export interface ShipmentsByStatus {
  pending: number;
  inTransit: number;
  delivered: number;
  delayed: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  shipments: number;
}

export interface TopPartner {
  id: string;
  name: string;
  type: string;
  shipmentsCount: number;
  rating: number;
}

export interface RecentActivity {
  id: string;
  type: 'shipment' | 'partner' | 'user' | 'document';
  action: 'created' | 'updated' | 'deleted';
  description: string;
  timestamp: string;
  user: string;
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get dashboard statistics
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => '/dashboard/stats',
      providesTags: ['Dashboard'],
    }),
    
    // Get shipments by status
    getShipmentsByStatus: builder.query<ShipmentsByStatus, void>({
      query: () => '/dashboard/shipments-by-status',
      providesTags: ['Dashboard'],
    }),
    
    // Get revenue data
    getRevenueData: builder.query<RevenueData[], { period?: 'week' | 'month' | 'year' }>({
      query: (params = {}) => ({
        url: '/dashboard/revenue',
        params,
      }),
      providesTags: ['Dashboard'],
    }),
    
    // Get top partners
    getTopPartners: builder.query<TopPartner[], { limit?: number }>({
      query: (params = {}) => ({
        url: '/dashboard/top-partners',
        params,
      }),
      providesTags: ['Dashboard', 'Partners'],
    }),
    
    // Get recent activities
    getRecentActivities: builder.query<RecentActivity[], { limit?: number }>({
      query: (params = {}) => ({
        url: '/dashboard/recent-activities',
        params,
      }),
      providesTags: ['Dashboard'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetDashboardStatsQuery,
  useGetShipmentsByStatusQuery,
  useGetRevenueDataQuery,
  useGetTopPartnersQuery,
  useGetRecentActivitiesQuery,
} = dashboardApi;