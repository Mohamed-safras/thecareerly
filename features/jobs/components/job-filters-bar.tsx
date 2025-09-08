"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { LayoutGrid, List, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import CategoryPill from "./category-pill";
import StatusPill from "./status-pill";
import LocationPill from "./location-pill";
import AdvanceFilterPill from "./advance-filter-pill";

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
