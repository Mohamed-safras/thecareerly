"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  stageOptions,
  departmentOptions,
  sourceOptions,
} from "../data/mock-data";

interface CandidateFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  stageFilter: string;
  setStageFilter: (stage: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (dept: string) => void;
  sourceFilter: string;
  setSourceFilter: (source: string) => void;
  activeFiltersCount: number;
  clearFilters: () => void;
}

export const CandidateFilters = ({
  searchQuery,
  setSearchQuery,
  stageFilter,
  setStageFilter,
  departmentFilter,
  setDepartmentFilter,
  sourceFilter,
  setSourceFilter,
  activeFiltersCount,
  clearFilters,
}: CandidateFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, role, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Stage Filter */}
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            {stageOptions.map((stage) => (
              <SelectItem key={stage} value={stage}>
                {stage}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Department Filter */}
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            {departmentOptions.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Source Filter */}
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            {sourceOptions.map((source) => (
              <SelectItem key={source} value={source}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {stageFilter !== "All Stages" && (
            <Badge variant="secondary" className="gap-1">
              Stage: {stageFilter}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setStageFilter("All Stages")}
              />
            </Badge>
          )}
          {departmentFilter !== "All Departments" && (
            <Badge variant="secondary" className="gap-1">
              Dept: {departmentFilter}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setDepartmentFilter("All Departments")}
              />
            </Badge>
          )}
          {sourceFilter !== "All Sources" && (
            <Badge variant="secondary" className="gap-1">
              Source: {sourceFilter}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSourceFilter("All Sources")}
              />
            </Badge>
          )}
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchQuery}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSearchQuery("")}
              />
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-destructive hover:text-destructive"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};
