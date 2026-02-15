import { PAY_PERIOD } from "@/const/basic-info-options";

export type payPeriodTypeValue = (typeof PAY_PERIOD)[number]["value"];

export const PAYPERIOD_LABEL: Readonly<Record<payPeriodTypeValue, string>> =
  Object.freeze(
    Object.fromEntries(
      PAY_PERIOD.map((option) => [option.value, option.label]),
    ) as Record<payPeriodTypeValue, string>,
  );
