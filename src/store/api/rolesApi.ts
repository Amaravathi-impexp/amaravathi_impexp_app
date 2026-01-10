/**
 * RTK Query - Roles API
 * Handles roles management endpoints with REAL backend integration
 * NO MOCK DATA - All endpoints use actual backend
 */

import { baseApi } from './baseApi';

export interface Role {
  id: number;
  code: string;
  name: string;
  type: 'CUSTOM' | 'SYSTEM' | null;
  description: string;
}

export interface CreateRoleRequest {
  code: string;
  name: string;
  description: string;
}

export interface DeleteRoleResponse {
  id: number;
  code: null;
  name: null;
  type: null;
  description: null;
}

export const rolesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all roles - GET /admin/roles
    getRoles: builder.query<Role[], void>({
      query: () => '/admin/roles',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Roles' as const, id })),
              { type: 'Roles', id: 'LIST' },
            ]
          : [{ type: 'Roles', id: 'LIST' }],
    }),

    // Create role - POST /admin/roles
    // Returns 201 with full role object
    createRole: builder.mutation<Role, CreateRoleRequest>({
      query: (data) => ({
        url: '/admin/roles',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Roles', id: 'LIST' }],
    }),

    // Delete role - DELETE /admin/roles/{ROLE_ID}
    // Returns 200 with role object (all fields except id are null)
    deleteRole: builder.mutation<DeleteRoleResponse, number>({
      query: (id) => ({
        url: `/admin/roles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Roles', id: 'LIST' }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetRolesQuery, useCreateRoleMutation, useDeleteRoleMutation } = rolesApi;