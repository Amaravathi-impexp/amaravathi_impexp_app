/**
 * Partners Service
 * Handles all partner-related API calls
 */

import api from './api';
import type {
  Partner,
  CreatePartnerRequest,
  PaginationParams,
  PaginatedResponse,
} from '../types';

export const partnersService = {
  /**
   * Get all partners with pagination and filters
   * @param params - Pagination and filter parameters
   * @returns Paginated list of partners
   */
  getAll: async (params?: PaginationParams & { status?: string; partnerType?: string; search?: string }): Promise<PaginatedResponse<Partner>> => {
    try {
      return await api.get<PaginatedResponse<Partner>>('/partners', params);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get partner by ID
   * @param id - Partner ID
   * @returns Partner details
   */
  getById: async (id: string): Promise<Partner> => {
    try {
      return await api.get<Partner>(`/partners/${id}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new partner
   * @param partnerData - Partner creation data
   * @returns Created partner
   */
  create: async (partnerData: CreatePartnerRequest): Promise<Partner> => {
    try {
      return await api.post<Partner>('/partners', partnerData);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update existing partner
   * @param id - Partner ID
   * @param updates - Fields to update
   * @returns Updated partner
   */
  update: async (id: string, updates: Partial<CreatePartnerRequest>): Promise<Partner> => {
    try {
      return await api.patch<Partner>(`/partners/${id}`, updates);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete partner
   * @param id - Partner ID
   */
  delete: async (id: string): Promise<{ message: string }> => {
    try {
      return await api.delete<{ message: string }>(`/partners/${id}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Search partners
   * @param query - Search query
   * @returns Matching partners
   */
  search: async (query: string): Promise<Partner[]> => {
    try {
      return await api.get<Partner[]>('/partners/search', { q: query });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get partners by type
   * @param partnerType - Partner type (e.g., 'Carrier', 'Customs Broker')
   * @returns Partners of specified type
   */
  getByType: async (partnerType: string): Promise<Partner[]> => {
    try {
      return await api.get<Partner[]>('/partners', { partnerType });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get partners by country
   * @param country - Country name
   * @returns Partners in specified country
   */
  getByCountry: async (country: string): Promise<Partner[]> => {
    try {
      return await api.get<Partner[]>('/partners', { country });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update partner status
   * @param id - Partner ID
   * @param status - New status
   * @returns Updated partner
   */
  updateStatus: async (id: string, status: 'Active' | 'Inactive' | 'Pending'): Promise<Partner> => {
    try {
      return await api.patch<Partner>(`/partners/${id}/status`, { status });
    } catch (error) {
      throw error;
    }
  },
};

export default partnersService;
