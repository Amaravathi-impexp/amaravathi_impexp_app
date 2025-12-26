/**
 * RTK Query - Partners API
 * Handles partner directory CRUD operations
 */

import { baseApi } from './baseApi';

export interface Partner {
  id: string;
  name: string;
  type: 'Supplier' | 'Carrier' | 'Warehouse' | 'Customer';
  email: string;
  phone: string;
  address: string;
  country: string;
  status: 'Active' | 'Inactive';
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePartnerRequest {
  name: string;
  type: Partner['type'];
  email: string;
  phone: string;
  address: string;
  country: string;
}

export interface UpdatePartnerRequest extends Partial<CreatePartnerRequest> {
  status?: Partner['status'];
  rating?: number;
}

export interface PartnerQueryParams {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export const partnersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all partners
    getPartners: builder.query<PaginatedResponse<Partner>, PartnerQueryParams | void>({
      query: (params = {}) => ({
        url: '/partners',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Partners' as const, id })),
              { type: 'Partners', id: 'LIST' },
            ]
          : [{ type: 'Partners', id: 'LIST' }],
    }),
    
    // Get single partner
    getPartnerById: builder.query<Partner, string>({
      query: (id) => `/partners/${id}`,
      providesTags: (result, error, id) => [{ type: 'Partners', id }],
    }),
    
    // Create partner
    createPartner: builder.mutation<Partner, CreatePartnerRequest>({
      query: (data) => ({
        url: '/partners',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Partners', id: 'LIST' }, 'Dashboard'],
    }),
    
    // Update partner
    updatePartner: builder.mutation<Partner, { id: string; data: UpdatePartnerRequest }>({
      query: ({ id, data }) => ({
        url: `/partners/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Partners', id },
        { type: 'Partners', id: 'LIST' },
        'Dashboard',
      ],
    }),
    
    // Delete partner
    deletePartner: builder.mutation<void, string>({
      query: (id) => ({
        url: `/partners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Partners', id: 'LIST' }, 'Dashboard'],
    }),
  }),
});

export const {
  useGetPartnersQuery,
  useGetPartnerByIdQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
  useLazyGetPartnersQuery,
} = partnersApi;
