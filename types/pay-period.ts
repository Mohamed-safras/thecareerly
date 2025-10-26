import { PAY_PERIOD } from "@/constents/basic-info-options";

export type payPeriodTypeValue = (typeof PAY_PERIOD)[number]["value"];

export const EMPLOYMENT_TYPE_LABEL: Readonly<
  Record<payPeriodTypeValue, string>
> = Object.freeze(
  Object.fromEntries(PAY_PERIOD.map((o) => [o.value, o.label])) as Record<
    payPeriodTypeValue,
    string
  >
);
