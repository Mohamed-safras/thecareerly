import { EMPLOYMENT_TYPES } from "@/constents/basic-info-options";

export type employmentTypeValue = (typeof EMPLOYMENT_TYPES)[number]["value"];

export const EMPLOYMENT_TYPE_LABEL: Readonly<
  Record<employmentTypeValue, string>
> = Object.freeze(
  Object.fromEntries(EMPLOYMENT_TYPES.map((o) => [o.value, o.label])) as Record<
    employmentTypeValue,
    string
  >
);
