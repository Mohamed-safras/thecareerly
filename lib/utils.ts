import { ComboItem } from "@/components/combobox";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function oneLine(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function clampString(value: string | undefined, max: number): string {
  if (!value) return "";
  return value.length > max ? value.slice(0, max) : value;
}

export function isComboItemArray(value: unknown): value is ComboItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item &&
        typeof (item as ComboItem).label === "string" &&
        typeof (item as ComboItem).value === "string"
    )
  );
}

export function createQueryString(
  params: Record<string, string>,
  searchParams?: URLSearchParams
) {
  const newSearchParams = new URLSearchParams(searchParams?.toString());

  Object.entries(params).forEach(([key, value]) => {
    newSearchParams.set(key, value);
  });

  return newSearchParams.toString();
}

/**
 * Returns the jobs path for a given organizationId and teamId.
 * Usage: getJobsPath(organizationId, teamId)
 */
export function getJobsPath(
  organizationId?: string | null,
  teamId?: string | null
) {
  if (!organizationId || !teamId) return null;
  return `/organization/${organizationId}/team/${teamId}/jobs`;
}
