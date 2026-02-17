// components/FacilitiesCheckboxGroup.tsx
"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // optional; remove cn(...) if you don't use it

export type Option = { value: string; label: string };

interface CheckboxGroupProps {
  options: Readonly<Option[]>;
  values: string[]; // selected values
  onChange: (next: string[]) => void;
  columns?: 1 | 2 | 3 | 4; // layout control (default 2)
  disabledValues?: string[]; // optional: disable specific items
}

export default function CheckboxGroup({
  options,
  values,
  onChange,
  columns = 3,
  disabledValues = [],
}: CheckboxGroupProps) {
  const toggle = (newValue: string) => {
    const next = values.includes(newValue)
      ? values.filter((existingValue) => existingValue !== newValue)
      : [...values, newValue];
    onChange(next);
  };

  const baseId = React.useId();

  return (
    <div
      className={cn(
        "grid sm:grid-cols-3 gap-3 ",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-2",
        columns === 3 && "grid-cols-3",
        columns === 4 && "grid-cols-4",
      )}
    >
      {options.map((opt) => {
        const id = `${baseId}-${opt.value}`;
        const checked = values.includes(opt.value);
        const disabled = disabledValues.includes(opt.value);
        return (
          <div key={opt.value} className="flex items-center gap-2">
            <Checkbox
              id={id}
              checked={checked}
              onCheckedChange={() => toggle(opt.value)}
              disabled={disabled}
            />
            <Label
              htmlFor={id}
              className={`text-sm font-normal ${disabled ? "opacity-60" : ""}`}
            >
              {opt.label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
