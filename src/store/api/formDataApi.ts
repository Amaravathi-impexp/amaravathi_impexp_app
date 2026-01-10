/**
 * RTK Query - Form Data API
 * Handles all form dropdown data (countries, product types, roles)
 * Data is cached and reused across the application
 */

import { baseApi } from './baseApi';
import type { Country, ProductType, Role } from './types';

export type { Country, ProductType, Role };

export const formDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all countries for dropdowns
    getCountries: builder.query<Country[], void>({
      query: () => '/formData/countries',
      // Cache countries data for 1 hour (they don't change often)
      keepUnusedDataFor: 3600,
      providesTags: ['Countries'],
    }),

    // Get all product types for dropdowns
    getProductTypes: builder.query<ProductType[], void>({
      query: () => '/formData/productTypes',
      // Cache product types for 1 hour
      keepUnusedDataFor: 3600,
      providesTags: ['ProductTypes'],
    }),

    // Get all roles for dropdowns (Admin only)
    getRoles: builder.query<Role[], void>({
      query: () => '/admin/roles',
      // Cache roles for 30 minutes
      keepUnusedDataFor: 1800,
      providesTags: ['Roles'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCountriesQuery,
  useGetProductTypesQuery,
  useGetRolesQuery,
} = formDataApi;