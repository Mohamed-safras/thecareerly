import { JOB_SENIORITY } from "@/constents/basic-info-options";

export type jobSeniorityTypeValue = (typeof JOB_SENIORITY)[number]["value"];

export const JOB_SENIORITY_LABEL: Readonly<
  Record<jobSeniorityTypeValue, string>
> = Object.freeze(
  Object.fromEntries(JOB_SENIORITY.map((o) => [o.value, o.label])) as Record<
    jobSeniorityTypeValue,
    string
  >
);
