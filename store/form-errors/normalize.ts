import { AxiosError } from "axios";
import { FieldError } from "@/types/form-errors";

type FieldErrorPayload = Record<string, string | string[]>;
type ApiFieldErrorResponse = {
  fieldErrors?: FieldErrorPayload;
  message?: string;
};

export function extractFieldErrors(err: unknown): FieldError[] | null {
  if (!(err instanceof AxiosError)) return null;

  const data = err.response?.data;
  if (!data || typeof data !== "object") return null;

  const fe = (data as ApiFieldErrorResponse).fieldErrors;
  if (!fe || typeof fe !== "object") return null;

  const out: FieldError[] = [];
  for (const [path, msg] of Object.entries(fe)) {
    const message = Array.isArray(msg) ? msg.join(", ") : msg;
    if (typeof message === "string" && message.trim().length > 0) {
      out.push({ path, message });
    }
  }
  return out.length ? out : null;
}
