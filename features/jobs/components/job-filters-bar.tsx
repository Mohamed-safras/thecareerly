// app/components/job-filters-bar.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  LayoutGrid,
  Activity,
  List,
  Settings2,
  Shapes,
  FunnelX,
  MapPinHouse,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";

export default function JobFiltersBar() {
  // state (example values; replace as needed)
  const [categories, setCategories] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState<string>("all");
  const [location, setLocation] = React.useState<string>("all");
  const [view, setView] = React.useState<"grid" | "list">("grid");

  const allCategories = ["Engineering", "Design", "Product", "QA", "DevOps"];
  const allStatuses = [
    { id: "all", label: "All Status" },
    { id: "open", label: "Open" },
    { id: "hold", label: "Hold" },
    { id: "closed", label: "Closed" },
  ];
  const allLocations = [
    { id: "all", label: "All Location" },
    { id: "onsite", label: "On-site" },
    { id: "hybrid", label: "Hybrid" },
    { id: "remote", label: "Remote" },
  ];
  console.log(categories);
  return (
    <div className="w-full rounded-xl border p-2 backdrop-blur supports-[backdrop-filter]:bg-background/40 mb-4">
      <div className="flex items-start justify-between gap-2 flex-col lg:flex-row lg:items-center lg:justify-between">
        {/* left: pill filters */}
        <div className="flex flex-wrap items-center gap-2">
          <CategoryPill
            label={
              categories.length
                ? `${categories.length} Selected`
                : "All Categories"
            }
            items={allCategories}
            value={categories}
            onChange={(next) => setCategories(next)}
          />

          <StatusPill
            label={
              allStatuses.find((s) => s.id === status)?.label ?? "All Status"
            }
            items={allStatuses}
            value={status}
            onChange={setStatus}
          />

          <LocationPill
            label={
              allLocations.find((l) => l.id === location)?.label ??
              "All Location"
            }
            items={allLocations}
            value={location}
            onChange={setLocation}
          />

          <AdvanceFilterPill />
        </div>

        {/* right: settings + view toggle */}
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="h-8 rounded px-3">
            <Settings2 className="mr-2 h-4 w-4" />
            General Setting
          </Button>

          <Separator orientation="vertical" className="h-6 " />

          <div className="inline-flex items-center rounded border bg-muted/50 p-0.5">
            <button
              type="button"
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
              className={cn(
                "inline-flex h-8 items-center gap-2 rounded px-3 text-sm transition",
                view === "grid"
                  ? "bg-background shadow-sm"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
              className={cn(
                "inline-flex h-8 items-center gap-2 rounded px-3 text-sm transition",
                view === "list"
                  ? "bg-background shadow-sm"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Pills ---------- */

function PillButton({
  icon: Icon,
  label,
  className,
  children,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className={cn(
            "h-8 rounded px-3 text-sm shadow-none",
            "bg-muted/60 hover:bg-muted",
            className
          )}
        >
          <Icon className="mr-2 h-4 w-4" />
          {label}
          <ChevronDown className="ml-2 h-3.5 w-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={8} className="w-56">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CategoryPill({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: string[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (item: string) =>
    value.includes(item)
      ? onChange(value.filter((v) => v !== item))
      : onChange([...value, item]);

  return (
    <PillButton icon={Shapes} label={label}>
      <DropdownMenuLabel>Categories</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {items.map((item, idx) => (
        <DropdownMenuCheckboxItem
          key={item + idx}
          checked={value.includes(item)}
          onCheckedChange={() => toggle(item)}
        >
          {item}
        </DropdownMenuCheckboxItem>
      ))}
    </PillButton>
  );
}

function StatusPill({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <PillButton icon={Activity} label={label}>
      <DropdownMenuLabel>Status</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
        {items.map((s) => (
          <DropdownMenuRadioItem key={s.id} value={s.id}>
            {s.label}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </PillButton>
  );
}

function LocationPill({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <PillButton icon={MapPinHouse} label={label}>
      <DropdownMenuLabel>Location</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
        {items.map((l) => (
          <DropdownMenuRadioItem key={l.id} value={l.id}>
            {l.label}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </PillButton>
  );
}

function AdvanceFilterPill() {
  const [remoteOnly, setRemoteOnly] = React.useState(false);
  const [fullTime, setFullTime] = React.useState(false);
  const [withReferral, setWithReferral] = React.useState(false);

  return (
    <PillButton icon={FunnelX} label="Advance Filter">
      <DropdownMenuLabel>Advance Filter</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem
        checked={remoteOnly}
        onCheckedChange={(v) => setRemoteOnly(Boolean(v))}
      >
        Remote only
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={fullTime}
        onCheckedChange={(v) => setFullTime(Boolean(v))}
      >
        Full-time
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={withReferral}
        onCheckedChange={(v) => setWithReferral(Boolean(v))}
      >
        Has referral
      </DropdownMenuCheckboxItem>
      <DropdownMenuSeparator />
      <div className="px-2 pb-1">
        <Button size="sm" className="h-8 w-full">
          Apply filters
        </Button>
      </div>
    </PillButton>
  );
}
