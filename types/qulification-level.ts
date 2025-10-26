import { QUALIFICATION_LEVEL } from "@/constents/basic-info-options";

export type qualificationLevelTypeValue =
  (typeof QUALIFICATION_LEVEL)[number]["value"];

export const QUALIFICATION_LEVEL_LABEL: Readonly<
  Record<qualificationLevelTypeValue, string>
> = Object.freeze(
  Object.fromEntries(
    QUALIFICATION_LEVEL.map((o) => [o.value, o.label])
  ) as Record<qualificationLevelTypeValue, string>
);
