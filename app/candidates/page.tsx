"use client";
import React, { useState, useMemo } from "react";
import { List, LayoutGrid } from "lucide-react";

import { CandidateFilters } from "@/features/candidates/components/candidate-filters";
import { CandidateDetailDrawer } from "@/app/candidates/candidate-detail-drawer";
import { candidatesFullData } from "@/features/candidates/data/mock-data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KanbanBoard } from "@/features/candidates/components/kanban/kanban-board";
import { Candidate } from "@/interfaces/candidate";
import CandidatesTableWrapper from "./candidates-table-wrapper";

const Candidates = () => {
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [allCandidates, setAllCandidates] =
    useState<Candidate[]>(candidatesFullData);
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("All Stages");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [detailCandidate, setDetailCandidate] = useState<Candidate | null>(
    null
  );

  const filteredCandidates = useMemo(() => {
    return allCandidates.filter((candidate) => {
      const matchesSearch =
        searchQuery === "" ||
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesStage =
        stageFilter === "All Stages" || candidate.stage === stageFilter;

      const matchesDepartment =
        departmentFilter === "All Departments" ||
        candidate.department === departmentFilter;

      const matchesSource =
        sourceFilter === "All Sources" || candidate.source === sourceFilter;

      return (
        matchesSearch && matchesStage && matchesDepartment && matchesSource
      );
    });
  }, [searchQuery, stageFilter, departmentFilter, sourceFilter, allCandidates]);

  const activeFiltersCount = [
    stageFilter !== "All Stages",
    departmentFilter !== "All Departments",
    sourceFilter !== "All Sources",
    searchQuery !== "",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearchQuery("");
    setStageFilter("All Stages");
    setDepartmentFilter("All Departments");
    setSourceFilter("All Sources");
  };

  const handleViewDetails = (candidate: Candidate) => {
    setDetailCandidate(candidate);
    setIsDrawerOpen(true);
  };

  return (
    <React.Fragment>
      {/* Main Content */}
      <div className="px-4 py-6 space-y-3">
        <div className="flex justify-end items-center gap-2">
          <div className="flex items-center gap-2">
            <Tabs
              value={viewMode}
              onValueChange={(v) => setViewMode(v as "table" | "kanban")}
            >
              <TabsList className="bg-muted/50">
                <TabsTrigger value="table" className="gap-2">
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">Table</span>
                </TabsTrigger>
                <TabsTrigger value="kanban" className="gap-2">
                  <LayoutGrid className="h-4 w-4" />
                  <span className="hidden sm:inline">Kanban</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-lg border bg-card p-3">
          <CandidateFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            stageFilter={stageFilter}
            setStageFilter={setStageFilter}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            sourceFilter={sourceFilter}
            setSourceFilter={setSourceFilter}
            activeFiltersCount={activeFiltersCount}
            clearFilters={clearFilters}
          />
        </div>

        {viewMode === "kanban" ? (
          <KanbanBoard
            candidates={filteredCandidates}
            onCandidatesChange={(updated) => {
              setAllCandidates((prev) => {
                const updatedIds = new Set(
                  updated.map((candidate) => candidate.id)
                );
                const unchanged = prev.filter(
                  (candidate) => !updatedIds.has(candidate.id)
                );
                return [...unchanged, ...updated];
              });
            }}
          />
        ) : (
          /* Table View */
          <CandidatesTableWrapper
            candidates={filteredCandidates}
            handleViewDetails={handleViewDetails}
          />
        )}
      </div>

      {/* Candidate Detail Drawer */}
      {viewMode === "table" && (
        <CandidateDetailDrawer
          candidate={detailCandidate}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
    </React.Fragment>
  );
};

export default Candidates;
