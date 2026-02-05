export interface Pagination {
  limit: number;
  page: number;
  total: number;
}

export interface ApiMessageResponse {
  message: string;
}

export interface ApiDataResponse<T> extends ApiMessageResponse {
  data: T;
}

export interface ApiListDataResponse<T> extends ApiMessageResponse {
  data: T;
  pagination: Pagination;
}

export interface ApiErrorResponse {
  message: string;
  errorCode: string;
  stack?: string;
}
