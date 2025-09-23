// components/typeahead-location.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { AlertCircle, Loader2, MapPin, Search } from "lucide-react";
import axios from "axios";
import { useAutoSearch } from "@/hooks/use-auto-search";
import { mapNominatim } from "@/lib/geo/place";
import { Place } from "@/types/place";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { useSelector } from "react-redux";
import { selectFormFieldError } from "@/store/form-errors/form-error-selectors";
import { FORM_ID } from "@/constents/job-form";
import { useAppDispatch } from "@/store/hooks";
import { setFieldError } from "@/store/slice/form-error-slice";

const nominatim = axios.create({
  baseURL: "https://nominatim.openstreetmap.org",
  headers: { Accept: "application/json" },
  timeout: 20000,
});

export interface TypeAheadLocationProps {
  value?: string;
  onChange: (v: string) => void;
  onSelect?: (v: string) => void;
  minChars?: number;
  fieldError: string;
}

export default function TypeaheadLocation({
  value = "",
  onChange,
  onSelect,
  minChars = 3,
  fieldError,
}: TypeAheadLocationProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { loading, results, error } = useAutoSearch<Place>({
    client: nominatim,
    path: "/search",
    query: value,
    buildParams: (q) => ({ format: "jsonv2", q, limit: 8 }),
    mapper: mapNominatim,
    minChars,
    debounceMs: 200,
    enabled: true,
  });

  // Open/close based on focus + results/loading + minChars
  useEffect(() => {
    const hasQuery = value.trim().length >= minChars;
    const shouldOpen = focused && hasQuery && (loading || results.length > 0);
    setOpen(shouldOpen);
  }, [focused, value, minChars, loading, results.length]);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div ref={wrapperRef} className="space-y-1.5">
      <Label htmlFor="location">Location</Label>

      <div className={`relative`}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60 pointer-events-none" />
        <Input
          id="location"
          placeholder="Type a city, area, address…"
          className="pl-9"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            // do nothing here; outside-click handler manages closing
            // (prevents flicker while clicking items)
          }}
          autoComplete="off"
        />

        {open && (
          <div
            className="absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md"
            // keep input focused while interacting with the panel
            onMouseDown={(e) => e.preventDefault()}
          >
            <Command shouldFilter={false}>
              <CommandList>
                {loading && (
                  <div className="px-3 py-2 text-sm flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Searching…
                  </div>
                )}
                {!loading && !results.length && (
                  <CommandEmpty>
                    {error ? "Search failed." : "No results."}
                  </CommandEmpty>
                )}
                <CommandGroup heading="Suggestions">
                  {results.map((p) => (
                    <CommandItem
                      key={p.place_id}
                      value={p.display_name}
                      onSelect={(val) => {
                        onChange(val);
                        onSelect?.(val);
                        setOpen(false);
                      }}
                    >
                      <MapPin className="mr-2 h-4 w-4 opacity-70" />
                      <span className="truncate">{p.display_name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
      {fieldError && (
        <Alert variant="destructive" className="h-fit text-sm p-2">
          <AlertCircle className="h-4 w-4" />

          <AlertDescription>{fieldError}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
