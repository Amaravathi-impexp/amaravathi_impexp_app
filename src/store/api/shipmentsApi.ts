/**
 * RTK Query - Shipments API
 * Handles shipment CRUD operations and tracking
 */

import { baseApi } from './baseApi';

export interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  cargo: string;
  status: 'Pending' | 'In Transit' | 'Delivered' | 'Delayed';
  eta: string;
  departureDate: string;
  weight: string;
  containerType: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateShipmentRequest {
  origin: string;
  destination: string;
  cargo: string;
  departureDate: string;
  weight: string;
  containerType: string;
  customerName: string;
  customerEmail: string;
}

export interface UpdateShipmentRequest extends Partial<CreateShipmentRequest> {
  status?: Shipment['status'];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ShipmentQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const shipmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all shipments with pagination and filters
    getShipments: builder.query<PaginatedResponse<Shipment>, ShipmentQueryParams | void>({
      query: (params = {}) => ({
        url: '/shipments',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Shipments' as const, id })),
              { type: 'Shipments', id: 'LIST' },
            ]
          : [{ type: 'Shipments', id: 'LIST' }],
    }),
    
    // Get single shipment by ID
    getShipmentById: builder.query<Shipment, string>({
      query: (id) => `/shipments/${id}`,
      providesTags: (result, error, id) => [{ type: 'Shipments', id }],
    }),
    
    // Track shipment by tracking number
    trackShipment: builder.query<Shipment, string>({
      query: (trackingNumber) => `/shipments/track/${trackingNumber}`,
      providesTags: (result) => 
        result ? [{ type: 'Shipments', id: result.id }] : [],
    }),
    
    // Create new shipment
    createShipment: builder.mutation<Shipment, CreateShipmentRequest>({
      query: (data) => ({
        url: '/shipments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Shipments', id: 'LIST' }, 'Dashboard'],
    }),
    
    // Update shipment
    updateShipment: builder.mutation<Shipment, { id: string; data: UpdateShipmentRequest }>({
      query: ({ id, data }) => ({
        url: `/shipments/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Shipments', id },
        { type: 'Shipments', id: 'LIST' },
        'Dashboard',
      ],
    }),
    
    // Delete shipment
    deleteShipment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/shipments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Shipments', id: 'LIST' }, 'Dashboard'],
    }),
    
    // Bulk update shipments
    bulkUpdateShipments: builder.mutation<void, { ids: string[]; data: UpdateShipmentRequest }>({
      query: ({ ids, data }) => ({
        url: '/shipments/bulk-update',
        method: 'PATCH',
        body: { ids, data },
      }),
      invalidatesTags: [{ type: 'Shipments', id: 'LIST' }, 'Dashboard'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetShipmentsQuery,
  useGetShipmentByIdQuery,
  useTrackShipmentQuery,
  useCreateShipmentMutation,
  useUpdateShipmentMutation,
  useDeleteShipmentMutation,
  useBulkUpdateShipmentsMutation,
  useLazyGetShipmentsQuery,
  useLazyTrackShipmentQuery,
} = shipmentsApi;