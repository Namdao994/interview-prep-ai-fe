export const ROUTES = {
  LANDING_PAGE: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile',
  SESSION_DETAIL: (id: string) => `/dashboard/session/${id}`,
  USER_DETAIL: (id: string) => `/dashboard/users/${id}`,
};
