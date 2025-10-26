import axios from "axios";
import { ApiErrorPayload } from "../http/axios-client";

export function extractStatusAndMessage(err: unknown): {
  status?: number;
  message?: string;
} {
  if (axios.isAxiosError<ApiErrorPayload>(err)) {
    const status = err.response?.status;
    const payload = err.response?.data;
    const message =
      (typeof payload === "string" && payload) ||
      payload?.message ||
      payload?.error ||
      payload?.errorMessage ||
      payload?.data?.error ||
      payload?.data?.message ||
      err.message;
    return { status, message };
  }
  // Non-Axios error
  if (err instanceof Error) {
    return { message: err.message };
  }
  return { message: "Request failed" };
}
