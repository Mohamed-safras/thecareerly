import { JOB_TYPES } from "@/const/basic-info-options";

export type jobTypeValue = (typeof JOB_TYPES)[number]["value"];

export const JOB_TYPE_LABEL: Readonly<Record<jobTypeValue, string>> =
  Object.freeze(
    Object.fromEntries(
      JOB_TYPES.map((type) => [type.value, type.label]),
    ) as Record<jobTypeValue, string>,
  );
