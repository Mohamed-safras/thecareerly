// lib/axios-client.ts
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";
import axiosRetry, { isNetworkError } from "axios-retry";
import { toast } from "sonner";

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

// Extend config to track retry + toast state
interface RetryableConfig extends InternalAxiosRequestConfig {
  __retryCount?: number;
  __toastedOnce?: boolean;
  "axios-retry"?: AxiosRetryMeta;
}

function extractMessage(
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
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 20_000,
  headers: { "Content-Type": "application/json" },
});

// ----- Request interceptor -----
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

// ----- Retry rules -----
function isRetryableStatus(status?: number) {
  if (!status) return false;
  return status >= 500; // only 5xx
}

function shouldRetry429(error: AxiosError) {
  const status = error.response?.status;
  if (status !== 429) return false;
  const ra = error.response?.headers?.["retry-after"];
  const secs = ra ? Number(ra) : NaN;
  // retry 429 ONLY if server gives Retry-After (capped)
  return Number.isFinite(secs) && secs > 0 && secs <= 30;
}

axiosRetry(axiosClient, {
  retries: 3,
  shouldResetTimeout: true,
  retryCondition: (error) => {
    if (isNetworkError(error)) return true; // network
    const status = error.response?.status;
    if (isRetryableStatus(status)) return true; // 5xx
    if (shouldRetry429(error)) return true; // 429 w/ Retry-After
    return false; // do not retry other 4xx
  },
  retryDelay: (retryCount, error) => {
    const ra = error?.response?.headers?.["retry-after"];
    const secs = ra ? Number(ra) : NaN;
    if (Number.isFinite(secs) && secs > 0) {
      return secs * 1000; // honor server backoff
    }
    // fallback exponential
    return axiosRetry.exponentialDelay(retryCount);
  },
});

// Will another retry happen?
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

// ----- Response interceptor: toast only on final failure -----
axiosClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError<ApiErrorPayload, RetryableConfig>) => {
    const cfg = error.config as RetryableConfig | undefined;
    if (!cfg) return Promise.reject(error);

    // Suppress toast if another retry is pending
    if (anotherRetryScheduled(error)) {
      return Promise.reject(error);
    }

    // Final failure -> toast once
    if (typeof window !== "undefined" && cfg.__toastedOnce !== true) {
      cfg.__toastedOnce = true;
      const status = error.response?.status;
      const data = error.response?.data ?? null;
      const msg = extractMessage(data, status);
      toast.error(msg);
    }

    return Promise.reject(error);
  }
);
