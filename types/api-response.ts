export type ApiResponse<T> = {
  status: number;
  statusText: string;
  message: string;
  data?: T;
  details?: unknown;
};
