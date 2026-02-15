import {
  ALLOWED_VIBES_TYPES,
  EDUCATION_LEVEL,
  EXPRIENCE_LEVEL,
  JOB_TYPES,
  PAY_PERIOD,
  WORK_PREFERENCE,
} from "./basic-job-info-options-value";
import {
  allowedVibesTypeValue,
  educationLevelTypeValue,
  experienceLevelValue,
  jobTypeValue,
  payPeriodTypeValue,
  workPreferenceTypeValue,
} from "@/types/job";

export const QUALIFICATION_LEVEL_LABEL: Readonly<
  Record<educationLevelTypeValue, string>
> = Object.freeze(
  Object.fromEntries(
    EDUCATION_LEVEL.map((option) => [option.value, option.label]),
  ) as Record<educationLevelTypeValue, string>,
);

export const EXPRIENCE_LEVEL_LABEL: Readonly<
  Record<experienceLevelValue, string>
> = Object.freeze(
  Object.fromEntries(EXPRIENCE_LEVEL.map((o) => [o.value, o.label])) as Record<
    experienceLevelValue,
    string
  >,
);

export const PAYPERIOD_LABEL: Readonly<Record<payPeriodTypeValue, string>> =
  Object.freeze(
    Object.fromEntries(
      PAY_PERIOD.map((option) => [option.value, option.label]),
    ) as Record<payPeriodTypeValue, string>,
  );

export const JOB_TYPE_LABEL: Readonly<Record<jobTypeValue, string>> =
  Object.freeze(
    Object.fromEntries(
      JOB_TYPES.map((type) => [type.value, type.label]),
    ) as Record<jobTypeValue, string>,
  );

export const EMPLOYMENT_TYPE_LABEL: Readonly<
  Record<workPreferenceTypeValue, string>
> = Object.freeze(
  Object.fromEntries(
    WORK_PREFERENCE.map((option) => [option.value, option.label]),
  ) as Record<workPreferenceTypeValue, string>,
);

export const ALLOWED_VIBES_TYPE_LABEL: Readonly<
  Record<allowedVibesTypeValue, string>
> = Object.freeze(
  Object.fromEntries(
    ALLOWED_VIBES_TYPES.map((option) => [option.value, option.label]),
  ) as Record<allowedVibesTypeValue, string>,
);
