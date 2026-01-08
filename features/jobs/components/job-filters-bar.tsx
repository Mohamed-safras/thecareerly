"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Grid2x2, List, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import CategoryPill from "./category-pill";
import StatusPill from "./status-pill";
import LocationPill from "./location-pill";
import AdvanceFilterPill from "./advance-filter-pill";
import { useFetchJobs } from "@/hooks/useFetchJobs";
import SearchBar from "@/components/search-bar";

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
    <div className="flex flex-col gap-4 w-full bg-card p-3 rounded-lg border">
      {/* Top Row: Search and Mobile Actions */}
      <div className="flex flex-col md:flex-row gap-3 w-full items-center">
        <div className="w-full md:flex-1">
          <SearchBar searchQuery="" setSearchQuery={() => {}} />
        </div>

        {/* Refresh & Advanced (Visible on all, grouped on mobile) */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* View Switcher: Right-aligned on desktop, full-width on mobile */}
          <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-md self-end lg:self-auto">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "inline-flex h-8 items-center gap-2 rounded px-3 text-sm transition",
                view === "grid"
                  ? "bg-background border shadow-sm"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <Grid2x2 className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "inline-flex h-8 items-center gap-2 rounded px-3 text-sm transition",
                view === "list"
                  ? "bg-background border shadow-sm"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
          {/* <Button
            variant="outline"
            size="icon"
            onClick={refresh}
            className="shrink-0"
          >
            <RefreshCw className="h-4 w-4" />
          </Button> */}
        </div>
      </div>

      <hr className="md:hidden opacity-50" />

      {/* Bottom Row: Filters and View Toggle */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        {/* Filter Pills Group: Scrollable on mobile, wrapped on desktop */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
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
            label={allStatuses.find((s) => s.id === status)?.label ?? "Status"}
            items={allStatuses}
            value={status}
            onChange={setStatus}
          />
          <LocationPill
            label={
              allLocations.find((l) => l.id === location)?.label ?? "Location"
            }
            items={allLocations}
            value={location}
            onChange={setLocation}
          />
          <AdvanceFilterPill />
        </div>
      </div>
    </div>
  );
}
