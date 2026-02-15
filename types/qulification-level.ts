import { EDUCATION_LEVEL } from "@/const/basic-info-options";

export type educationLevelTypeValue = (typeof EDUCATION_LEVEL)[number]["value"];

export const QUALIFICATION_LEVEL_LABEL: Readonly<
  Record<educationLevelTypeValue, string>
> = Object.freeze(
  Object.fromEntries(
    EDUCATION_LEVEL.map((option) => [option.value, option.label]),
  ) as Record<educationLevelTypeValue, string>,
);
