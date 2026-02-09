import { CURRENCY_OPTIONS } from "@/const/basic-info-options";

export type currencyOptionTypeValue =
  (typeof CURRENCY_OPTIONS)[number]["value"];

export const EMPLOYMENT_TYPE_LABEL: Readonly<
  Record<currencyOptionTypeValue, string>
> = Object.freeze(
  Object.fromEntries(CURRENCY_OPTIONS.map((o) => [o.value, o.label])) as Record<
    currencyOptionTypeValue,
    string
  >,
);
