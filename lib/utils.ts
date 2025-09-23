import { ComboItem } from "@/components/combobox";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function oneLine(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function clampString(s: string | undefined, max: number): string {
  if (!s) return "";
  return s.length > max ? s.slice(0, max) : s;
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
