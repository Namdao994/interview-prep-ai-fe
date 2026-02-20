import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithMiddleware} from './baseQuery';
import type {User} from '@/shared/types/auth';
import type {ApiDataResponse, ApiMessageResponse} from '@/shared/types/api';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithMiddleware,
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => ({
        url: '/user/my-profile',
      }),
      transformResponse: (res: ApiDataResponse<User>) => res.data,
    }),
    //
    changeAvatar: builder.mutation<User, FormData>({
      query: (body) => ({
        url: '/user/change-avatar',
        method: 'PATCH',
        body,
      }),
      transformResponse: (res: ApiDataResponse<User>) => res.data,
      extraOptions: {
        showGlobalSuccess: true,
      },
    }),
    //
    deleteAvatar: builder.mutation<ApiMessageResponse, void>({
      query: () => ({
        url: '/user/delete-avatar',
        method: 'DELETE',
      }),
      extraOptions: {
        showGlobalSuccess: true,
      },
    }),
    //
    updateUser: builder.mutation<User, {name: string}>({
      query: (body) => ({
        url: '/user/update',
        method: 'PATCH',
        body,
      }),
      transformResponse: (res: ApiDataResponse<User>) => res.data,
      extraOptions: {
        showGlobalSuccess: true,
      },
    }),
    //
    deleteMyAccount: builder.mutation<ApiMessageResponse, {confirmationText: string}>({
      query: (body) => ({
        url: '/user/delete',
        method: 'DELETE',
        body,
      }),
      extraOptions: {
        showGlobalSuccess: true,
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useChangeAvatarMutation,
  useDeleteAvatarMutation,
  useUpdateUserMutation,
  useDeleteMyAccountMutation,
} = userApi;
