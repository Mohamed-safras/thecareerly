import { EXPRIENCE_LEVEL } from "@/const/basic-info-options";

export type experienceLevelValue = (typeof EXPRIENCE_LEVEL)[number]["value"];

export const EXPRIENCE_LEVEL_LABEL: Readonly<
  Record<experienceLevelValue, string>
> = Object.freeze(
  Object.fromEntries(EXPRIENCE_LEVEL.map((o) => [o.value, o.label])) as Record<
    experienceLevelValue,
    string
  >,
);
