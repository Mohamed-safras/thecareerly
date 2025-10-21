"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Grid2x2, List, RefreshCw, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import CategoryPill from "./category-pill";
import StatusPill from "./status-pill";
import LocationPill from "./location-pill";
import AdvanceFilterPill from "./advance-filter-pill";
import { useFetchJobs } from "@/hooks/useFetchJobs";

export default function JobFiltersBar() {
  const { refresh } = useFetchJobs();

  // state (example values; replace as needed)
  const [categories, setCategories] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState<string>("all");
  const [location, setLocation] = React.useState<string>("all");
  const [view, setView] = React.useState<"grid" | "list">("grid");

  const allCategories = ["Engineering", "Design", "Product", "QA", "DevOps"];
  const allStatuses = [
    { id: "all", label: "All Status" },
    { id: "OPEN", label: "Open" },
    { id: "HOLD", label: "Hold" },
    { id: "CLOSED", label: "Closed" },
  ];
  const allLocations = [
    { id: "all", label: "All Location" },
    { id: "onsite", label: "On-site" },
    { id: "hybrid", label: "Hybrid" },
    { id: "remote", label: "Remote" },
  ];

  return (
    <div className="w-full rounded-xl border p-2 backdrop-blur supports-[backdrop-filter]:bg-background/40 mb-4">
      <div className="flex items-start justify-between gap-2 flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center rounded border bg-muted/50 p-0.5">
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
          </div>

          <div className="inline-flex items-center rounded border bg-muted/50 p-0.5">
            <StatusPill
              label={
                allStatuses.find((s) => s.id === status)?.label ?? "All Status"
              }
              items={allStatuses}
              value={status}
              onChange={setStatus}
            />
          </div>

          <div className="inline-flex items-center rounded border bg-muted/50 p-0.5">
            <LocationPill
              label={
                allLocations.find((l) => l.id === location)?.label ??
                "All Location"
              }
              items={allLocations}
              value={location}
              onChange={setLocation}
            />
          </div>

          <div className="inline-flex items-center rounded border bg-muted/50 p-0.5">
            <AdvanceFilterPill />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center rounded border bg-muted/50 p-0.5">
            <Button
              variant="secondary"
              className="h-8 px-4 border-0 rounded-lg transition-colors dark:bg-transparent opacity-70 hover:opacity-100 dark:hover:bg-background/50"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              General Setting
            </Button>
          </div>

          <div className="inline-flex items-center rounded border bg-muted/50 p-0.5">
            <Button
              variant="secondary"
              onClick={() => setView("grid")}
              className={cn(
                "inline-flex h-8 items-center gap-2 rounded px-3 text-sm transition",
                view === "grid"
                  ? "bg-secondary dark:bg-primary border shadow-sm"
                  : "bg-transparent opacity-70 hover:opacity-100 hover:bg-background/50"
              )}
            >
              <Grid2x2 className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              onClick={() => setView("list")}
              className={cn(
                "inline-flex h-8 items-center gap-2 rounded px-3 text-sm transition",
                view === "list"
                  ? "bg-secondary dark:bg-primary border shadow-sm"
                  : "bg-transparent opacity-70 hover:opacity-100 hover:bg-background/50"
              )}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <div className="inline-flex items-center rounded border bg-muted/50 p-0.5">
            <Button
              variant="secondary"
              onClick={refresh}
              className="h-8 px-4 rounded-lg transition-colors bg-transparent opacity-70 hover:opacity-100 hover:bg-background/50"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
