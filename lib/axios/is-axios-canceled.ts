// lib/http/is-axios-canceled.ts
import { AxiosError, CanceledError } from "axios";

export function isAxiosCanceled(err: unknown): boolean {
  return (
    err instanceof CanceledError ||
    (err instanceof AxiosError && err.code === "ERR_CANCELED")
  );
}
