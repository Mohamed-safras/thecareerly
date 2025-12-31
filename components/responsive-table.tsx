import React from "react";
import {
  ColumnDef,
  Table as ReactTable,
  Renderable,
} from "@tanstack/react-table";

interface ResponsiveTableProps<TData> {
  table: ReactTable<TData>;
  columns: ColumnDef<TData>[];
  flexRender<TProps extends object>(
    Comp: Renderable<TProps>,
    props: TProps
  ): React.ReactNode | React.JSX.Element;
  Table: React.ElementType;
  TableHeader: React.ElementType;
  TableRow: React.ElementType;
  TableHead: React.ElementType;
  TableBody: React.ElementType;
  TableCell: React.ElementType;
  windowClassName?: string;
}

function ResponsiveTable<TData>({
  table,
  columns,
  flexRender,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  windowClassName = "",
}: ResponsiveTableProps<TData>) {
  return (
    <div className="rounded-lg border overflow-x-auto bg-background w-full">
      <div className="inline-block align-middle">
        <Table className={`${windowClassName} text-sm`}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows && table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ResponsiveTable;
