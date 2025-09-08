"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type ComboItem = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

type ComboboxProps = {
  id?: string;
  items: ComboItem[];
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null, item?: ComboItem) => void;

  // Creation support
  allowCreate?: boolean;
  onCreate?: (label: string) => ComboItem | void; // return created item if you want the component to select it

  // UI texts
  placeholder?: string;
  inputPlaceholder?: string;
  emptyMessage?: string;
  createPrefix?: string; // e.g. 'Create'
  disabled?: boolean;

  // styling
  className?: string;
  contentClassName?: string;
  matchTriggerWidth?: boolean;
  clearable?: boolean;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function Combobox({
  id,
  items,
  value,
  defaultValue = null,
  onChange,
  allowCreate = true,
  onCreate,
  placeholder = "Select...",
  inputPlaceholder = "Type to search...",
  emptyMessage = "No results.",
  createPrefix = "Create",
  disabled,
  className,
  contentClassName,
  matchTriggerWidth = true,
  clearable = true,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | null>(
    defaultValue
  );
  const currentValue = (isControlled ? value : internalValue) ?? null;

  const [query, setQuery] = React.useState("");
  const selectedItem = items.find((i) => i.value === currentValue) || null;

  // keep PopoverContent width = trigger width
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const [contentWidth, setContentWidth] = React.useState<number>();

  React.useLayoutEffect(() => {
    if (!matchTriggerWidth || !triggerRef.current) return;
    const el = triggerRef.current;
    const update = () => setContentWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [matchTriggerWidth]);

  const setValue = (val: string | null) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val, items.find((i) => i.value === val) || undefined);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue(null);
  };

  // show "Create ..." if:
  // - creation is allowed
  // - user typed something
  // - no existing item's label equals the query (case-insensitive)
  const trimmed = query.trim();
  const exists =
    !!trimmed &&
    items.some(
      (i) => i.label.toLocaleLowerCase() === trimmed.toLocaleLowerCase()
    );
  const showCreate = allowCreate && !!trimmed && !exists;

  const handleCreate = () => {
    if (!trimmed) return;
    const created: ComboItem = (onCreate?.(trimmed) as ComboItem | void) ?? {
      // default created item if onCreate doesn't return one
      value: slugify(trimmed) || trimmed,
      label: trimmed,
    };

    // select created item
    if (!isControlled) {
      // we can't mutate `items` here since it's external;
      // but we can still select by value if parent adds it.
      setInternalValue(created.value);
    }
    onChange?.(created.value, created);
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setQuery("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          id={id}
          ref={triggerRef}
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full justify-between", className)}
        >
          <span
            className={cn("truncate", !selectedItem && "text-muted-foreground")}
          >
            {selectedItem ? selectedItem.label : placeholder}
          </span>
          <span className="ml-2 flex items-center gap-1">
            {clearable && selectedItem && (
              <X
                className="h-4 w-4 opacity-60 hover:opacity-100"
                onClick={handleClear}
              />
            )}
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className={cn("p-0", contentClassName)}
        style={
          matchTriggerWidth && contentWidth
            ? { width: contentWidth }
            : undefined
        }
      >
        <Command>
          <CommandInput
            placeholder={inputPlaceholder}
            value={query}
            onValueChange={setQuery}
            className="h-9 placeholder:text-sm focus:outline-none focus:ring-0 focus-visible:ring-0"
          />
          <CommandList>
            {/* Built-in filter uses CommandItem.value (we pass label) */}
            <CommandEmpty>{showCreate ? null : emptyMessage}</CommandEmpty>

            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label} // search matches label only
                  onSelect={() => {
                    const next =
                      item.value === currentValue ? null : item.value;
                    setValue(next);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  {item.icon ? <span className="mr-2">{item.icon}</span> : null}
                  <span className="truncate">{item.label}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentValue === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}

              {showCreate && (
                <CommandItem
                  key="__create__"
                  value={trimmed}
                  onSelect={handleCreate}
                  className="cursor-pointer"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {createPrefix} “{trimmed}”
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default Combobox;
