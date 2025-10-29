"use client";
import {
  ColumnDef,
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
import { useSidebar } from "@/components/ui/sidebar"; // If you have a sidebar context
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  ArrowUpDown,
  ChevronDown,
  CircleAlert,
  CloudUpload,
  Copy,
  Filter,
  KeyRound,
  MoreHorizontal,
  PlusCircle,
  Trash2,
  User,
  UserPen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const data: User[] = [
  {
    id: "3u1reuv4",
    name: "Abe",
    email: "abe45@asentic.com",
    dateAdded: "July 20, 2023",
    lastActive: "5 minutes ago",
    role: ["member"],
    avatarUrl:
      "https://images.unsplash.com/photo-1660716040448-6215916d87be?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
  },
  {
    id: "derv1ws0",
    name: "Monserrat",
    email: "Monserrat44@asentic.com",
    dateAdded: "July 20, 2023",
    lastActive: "2 hours ago",
    role: ["member"],
    avatarUrl:
      "https://images.unsplash.com/photo-1681084421455-ccdb9478d802?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
  },
  {
    id: "5kma53ae",
    name: "Silas",
    email: "Silas22@asentic.com",
    dateAdded: "July 20, 2023",
    lastActive: "1 hour ago",
    role: ["team admin"],
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=388",
  },
  {
    id: "bhqecj4p",
    name: "Carmella",
    email: "carmella@asentic.com",
    dateAdded: "July 20, 2023",
    lastActive: "2 hours ago",
    role: ["member"],
    avatarUrl:
      "https://images.unsplash.com/photo-1629250628267-eb97d724f11e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
  },
  {
    id: "bhqecj3p",
    name: "Josha",
    email: "josha@asentic.com",
    dateAdded: "July 20, 2023",
    lastActive: "2 hours ago",
    role: ["super admin"],
    avatarUrl:
      "https://images.unsplash.com/photo-1720501828093-c792c10e3f0b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=573",
  },

  {
    id: "bhqecj3p",
    name: "Cammill",
    email: "cammill@asentic.com",
    dateAdded: "July 20, 2023",
    lastActive: "2 hours ago",
    role: ["member"],
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1663047504447-d54e624ef2d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
  },
  {
    id: "bhqecj3p",
    name: "Calcia",
    email: "calcia@asentic.com",
    dateAdded: "July 20, 2023",
    lastActive: "2 hours ago",
    role: ["member"],
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1690397038570-7ec0cacb37f2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
  },
  {
    id: "bh1ecj42",
    name: "Elli",
    email: "elli@asentic.com",
    dateAdded: "July 20, 2023",
    lastActive: "2 hours ago",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=461",
    role: ["member"],
  },
  {
    id: "bhqec23p",
    name: "Williams",
    email: "williams@asentic.com",
    dateAdded: "July 20, 2023",
    lastActive: "2 hours ago",
    role: ["member"],
    avatarUrl:
      "https://images.unsplash.com/photo-1663550910415-9e7fc1f7eb2b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
  {
    id: "bh12cj4c",
    name: "John Doe",
    email: "john@asentic.com",
    dateAdded: "July 20, 2023",
    lastActive: "2 hours ago",
    role: ["member"],
    avatarUrl:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: "bh12aj4p",
    name: "Sarah",
    email: "sarah@asentic.com",
    dateAdded: "July 20, 2023",
    lastActive: "2 hours ago",
    role: ["team admin"],
    avatarUrl:
      "https://images.unsplash.com/flagged/photo-1564430002610-40d4f8826bff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
  {
    id: "bh22aj4p",
    name: "Ann",
    email: "ann@asentic.com",
    dateAdded: "July 20, 2023",
    lastActive: "2 hours ago",
    role: ["team admin", "member", "super admin"],
    avatarUrl:
      "https://images.unsplash.com/photo-1659982821258-f55151f18790?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  },
];

export type User = {
  id: string;
  name: string;
  avatarUrl?: string;
  dateAdded: string;
  lastActive?: string;
  role: string[];
  email: string;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <div>User name</div>,
    cell: ({ row }) => {
      const name = row.original.name;
      const avatarUrl = row.original.avatarUrl;
      const email = row.original.email;
      const roles = row.original.role;
      const lastActive = row.original.lastActive;
      const dateAdded = row.original.dateAdded;

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 rounded-full">
                {avatarUrl ? (
                  <AvatarImage
                    src={avatarUrl}
                    alt={name || "User Avatar"}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="rounded-full">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="cursor-pointer">{name}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent
            className="min-w-[220px] bg-background border text-foreground"
            side="top"
            background="background"
          >
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-10 w-10 rounded-full">
                {avatarUrl ? (
                  <AvatarImage
                    src={avatarUrl}
                    alt={name || "User Avatar"}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="rounded-full">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-lg font-semibold">{name}</div>
                <div className="text-sm text-muted-foreground">{email}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-1">
              {roles.map((role) => (
                <Badge key={role} variant="default" className="capitalize">
                  {role}
                </Badge>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              Last active: {lastActive}
            </div>
            <div className="text-xs text-muted-foreground">
              Added: {dateAdded}
            </div>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Email</span> <ArrowUpDown className="w-4 h-4" />
        </div>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const roles = row.getValue("role") as string[];
      return (
        <div className="flex gap-1">
          {roles.map((role) => (
            <Badge variant="outline" key={role} className="capitalize">
              {role}
            </Badge>
          ))}
        </div>
      );
    },
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue || filterValue.length === 0) return true;
      const values = row.getValue(columnId) as string[];
      return filterValue.some((filter) =>
        values
          .map((value) => value.toLowerCase())
          .includes(filter.toLowerCase())
      );
    },
  },
  {
    accessorKey: "lastActive",
    header: () => <div className="text-right">Last Active</div>,
    cell: ({ row }) => {
      const lastActive = row.getValue("lastActive") as string;

      return <div className="text-right">{lastActive}</div>;
    },
  },

  {
    accessorKey: "dateAdded",
    header: () => <div className="text-right">Date added</div>,
    cell: ({ row }) => {
      const dateAdded = row.getValue("dateAdded") as string;

      return <div className="text-right">{dateAdded}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.email)}
            >
              <Copy className="w-4 h-4" />
              <span>Copy Email</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4" />
              <span>View profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserPen className="w-4 h-4" />
              <span>Edit details</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <KeyRound className="w-4 h-4" />
              <span>Change Permission</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CloudUpload className="w-4 h-4" />
              <span> Export details</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              <span>Delete user</span>
              <span className="ml-auto flex">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <CircleAlert className="w-4 h-4 text-destructive cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-destructive text-destructive-foreground border-destructive"
                    side="bottom"
                    background="destructive"
                  >
                    <span>This will permanently delete the user.</span>
                  </TooltipContent>
                </Tooltip>
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function UserTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // 1. Use a single state for the combined filter value
  const [globalFilter, setGlobalFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState<string[]>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { open } = useSidebar();

  const uniqueAccessTags = Array.from(
    new Set(
      data.flatMap((user) =>
        user.role.map(
          (tag) =>
            `${tag.slice(0, 1).toLocaleUpperCase()}${tag
              .slice(1)
              .toLocaleLowerCase()}`
        )
      )
    )
  ).sort((a, b) => a.localeCompare(b));

  const table = useReactTable({
    data,
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setGlobalFilter(value);
  };

  useEffect(() => {
    table.getColumn("role")?.setFilterValue(roleFilter);
  }, [roleFilter, table]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center py-4 gap-2 md:gap-0">
        <Input
          placeholder="Search by name or email..."
          value={globalFilter ?? ""}
          onChange={handleSearchChange}
          className="max-w-full md:max-w-sm mr-2"
        />
        <div className="flex flex-row gap-2 md:ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-muted-foreground ml-auto"
              >
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-muted-foreground ml-2">
                <Filter /> Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {uniqueAccessTags.map((tag) => (
                <DropdownMenuCheckboxItem
                  key={tag}
                  checked={roleFilter.includes(tag)}
                  onCheckedChange={(checked) => {
                    setRoleFilter((prev) =>
                      checked ? [...prev, tag] : prev.filter((t) => t !== tag)
                    );
                  }}
                >
                  {tag}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => setRoleFilter([])}
              >
                Clear Filter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="ml-2">
            <PlusCircle /> Add User
          </Button>
        </div>
      </div>

      <div
        className={`w-full overflow-x-auto rounded-md border ${
          open
            ? "md:max-w-[calc(100vw-305px)] lg:max-w-[calc(100vw-300px)]"
            : ""
        }`}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
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

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
