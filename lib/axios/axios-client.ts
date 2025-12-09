import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";
import axiosRetry, { isNetworkError } from "axios-retry";
import {
  createResponseInterceptor,
  handleResponseSuccess,
  RetryableConfig,
} from "./interceptors";

export interface ApiErrorPayload {
  message?: string;
  error?: string;
  errorMessage?: string;
  data?: { error?: string; message?: string };
}

export function extractMessage(
  data: ApiErrorPayload | string | null,
  status?: number
): string {
  if (!data) return status ? `Request failed (${status})` : "Request failed";
  if (typeof data === "string") return data;
  return (
    data.message ||
    data.error ||
    data.errorMessage ||
    data.data?.error ||
    data.data?.message ||
    (status ? `Request failed (${status})` : "Request failed")
  );
}

export const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 20_000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Important: Send cookies with requests
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const isFormData =
      typeof FormData !== "undefined" && config.data instanceof FormData;

    if (!config.headers) config.headers = new AxiosHeaders();
    if (!isFormData && !config.headers.has("Content-Type")) {
      config.headers.set("Content-Type", "application/json");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

function isRetryableStatus(status?: number) {
  if (!status) return false;
  return status >= 500; // only 5xx
}

function shouldRetry429(error: AxiosError) {
  const status = error.response?.status;
  if (status !== 429) return false;
  const ra = error.response?.headers?.["retry-after"];
  const secs = ra ? Number(ra) : NaN;
  return Number.isFinite(secs) && secs > 0 && secs <= 30;
}

// Configure axios-retry
axiosRetry(axiosClient, {
  retries: 3,
  shouldResetTimeout: true,
  retryCondition: (error) => {
    // Don't retry 401 errors (handled separately)
    if (error.response?.status === 401) return false;

    if (isNetworkError(error)) return true;
    const status = error.response?.status;
    if (isRetryableStatus(status)) return true;
    if (shouldRetry429(error)) return true;
    return false;
  },
  retryDelay: (retryCount, error) => {
    const ra = error?.response?.headers?.["retry-after"];
    const secs = ra ? Number(ra) : NaN;
    if (Number.isFinite(secs) && secs > 0) {
      return secs * 1000;
    }
    return axiosRetry.exponentialDelay(retryCount);
  },
});

// Response interceptor with token refresh
axiosClient.interceptors.response.use(
  handleResponseSuccess,
  async (error: AxiosError<ApiErrorPayload, RetryableConfig>) => {
    // Handle token refresh logic
    return createResponseInterceptor(axiosClient)(error);
  }
);

export default axiosClient;
