/**
 * RTK Query - Users API
 * Handles user management operations (Admin only)
 */

import { baseApi } from './baseApi';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Importer' | 'Exporter';
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: User['role'];
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: User['role'];
  status?: User['status'];
  password?: string;
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
    getUsers: builder.query<PaginatedResponse<User>, UserQueryParams | void>({
      query: (params = {}) => ({
        url: '/users',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Users' as const, id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    
    // Get single user
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
    
    // Create user (Admin only)
    createUser: builder.mutation<User, CreateUserRequest>({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }, 'Dashboard'],
    }),
    
    // Update user (Admin only)
    updateUser: builder.mutation<User, { id: string; data: UpdateUserRequest }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Users', id },
        { type: 'Users', id: 'LIST' },
        'Dashboard',
      ],
    }),
    
    // Delete user (Admin only)
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }, 'Dashboard'],
    }),
    
    // Bulk update users
    bulkUpdateUsers: builder.mutation<void, { ids: string[]; data: UpdateUserRequest }>({
      query: ({ ids, data }) => ({
        url: '/users/bulk-update',
        method: 'PATCH',
        body: { ids, data },
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }, 'Dashboard'],
    }),
  }),
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
