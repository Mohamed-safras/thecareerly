// components/typeahead-location.tsx
"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Loader2, MapPin, Search } from "lucide-react";
import axios from "axios";
import { useAutoSearch } from "@/hooks/use-auto-search";
import { mapNominatim } from "@/lib/geo/place";
import { Place } from "@/types/place";

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
}

export default function TypeaheadLocation({
  value = "",
  onChange,
  onSelect,
  minChars = 3,
}: TypeAheadLocationProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { loading, results, error } = useAutoSearch<Place>({
    client: nominatim,
    path: "/search",
    query: value,
    buildParams: (q) => ({ format: "jsonv2", q, limit: 8 }),
    mapper: mapNominatim,
    minChars,
    debounceMs: 250,
    enabled: true,
  });

  return (
    <div ref={wrapperRef} className="space-y-2">
      <label htmlFor="location" className="text-sm font-medium">
        Location
      </label>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60 pointer-events-none" />
        <Input
          id="location"
          placeholder="Type a city, area, address…"
          className="pl-9"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => results.length && setOpen(true)}
          autoComplete="off"
        />

        {open && (
          <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
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
    </div>
  );
}
