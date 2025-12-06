import { store } from "@/store";
import { clearUser } from "@/store/slice/auth-slice";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";
import axiosRetry, { isNetworkError } from "axios-retry";

export interface ApiErrorPayload {
  message?: string;
  error?: string;
  errorMessage?: string;
  data?: { error?: string; message?: string };
}
// axios-retry metadata shape
interface AxiosRetryMeta {
  retries?: number;
  retryCount?: number;
}

// Extend config to track retry state
interface RetryableConfig extends InternalAxiosRequestConfig {
  __retryCount?: number;
  "axios-retry"?: AxiosRetryMeta;
  _retry?: boolean; // For token refresh retry
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
  baseURL: "http://localhost:8088/",
  timeout: 20_000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Important: Send cookies with requests
});

// Token refresh state
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

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

function anotherRetryScheduled(
  error: AxiosError<ApiErrorPayload, RetryableConfig>
): boolean {
  const cfg = error.config as RetryableConfig | undefined;
  if (!cfg) return false;

  const meta: AxiosRetryMeta | undefined = cfg["axios-retry"];
  const maxRetries = meta?.retries ?? 0;
  const current = meta?.retryCount ?? cfg.__retryCount ?? 0;

  const status = error.response?.status;
  const willRetry =
    isNetworkError(error) || isRetryableStatus(status) || shouldRetry429(error);

  return willRetry && current < maxRetries;
}

// Response interceptor with token refresh
axiosClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError<ApiErrorPayload, RetryableConfig>) => {
    const cfg = error.config as RetryableConfig | undefined;
    if (!cfg) return Promise.reject(error);

    // Handle 401 Unauthorized - Token refresh logic
    if (error.response?.status === 401 && !cfg._retry) {
      // Don't retry auth endpoints themselves
      if (
        cfg.url?.includes("/api/auth/login") ||
        cfg.url?.includes("/api/auth/refresh") ||
        cfg.url?.includes("/api/auth/logout")
      ) {
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
        await axiosClient.post("/api/auth/refresh");

        // Process queued requests
        processQueue(null);

        // Retry the original request
        return axiosClient(cfg);
      } catch (refreshError) {
        // Refresh failed - clear queue and redirect to login
        processQueue(refreshError);

        // Clear user state
        store.dispatch(clearUser());

        // Redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Suppress toast if another retry is pending (for network/5xx errors)
    if (anotherRetryScheduled(error)) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
