/**
 * Shipments Service
 * Handles all shipment-related API calls
 */

import api from './api';
import type {
  Shipment,
  CreateShipmentRequest,
  UpdateShipmentRequest,
  TrackingInfo,
  PaginationParams,
  PaginatedResponse,
} from '../types';

export const shipmentsService = {
  /**
   * Get all shipments with pagination and filters
   * @param params - Pagination and filter parameters
   * @returns Paginated list of shipments
   */
  getAll: async (params?: PaginationParams & { status?: string; search?: string }): Promise<PaginatedResponse<Shipment>> => {
    try {
      return await api.get<PaginatedResponse<Shipment>>('/shipments', params);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get shipment by ID
   * @param id - Shipment ID
   * @returns Shipment details
   */
  getById: async (id: string): Promise<Shipment> => {
    try {
      return await api.get<Shipment>(`/shipments/${id}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new shipment
   * @param shipmentData - Shipment creation data
   * @returns Created shipment
   */
  create: async (shipmentData: CreateShipmentRequest): Promise<Shipment> => {
    try {
      return await api.post<Shipment>('/shipments', shipmentData);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update existing shipment
   * @param id - Shipment ID
   * @param updates - Fields to update
   * @returns Updated shipment
   */
  update: async (id: string, updates: UpdateShipmentRequest): Promise<Shipment> => {
    try {
      return await api.patch<Shipment>(`/shipments/${id}`, updates);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete shipment
   * @param id - Shipment ID
   */
  delete: async (id: string): Promise<{ message: string }> => {
    try {
      return await api.delete<{ message: string }>(`/shipments/${id}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Track shipment
   * @param shipmentId - Shipment ID or tracking number
   * @returns Tracking information with timeline
   */
  track: async (shipmentId: string): Promise<TrackingInfo> => {
    try {
      return await api.get<TrackingInfo>(`/shipments/${shipmentId}/track`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get recent shipments
   * @param limit - Number of shipments to return
   * @returns List of recent shipments
   */
  getRecent: async (limit: number = 10): Promise<Shipment[]> => {
    try {
      return await api.get<Shipment[]>('/shipments/recent', { limit });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Search shipments
   * @param query - Search query
   * @returns Matching shipments
   */
  search: async (query: string): Promise<Shipment[]> => {
    try {
      return await api.get<Shipment[]>('/shipments/search', { q: query });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get shipments by status
   * @param status - Shipment status
   * @returns Shipments with specified status
   */
  getByStatus: async (status: string): Promise<Shipment[]> => {
    try {
      return await api.get<Shipment[]>('/shipments', { status });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Export shipments to CSV/Excel
   * @param params - Filter parameters
   * @returns Download URL or blob
   */
  export: async (params?: { status?: string; dateFrom?: string; dateTo?: string }): Promise<Blob> => {
    try {
      // This would need special handling for file downloads
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://api.amaravathi.com/v1'}/shipments/export?${new URLSearchParams(params as any).toString()}`);
      return await response.blob();
    } catch (error) {
      throw error;
    }
  },
};

export default shipmentsService;
