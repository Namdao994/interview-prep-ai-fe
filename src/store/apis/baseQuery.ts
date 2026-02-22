type ExtraOptions = {
  skipGlobalError?: boolean;
  showGlobalSuccess?: boolean;
};

import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {BaseQueryApi, FetchArgs} from '@reduxjs/toolkit/query/react';
import env from '@/configs/env';
import {showNotification} from '../slices/notificationSlice';
import {logout, setAccessToken, setRefreshToken} from '../slices/authSlice';
import {ErrorCode} from '@/constants/errorCodes';
import type {ApiDataResponse, ApiErrorResponse, ApiMessageResponse} from '@/shared/types/api';
import type {RootState} from '../types';

export const rawBaseQuery = fetchBaseQuery({
  baseUrl: env.API_BASE_URL,
  prepareHeaders(headers, {getState}) {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;
    const refreshToken = state.auth.refreshToken;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    if (refreshToken) {
      headers.set('x-refresh-token', refreshToken);
    }
    return headers;
  },
});
let refreshTokenPromise: Promise<void> | null = null;
let authErrorHandled = false;
async function refreshAccessToken(api: BaseQueryApi, extraOptions: ExtraOptions) {
  if (!refreshTokenPromise) {
    refreshTokenPromise = (async () => {
      const res = await rawBaseQuery({url: '/auth/refresh-token', method: 'POST'}, api, extraOptions);

      if (res.error) {
        throw res.error;
      }
      const {accessToken, refreshToken} = (res.data as ApiDataResponse<{accessToken: string; refreshToken: string}>)
        .data;
      api.dispatch(setAccessToken(accessToken));
      api.dispatch(setRefreshToken(refreshToken));
    })().finally(() => {
      refreshTokenPromise = null;
    });
  }

  await refreshTokenPromise;
}

export const baseQueryWithMiddleware = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: ExtraOptions = {},
) => {
  let result = await rawBaseQuery(args, api, extraOptions);
  console.log('result', result);
  // ===== SUCCESS TOAST =====
  if (!result.error) {
    if (result.data && extraOptions.showGlobalSuccess) {
      const message = (result.data as ApiMessageResponse).message ?? 'Success';
      api.dispatch(showNotification({type: 'success', content: message}));
    }
    return result;
  }

  const errorCode = (result.error.data as ApiErrorResponse)?.errorCode;

  try {
    // ===== 1. ACCESS TOKEN EXPIRED =====
    if (errorCode === ErrorCode.TOKEN_EXPIRED) {
      await refreshAccessToken(api, extraOptions);
      result = await rawBaseQuery(args, api, extraOptions);
    }
  } catch {
    if (!authErrorHandled) {
      authErrorHandled = true;
      api.dispatch(showNotification({type: 'success', content: 'Logout successfully'}));
      api.dispatch(logout());
    }
    return result;
  }

  // ===== STILL ERROR =====
  if (result.error) {
    const code = (result.error.data as ApiErrorResponse)?.errorCode;

    if (code === ErrorCode.NO_TOKEN && !authErrorHandled) {
      authErrorHandled = true;
      api.dispatch(showNotification({type: 'success', content: 'Logout successfully'}));
      api.dispatch(logout());
      return result;
    }

    if (!extraOptions.skipGlobalError) {
      const error = result.error.data as ApiErrorResponse;
      api.dispatch(showNotification({type: 'error', content: error.message}));
    }
  }

  return result;
};
