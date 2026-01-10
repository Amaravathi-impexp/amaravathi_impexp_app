/**
 * RTK Query - Partners API
 * Handles partner directory CRUD operations with real backend
 */

import { baseApi } from './baseApi';
import config from '../../config/env';

// Partner Type interface
export interface PartnerType {
  id: number;
  code: string;
  name: string;
}

// Partner interface matching backend response
export interface Partner {
  id: number;
  partnerTypes: PartnerType[];
  name: string;
  email: string;
  phone: string;
  website: string;
  countryId: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  rating: number | null;
  verified: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Create partner request matching backend API
export interface CreatePartnerRequest {
  partnerTypeIds: number[];
  name: string;
  email: string;
  phone: string;
  website: string;
  countryId: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface UpdatePartnerRequest extends Partial<CreatePartnerRequest> {
  status?: string;
  rating?: number;
}

export interface PartnerQueryParams {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  search?: string;
}

export const partnersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all partners - returns array directly from backend
    getPartners: builder.query<Partner[], PartnerQueryParams | void>({
      query: (params = {}) => ({
        url: `${config.apiEndpoints.tradeOperation}/partners`,
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Partners' as const, id: String(id) })),
              { type: 'Partners', id: 'LIST' },
            ]
          : [{ type: 'Partners', id: 'LIST' }],
    }),
    
    // Get single partner
    getPartnerById: builder.query<Partner, number>({
      query: (id) => `${config.apiEndpoints.tradeOperation}/partners/${id}`,
      providesTags: (result, error, id) => [{ type: 'Partners', id: String(id) }],
    }),
    
    // Create partner
    createPartner: builder.mutation<Partner, CreatePartnerRequest>({
      query: (data) => ({
        url: `${config.apiEndpoints.tradeOperation}/partners`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Partners', id: 'LIST' }, 'Dashboard'],
    }),
    
    // Update partner
    updatePartner: builder.mutation<Partner, { id: number; data: UpdatePartnerRequest }>({
      query: ({ id, data }) => ({
        url: `${config.apiEndpoints.tradeOperation}/partners/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Partners', id: String(id) },
        { type: 'Partners', id: 'LIST' },
        'Dashboard',
      ],
    }),
    
    // Delete partner
    deletePartner: builder.mutation<void, number>({
      query: (id) => ({
        url: `${config.apiEndpoints.tradeOperation}/partners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Partners', id: 'LIST' }, 'Dashboard'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPartnersQuery,
  useGetPartnerByIdQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
  useLazyGetPartnersQuery,
} = partnersApi;