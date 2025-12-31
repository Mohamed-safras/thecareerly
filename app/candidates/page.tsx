"use client";
import { useState, useMemo, useEffect } from "react";
import { Plus, Download, Upload, List, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CandidateFilters } from "@/features/candidates/components/candidate-filters";
import { CandidateDetailDrawer } from "@/app/candidates/candidate-detail-drawer";
import { candidatesFullData } from "@/features/candidates/data/mock-data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KanbanBoard } from "@/features/candidates/components/kanban/kanban-board";
import ResponsiveTable from "@/components/responsive-table";

import { Candidate } from "@/interfaces/candidate";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { createCandidateColumns } from "./candidate-columns";
import { useSidebar } from "@/components/ui/sidebar";
import { TablePagination } from "@/components/table-pagination";

const Candidates = () => {
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [allCandidates, setAllCandidates] =
    useState<Candidate[]>(candidatesFullData);
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("All Stages");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
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

  const [isUserPopUpOpen, setIsUserPopUpOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Candidate | null>(null);

  const handleViewProfileClick = (user: Candidate): void => {
    setSelectedUser(user);
    setIsUserPopUpOpen(true);
  };

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(
    () => createCandidateColumns(handleViewProfileClick, handleViewDetails),
    []
  );

  const table = useReactTable<Candidate>({
    data: filteredCandidates,
    columns,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    initialState: { pagination: { pageSize: 10 } },
  });

  const [window, setWindow] = useState("");

  const sidebar = useSidebar();
  useEffect(() => {
    console.log("side bar open", sidebar.open);
    setWindow(sidebar.open ? "w-[calc(100vw-330px)]" : "w-[calc(100vw-100px)]");
  }, [sidebar]);

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="px-4 py-6 space-y-3">
        {/* Page Header */}
        {/* <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              Candidates
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all candidates in your hiring pipeline
            </p>
          </div>
        </div> */}
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
        </div>

        {/* Stats */}
        {/* <CandidatesStats /> */}

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
                const updatedIds = new Set(updated.map((c) => c.id));
                const unchanged = prev.filter((c) => !updatedIds.has(c.id));
                return [...unchanged, ...updated];
              });
            }}
          />
        ) : (
          /* Table View */
          <>
            <ResponsiveTable
              table={table}
              columns={columns}
              flexRender={flexRender}
              Table={Table}
              TableHeader={TableHeader}
              TableRow={TableRow}
              TableHead={TableHead}
              TableBody={TableBody}
              TableCell={TableCell}
              windowClassName={window}
            />

            <TablePagination table={table} />
          </>
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
    </div>
  );
};

export default Candidates;
