"use client";
import { useState, useMemo } from "react";
import { Plus, Download, Upload, Users, List, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CandidateFilters } from "@/features/candidates/components/candidate-filters";
import { CandidateTableRow } from "@/features/candidates/components/candidate-table-row";
import { CandidateDetailDrawer } from "@/app/candidates/candidate-detail-drawer";
import {
  candidatesFullData,
  Candidate,
} from "@/features/candidates/data/mock-data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KanbanBoard } from "@/features/candidates/components/kanban/kanban-board";

const Candidates = () => {
  const [viewMode, setViewMode] = useState<"table" | "kanban">("kanban");
  const [allCandidates, setAllCandidates] =
    useState<Candidate[]>(candidatesFullData);
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("All Stages");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [detailCandidate, setDetailCandidate] = useState<Candidate | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
  }, [searchQuery, stageFilter, departmentFilter, sourceFilter]);

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

  const handleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates.map((c) => c.id));
    }
  };

  const handleSelectCandidate = (id: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  const handleViewDetails = (candidate: Candidate) => {
    setDetailCandidate(candidate);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="container px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              Candidates
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all candidates in your hiring pipeline
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Candidate
            </Button>

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
        </div>

        {/* Stats */}
        {/* <CandidatesStats /> */}

        {/* Filters */}
        <div className="rounded-lg border bg-card p-4">
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
                const updatedIds = new Set(updated.map((c) => c.id));
                const unchanged = prev.filter((c) => !updatedIds.has(c.id));
                return [...unchanged, ...updated];
              });
            }}
          />
        ) : (
          /* Table View */
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Showing {filteredCandidates.length} candidates
                </span>
                {selectedCandidates.length > 0 && (
                  <span className="text-sm font-medium text-primary">
                    ({selectedCandidates.length} selected)
                  </span>
                )}
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedCandidates.length ===
                          filteredCandidates.length &&
                        filteredCandidates.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Match</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <CandidateTableRow
                    key={candidate.id}
                    candidate={candidate}
                    isSelected={selectedCandidates.includes(candidate.id)}
                    onSelect={handleSelectCandidate}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </TableBody>
            </Table>

            {filteredCandidates.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">
                  No candidates found matching your filters
                </p>
                <Button variant="link" onClick={clearFilters}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Candidate Detail Drawer */}
      {viewMode === "table" && (
        <CandidateDetailDrawer
          candidate={detailCandidate}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
    </div>
  );
};

export default Candidates;
