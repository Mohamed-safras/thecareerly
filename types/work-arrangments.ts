import { WORK_PREFERENCE } from "@/constents/basic-info-options";

export type workPreferenceTypeValue = (typeof WORK_PREFERENCE)[number]["value"];

export const EMPLOYMENT_TYPE_LABEL: Readonly<
  Record<workPreferenceTypeValue, string>
> = Object.freeze(
  Object.fromEntries(WORK_PREFERENCE.map((o) => [o.value, o.label])) as Record<
    workPreferenceTypeValue,
    string
  >
);
