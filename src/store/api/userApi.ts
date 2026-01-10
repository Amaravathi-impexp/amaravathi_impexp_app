/**
 * RTK Query - User Profile API
 * Handles user profile management endpoints
 */

import { baseApi } from './baseApi';
import type { Country, ProductType, Role } from './types';

// Update User Profile Request
export interface UpdateUserProfileRequest {
  originCountryId: number;
  destinationCountryId: number;
  productTypeId: number;
  roles: Role[];
  emailNotificationEnabled: boolean;
  phoneNotificationEnabled: boolean;
  appNotificationEnabled: boolean;
}

// Update User Profile Response
export interface UpdateUserProfileResponse {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  status: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  originCountry: Country;
  destinationCountry: Country;
  productType: ProductType;
  roles: Role[];
  appNotificationEnabled: boolean;
  emailNotificationEnabled: boolean;
  phoneNotificationEnabled: boolean;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Update User Profile - PATCH /admin/users/{userId}
    updateUserProfile: builder.mutation<UpdateUserProfileResponse, { userId: number; data: UpdateUserProfileRequest }>({
      query: ({ userId, data }) => ({
        url: `/admin/users/${userId}`,
        method: 'PATCH',
        body: data,
      }),
      // Optimistically update the cache
      async onQueryStarted({ userId, data }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedUser } = await queryFulfilled;
          
          // Update auth cache with new user data
          dispatch(
            baseApi.util.updateQueryData('signIn' as any, undefined, (draft: any) => {
              if (draft) {
                Object.assign(draft, {
                  id: updatedUser.id,
                  status: updatedUser.status,
                  originCountry: updatedUser.originCountry,
                  destinationCountry: updatedUser.destinationCountry,
                  productType: updatedUser.productType,
                  roles: updatedUser.roles,
                  appNotificationEnabled: updatedUser.appNotificationEnabled,
                  emailNotificationEnabled: updatedUser.emailNotificationEnabled,
                  phoneNotificationEnabled: updatedUser.phoneNotificationEnabled,
                });
              }
            })
          );
        } catch {
          // Error handled by the component
        }
      },
      invalidatesTags: ['Auth'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useUpdateUserProfileMutation,
} = userApi;