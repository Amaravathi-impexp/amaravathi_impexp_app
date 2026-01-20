/**
 * RTK Query - Users API
 * Handles user management operations (Admin only)
 */

import { baseApi } from './baseApi';
import type { Role, Country, ProductType } from './types';

export interface User {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  status: 'ENROLLED' | 'ACTIVE' | 'CREATED' | 'PENDING_VERIFICATION' | 'INACTIVE';
  emailVerified: boolean;
  phoneVerified: boolean;
  originCountry: Country | null;
  destinationCountry: Country | null;
  productType: ProductType | null;
  roles: Role[] | null;
  residenceCountry: string | null;
  city: string | null;
  preferredLanguage: string | null;
  occupation: string | null;
  interest: string | null;
  previousTradingExposure: string | null;
  appNotificationEnabled?: boolean;
  emailNotificationEnabled?: boolean;
  phoneNotificationEnabled?: boolean;
}

export interface CreateUserRequest {
  email: string;
  phone: string;
  fullName: string;
  password: string;
  originCountryId: number;
  destinationCountryId: number;
  productTypeId: number;
  roles: Role[];
  emailNotificationEnabled?: boolean;
  phoneNotificationEnabled?: boolean;
  appNotificationEnabled?: boolean;
}

export interface UpdateUserRequest {
  fullName?: string;
  email?: string;
  phone?: string;
  roles?: Role[];
  status?: User['status'];
  password?: string;
  originCountryId?: number | null;
  destinationCountryId?: number | null;
  productTypeId?: number | null;
  emailNotificationEnabled?: boolean;
  phoneNotificationEnabled?: boolean;
  appNotificationEnabled?: boolean;
}

export interface UserQueryParams {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users (Admin only)
    getUsers: builder.query<User[], UserQueryParams | void>({
      query: (params = {}) => ({
        url: '/admin/users',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Users' as const, id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    
    // Get single user
    getUserById: builder.query<User, number>({
      query: (id) => `/admin/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
    
    // Create user (Admin only)
    createUser: builder.mutation<User, CreateUserRequest>({
      query: (data) => ({
        url: '/admin/users',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }, 'Dashboard'],
    }),
    
    // Update user (Admin only)
    updateUser: builder.mutation<User, { id: number; data: UpdateUserRequest }>({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Users', id },
        { type: 'Users', id: 'LIST' },
        'Dashboard',
      ],
    }),
    
    // Delete user (Admin only)
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }, 'Dashboard'],
    }),
    
    // Bulk update users
    bulkUpdateUsers: builder.mutation<void, { ids: number[]; data: UpdateUserRequest }>({
      query: ({ ids, data }) => ({
        url: '/admin/users/bulk-update',
        method: 'PATCH',
        body: { ids, data },
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }, 'Dashboard'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useBulkUpdateUsersMutation,
  useLazyGetUsersQuery,
} = usersApi;