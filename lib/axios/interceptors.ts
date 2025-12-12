import { AxiosError, AxiosInstance, AxiosResponse, AxiosHeaders } from "axios";
import { ApiErrorPayload } from "./axios-client";

/**
 * Configuration interface for retry tracking
 */
export interface RetryableConfig {
  __retryCount?: number;
  "axios-retry"?: {
    retries?: number;
    retryCount?: number;
  };
  _retry?: boolean; // For token refresh retry
  url?: string;
  headers?: AxiosHeaders;
}

interface QueuedRequest {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

/**
 * Token refresh state management
 */
let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

/**
 * Process all queued requests after token refresh
 * @param error - Error to reject all requests with, or null to resolve them
 */
const processQueue = (error: unknown): void => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve();
    }
  });

  failedQueue = [];
};

const isAuthEndpoint = (url?: string): boolean => {
  if (!url) return false;
  return (
    url.includes("/api/auth/login") ||
    url.includes("/api/auth/refresh") ||
    url.includes("/api/auth/logout")
  );
};

export const createResponseInterceptor = (axiosClient: AxiosInstance) => {
  return async (error: AxiosError<ApiErrorPayload, RetryableConfig>) => {
    const cfg = error.config as RetryableConfig | undefined;
    if (!cfg) return Promise.reject(error);

    // Handle 401 Unauthorized - Token refresh logic
    if (error.response?.status === 401 && !cfg._retry) {
      // Don't retry auth endpoints themselves
      if (isAuthEndpoint(cfg.url)) {
        return Promise.reject(error);
      }

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosClient(cfg))
          .catch((err) => Promise.reject(err));
      }

      cfg._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        await axiosClient.get("/api/auth/refresh");

        // Process queued requests
        processQueue(null);

        // Retry the original request
        return axiosClient(cfg);
      } catch (refreshError) {
        // Refresh failed - clear queue and redirect to login
        processQueue(refreshError);

        // Redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  };
};

export const handleResponseSuccess = (
  response: AxiosResponse
): AxiosResponse => {
  return response;
};
