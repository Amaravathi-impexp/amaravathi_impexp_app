/**
 * RTK Query - Reference Data API
 * Provides dropdown data for forms (countries, roles, product types)
 * Uses REAL backend APIs with NO mock fallbacks
 */

import { baseApi } from './baseApi';

export interface Country {
  id: number;
  iso2: string | null;
  iso3: string | null;
  name: string;
  phoneCode: string | null;
  currency: string;
}

export interface Role {
  id: number;
  code: string;
  name: string;
  type: 'CUSTOM' | 'SYSTEM' | null;
  description: string;
}

export interface ProductType {
  id: number;
  code: string;
  name: string;
  category: string;
  hsCode: string;
}

export interface PartnerType {
  id: number;
  code: string;
  name: string;
}

export type { Country, ProductType, Role, PartnerType };

export const referenceDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query<Country[], void>({
      query: () => '/formData/countries',
      keepUnusedDataFor: 3600,
    }),

    getRolesDropdown: builder.query<Role[], void>({
      query: () => '/admin/roles',
      keepUnusedDataFor: 1800,
    }),

    getProductTypes: builder.query<ProductType[], void>({
      query: () => '/formData/productTypes',
      keepUnusedDataFor: 900,
    }),

    getPartnerTypes: builder.query<PartnerType[], void>({
      query: () => ({
        url: 'http://localhost:8082/api/trade-operation/v1/partner-types',
        method: 'GET',
      }),
      keepUnusedDataFor: 3600, // Cache for 1 hour since partner types rarely change
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCountriesQuery,
  useGetRolesDropdownQuery,
  useGetProductTypesQuery,
  useGetPartnerTypesQuery,
} = referenceDataApi;