import { SelectFieldOptions } from "@/types/common";

export const EMPLOYMENT_TYPES: Readonly<SelectFieldOptions[]> = Object.freeze([
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
  { value: "Other", label: "Other" },
]);

export type employmentTypeValue = (typeof EMPLOYMENT_TYPES)[number]["value"];

export const EMPLOYMENT_TYPE_LABEL: Readonly<
  Record<employmentTypeValue, string>
> = Object.freeze(
  Object.fromEntries(EMPLOYMENT_TYPES.map((o) => [o.value, o.label])) as Record<
    employmentTypeValue,
    string
  >
);
