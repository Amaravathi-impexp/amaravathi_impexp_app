/**
 * Users Service
 * Handles all user management API calls
 */

import api from './api';
import type {
  User,
  CreateUserRequest,
  PaginationParams,
  PaginatedResponse,
} from '../types';

export const usersService = {
  /**
   * Get all users with pagination and filters
   * @param params - Pagination and filter parameters
   * @returns Paginated list of users
   */
  getAll: async (params?: PaginationParams & { role?: string; search?: string }): Promise<PaginatedResponse<User>> => {
    try {
      return await api.get<PaginatedResponse<User>>('/users', params);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user by ID
   * @param id - User ID
   * @returns User details
   */
  getById: async (id: string): Promise<User> => {
    try {
      return await api.get<User>(`/users/${id}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new user
   * @param userData - User creation data
   * @returns Created user
   */
  create: async (userData: CreateUserRequest): Promise<User> => {
    try {
      return await api.post<User>('/users', userData);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update existing user
   * @param id - User ID
   * @param updates - Fields to update
   * @returns Updated user
   */
  update: async (id: string, updates: Partial<CreateUserRequest>): Promise<User> => {
    try {
      return await api.patch<User>(`/users/${id}`, updates);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete user
   * @param id - User ID
   */
  delete: async (id: string): Promise<{ message: string }> => {
    try {
      return await api.delete<{ message: string }>(`/users/${id}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update user role
   * @param id - User ID
   * @param role - New role
   * @returns Updated user
   */
  updateRole: async (id: string, role: string): Promise<User> => {
    try {
      return await api.patch<User>(`/users/${id}/role`, { role });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update user notification preferences
   * @param id - User ID
   * @param notifications - Notification settings
   * @returns Updated user
   */
  updateNotifications: async (
    id: string,
    notifications: { email: boolean; sms: boolean; push: boolean }
  ): Promise<User> => {
    try {
      return await api.patch<User>(`/users/${id}/notifications`, { notifications });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Search users
   * @param query - Search query
   * @returns Matching users
   */
  search: async (query: string): Promise<User[]> => {
    try {
      return await api.get<User[]>('/users/search', { q: query });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get users by role
   * @param role - User role
   * @returns Users with specified role
   */
  getByRole: async (role: string): Promise<User[]> => {
    try {
      return await api.get<User[]>('/users', { role });
    } catch (error) {
      throw error;
    }
  },
};

export default usersService;
