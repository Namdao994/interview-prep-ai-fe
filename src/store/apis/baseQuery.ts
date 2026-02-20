// import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import type {BaseQueryApi, FetchArgs} from '@reduxjs/toolkit/query/react';
// import {showNotification} from '../slices/notificationSlice';
// import type {ApiErrorResponse, ApiMessageResponse} from '@/shared/types/api';
// import env from '@/configs/env';
// import {getCookie} from '@/utils/cookies';
// import {ErrorCode} from '@/constants/errorCodes';
// import {logout} from '../slices/authSlice';

// let isAuthErrorHandled = false;
// let isRefreshingToken = false;

// type ExtraOptions = {
//   skipGlobalError?: boolean;
//   showGlobalSuccess?: boolean;
// };

// const baseQuery = fetchBaseQuery({
//   baseUrl: env.API_BASE_URL,
//   credentials: 'include',
//   prepareHeaders(headers, {arg}) {
//     const method = typeof arg === 'string' ? 'GET' : (arg.method?.toUpperCase() ?? 'GET');
//     if (method === 'GET') {
//       return headers;
//     }
//     const csrfToken = getCookie('csrfToken');
//     if (csrfToken) {
//       headers.set('x-csrf-token', csrfToken);
//     }
//     return headers;
//   },
// });

// export const baseQueryWithMiddleware = async (
//   args: string | FetchArgs,
//   api: BaseQueryApi,
//   extraOptions: ExtraOptions = {},
// ) => {
//   console.log('args', args);
//   let result = await baseQuery(args, api, extraOptions);
//   console.log('result', result);
//   // Toast của thành công, nếu set showGlobalSuccess = true thì sẽ xử lí ở đây, còn không thì tự xử lí ở component
//   if (!result.error) {
//     if (result.data && extraOptions.showGlobalSuccess) {
//       const message = (result.data as ApiMessageResponse).message ?? 'Success';
//       api.dispatch(showNotification({type: 'success', content: message}));
//     }
//     return result;
//   }
//   //Xử lí lỗi chung
//   const errorCode = (result.error.data as ApiErrorResponse)?.errorCode;

//   switch (errorCode) {
//     case ErrorCode.TOKEN_EXPIRED: {
//       if (!isRefreshingToken) {
//         isRefreshingToken = true;
//         // gọi refresh token
//         const refreshResult = await baseQuery(
//           {
//             url: '/auth/refresh-token',
//             method: 'POST',
//           },
//           api,
//           extraOptions,
//         );
//         isRefreshingToken = false;
//         // 3. Refresh thành công → gọi lại request cũ
//         if (!refreshResult.error) {
//           result = await baseQuery(args, api, extraOptions);
//         } else if (!isAuthErrorHandled) {
//           isAuthErrorHandled = true;
//           // refresh fail → logout
//           // không cần gọi api vì tất cả cookie đã vô tác dụng
//           api.dispatch(showNotification({type: 'success', content: 'Logout successfully'}));
//           api.dispatch(logout());
//         }
//       }
//       break;
//     }
//     case ErrorCode.CSRF_TOKEN_EXPIRED: {
//       const csrfResult = await baseQuery(
//         {
//           url: '/auth/rotate-csrf',
//           method: 'POST',
//         },
//         api,
//         extraOptions,
//       );

//       if (!csrfResult.error) {
//         // Có csrf mới → retry request cũ
//         result = await baseQuery(args, api, extraOptions);
//       } else if (!isAuthErrorHandled) {
//         isAuthErrorHandled = true;
//         api.dispatch(logout());
//       }

//       break;
//     }
//     case ErrorCode.NO_TOKEN: {
//       // không cần gọi api vì tất cả cookie đã vô tác dụng
//       if (!isAuthErrorHandled) {
//         isAuthErrorHandled = true;
//         api.dispatch(logout());
//         api.dispatch(showNotification({type: 'success', content: 'Logout successfully'}));
//       }
//       break;
//     }
//     // Những ErrorCode chung thì xử lí ở đây
//     default: {
//       //Toast của thất bại, nếu set skipGlobalError = true thì sẽ tự xử lí toast ở component
//       if (!extraOptions.skipGlobalError) {
//         const error = result.error.data as ApiErrorResponse;
//         api.dispatch(showNotification({type: 'error', content: error.message}));
//       }
//       break;
//     }
//   }
//   return result;
// };

type ExtraOptions = {
  skipGlobalError?: boolean;
  showGlobalSuccess?: boolean;
};

import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {BaseQueryApi, FetchArgs} from '@reduxjs/toolkit/query/react';
import env from '@/configs/env';
import {getCookie} from '@/utils/cookies';
import {showNotification} from '../slices/notificationSlice';
import {logout} from '../slices/authSlice';
import {ErrorCode} from '@/constants/errorCodes';
import type {ApiErrorResponse, ApiMessageResponse} from '@/shared/types/api';

export const rawBaseQuery = fetchBaseQuery({
  baseUrl: env.API_BASE_URL,
  credentials: 'include',

  prepareHeaders(headers, {arg}) {
    const method = typeof arg === 'string' ? 'GET' : (arg.method?.toUpperCase() ?? 'GET');

    const accessToken = getCookie('accessToken');

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    const refreshToken = getCookie('refreshToken');

    if (refreshToken) {
      headers.set('Authorization', `Bearer ${refreshToken}`);
    }

    if (method !== 'GET') {
      const csrfToken = getCookie('csrfToken');
      if (csrfToken) {
        headers.set('x-csrf-token', csrfToken);
      }
    }

    return headers;
  },
});

let refreshTokenPromise: Promise<void> | null = null;
let refreshCsrfPromise: Promise<void> | null = null;
let authErrorHandled = false;
async function refreshAccessToken(api: BaseQueryApi, extraOptions: ExtraOptions) {
  if (!refreshTokenPromise) {
    refreshTokenPromise = (async () => {
      const res = await rawBaseQuery({url: '/auth/refresh-token', method: 'POST'}, api, extraOptions);

      if (res.error) {
        throw res.error;
      }
    })().finally(() => {
      refreshTokenPromise = null;
    });
  }

  await refreshTokenPromise;
}

async function refreshCsrfToken(api: BaseQueryApi, extraOptions: ExtraOptions) {
  if (!refreshCsrfPromise) {
    refreshCsrfPromise = (async () => {
      const res = await rawBaseQuery({url: '/auth/rotate-csrf', method: 'POST'}, api, extraOptions);

      if (res.error) {
        throw res.error;
      }
    })().finally(() => {
      refreshCsrfPromise = null;
    });
  }

  await refreshCsrfPromise;
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

    // ===== 2. CSRF TOKEN EXPIRED =====
    if (errorCode === ErrorCode.CSRF_TOKEN_EXPIRED) {
      await refreshCsrfToken(api, extraOptions);
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
