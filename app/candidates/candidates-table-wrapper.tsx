import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ResponsiveTable from "@/components/responsive-table";
import { TablePagination } from "@/components/table-pagination";
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
import { Candidate } from "@/interfaces/candidate";
import { createCandidateColumns } from "@/features/candidates/components/candidate-columns";
import { useSidebar } from "@/components/ui/sidebar";

export interface CandidatesTableWrapperProps {
  candidates: Candidate[];
  handleViewDetails: (candidate: Candidate) => void;
}

const CandidatesTableWrapper: React.FC<CandidatesTableWrapperProps> = ({
  candidates,
  handleViewDetails,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(
    () => createCandidateColumns(handleViewDetails),
    [handleViewDetails]
  );

  const table = useReactTable<Candidate>({
    data: candidates,
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
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default CandidatesTableWrapper;
