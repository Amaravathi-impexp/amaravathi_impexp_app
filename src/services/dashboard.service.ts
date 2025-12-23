/**
 * Dashboard Service
 * Handles dashboard statistics and analytics API calls
 */

import api from './api';
import type { DashboardStats, AnalyticsData } from '../types';

export const dashboardService = {
  /**
   * Get dashboard statistics
   * @returns Dashboard stats including shipment counts, revenue, etc.
   */
  getStats: async (): Promise<DashboardStats> => {
    try {
      return await api.get<DashboardStats>('/dashboard/stats');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get analytics data
   * @param dateFrom - Start date for analytics
   * @param dateTo - End date for analytics
   * @returns Analytics data with charts information
   */
  getAnalytics: async (dateFrom?: string, dateTo?: string): Promise<AnalyticsData> => {
    try {
      return await api.get<AnalyticsData>('/dashboard/analytics', {
        dateFrom,
        dateTo,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get recent activity
   * @param limit - Number of activities to return
   * @returns Recent activities
   */
  getRecentActivity: async (limit: number = 10): Promise<Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    user: string;
  }>> => {
    try {
      return await api.get('/dashboard/activity', { limit });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get alerts and notifications
   * @returns List of active alerts
   */
  getAlerts: async (): Promise<Array<{
    id: string;
    type: 'info' | 'warning' | 'error' | 'success';
    message: string;
    timestamp: string;
    read: boolean;
  }>> => {
    try {
      return await api.get('/dashboard/alerts');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Mark alert as read
   * @param alertId - Alert ID
   */
  markAlertAsRead: async (alertId: string): Promise<{ message: string }> => {
    try {
      return await api.patch(`/dashboard/alerts/${alertId}/read`, {});
    } catch (error) {
      throw error;
    }
  },
};

export default dashboardService;
