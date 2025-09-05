import { SelectFieldOptions } from "@/types/common";

export const WORKARRANGMENTS_TYPES: Readonly<SelectFieldOptions[]> =
  Object.freeze([
    { value: "Onsite", label: "Onsite" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Remote", label: "Remote" },
  ]);

export type workArragementTypeValue =
  (typeof WORKARRANGMENTS_TYPES)[number]["value"];

export const EMPLOYMENT_TYPE_LABEL: Readonly<
  Record<workArragementTypeValue, string>
> = Object.freeze(
  Object.fromEntries(
    WORKARRANGMENTS_TYPES.map((o) => [o.value, o.label])
  ) as Record<workArragementTypeValue, string>
);
