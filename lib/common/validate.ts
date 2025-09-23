import { BadRequestError } from "../error/http-error";

export const isObjectId = (s: string | undefined | null): s is string =>
  typeof s === "string" && /^[a-fA-F0-9]{24}$/.test(s);

export const DatetimeLocalRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

export function parseDatetimeLocal(value: string) {
  if (!DatetimeLocalRegex.test(value)) {
    throw new BadRequestError("Invalid datetime-local format");
  }
  // Append ":00" for seconds so it's full ISO local
  const withSeconds = value + ":00";
  return new Date(withSeconds);
}
