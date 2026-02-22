import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithMiddleware} from './baseQuery';
import type {User} from '@/shared/types/auth';
import type {ApiDataResponse, ApiErrorResponse, ApiMessageResponse} from '@/shared/types/api';
type FieldTypeLogin = {
  email: string;
  password: string;
};
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithMiddleware,
  endpoints: (builder) => ({
    login: builder.mutation<
      ApiDataResponse<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>,
      FieldTypeLogin
    >({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (response: {status: number; data: ApiErrorResponse}) => {
        return response.data;
      },
      extraOptions: {
        skipGlobalError: true,
      },
    }),
    logout: builder.mutation<ApiMessageResponse, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'DELETE',
      }),
    }),
    //
    register: builder.mutation<ApiMessageResponse, FormData>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      transformErrorResponse: (response: {status: number; data: ApiErrorResponse}) => {
        return response.data;
      },
      extraOptions: {
        showGlobalSuccess: true,
        skipGlobalError: true,
      },
    }),
    changePassword: builder.mutation<ApiMessageResponse, {password: string; newPassword: string}>({
      query: (body) => ({
        url: '/auth/change-password',
        method: 'PATCH',
        body,
      }),
      extraOptions: {
        showGlobalSuccess: true,
      },
    }),
    verifyEmailOtp: builder.mutation<ApiMessageResponse, {email: string; code: string}>({
      query: (body) => ({
        url: '/auth/verify-email-otp',
        method: 'POST',
        body,
      }),
      extraOptions: {
        showGlobalSuccess: true,
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useVerifyEmailOtpMutation,
} = authApi;
