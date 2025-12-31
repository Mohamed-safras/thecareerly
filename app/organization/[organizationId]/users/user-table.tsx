"use client";
// src/features/users/components/UserTable.tsx

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
  Table as ReactTableInstance,
} from "@tanstack/react-table";
import { ChevronDown, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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

import { useEffect, useState, useMemo, ChangeEvent } from "react";
import { UserProfile } from "@/types/user-profile";
import AddUser from "@/features/users/components/create-user";
import UserProfileDialog from "@/features/users/components/user-popup";
import { createColumns } from "./user-columns";
import { DialogFooter } from "@/components/ui/dialog";
import { UserInfoCard } from "@/features/users/components/user-activity";
import EditUserForm from "@/features/users/components/edit-user";
import React from "react";
import RolePermissionManager from "@/features/users/components/role-permission-manager";
import { useSidebar } from "@/components/ui/sidebar";
import ResponsiveTable from "@/components/responsive-table";
import { TablePagination } from "@/components/table-pagination";

// --- Data and Components (Included for completeness) ---

const data: UserProfile[] = [
  {
    id: "3u1reuv4",
    name: "Abe",
    email: "abe45@asentic.com",
    lastUpdated: "July 20, 2023",
    lastActive: "5 minutes ago",
    roles: ["member"],
    avatar:
      "https://images.unsplash.com/photo-1660716040448-6215916d87be?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
    status: "ACTIVE",
    bio: "Senior Technical Recruiter at TalentHive with 5+ years of experience connecting top engineering talent with fast-growing startups and enterprise clients. Skilled in full-cycle recruitment, candidate experience management, and building data-driven hiring strategies. Passionate about helping companies scale their teams through a personalized, transparent hiring approach.",
  },
  {
    id: "derv1ws0",
    name: "Monserrat",
    email: "Monserrat44@asentic.com",
    lastUpdated: "July 20, 2023",
    lastActive: "2 hours ago",
    roles: ["member"],
    avatar:
      "https://images.unsplash.com/photo-1681084421455-ccdb9478d802?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
    status: "SUSPENDED",
  },
  {
    id: "5kma53ae",
    name: "Silas",
    email: "Silas22@asentic.com",
    lastUpdated: "July 20, 2023",
    lastActive: "1 hour ago",
    roles: ["team admin"],
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=388",
    status: "ACTIVE",
  },
  {
    id: "bhqecj4p",
    name: "Carmella",
    email: "carmella@asentic.com",
    lastUpdated: "July 20, 2023",
    lastActive: "2 hours ago",
    roles: ["member"],
    avatar:
      "https://images.unsplash.com/photo-1629250628267-eb97d724f11e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
    status: "INACTIVE",
  },
  {
    id: "bhqecj3p",
    name: "Josha",
    email: "josha@asentic.com",
    lastUpdated: "July 20, 2023",
    lastActive: "2 hours ago",
    roles: ["super admin"],
    avatar:
      "https://images.unsplash.com/photo-1720501828093-c792c10e3f0b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=573",
    status: "ACTIVE",
  },
  {
    id: "bhqecj3p",
    name: "Cammill",
    email: "cammill@asentic.com",
    lastUpdated: "July 20, 2023",
    lastActive: "2 hours ago",
    roles: ["member"],
    avatar:
      "https://plus.unsplash.com/premium_photo-1663047504447-d54e624ef2d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
    status: "PENDING",
  },
  {
    id: "bhqecj3p",
    name: "Calcia",
    email: "calcia@asentic.com",
    lastUpdated: "July 20, 2023",
    lastActive: "2 hours ago",
    roles: ["member"],
    avatar:
      "https://plus.unsplash.com/premium_photo-1690397038570-7ec0cacb37f2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
    status: "PENDING",
  },
  {
    id: "bh1ecj42",
    name: "Elli",
    email: "elli@asentic.com",
    lastUpdated: "July 20, 2023",
    lastActive: "2 hours ago",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=461",
    roles: ["member"],
    status: "PENDING",
  },
  {
    id: "bhqec23p",
    name: "Williams",
    email: "williams@asentic.com",
    lastUpdated: "July 20, 2023",
    lastActive: "2 hours ago",
    roles: ["member"],
    avatar:
      "https://images.unsplash.com/photo-1663550910415-9e7fc1f7eb2b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    status: "ACTIVE",
  },
  {
    id: "bh12cj4c",
    name: "John Doe",
    email: "john@asentic.com",
    lastUpdated: "July 20, 2023",
    lastActive: "2 hours ago",
    roles: ["member"],
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    status: "ACTIVE",
  },
  {
    id: "bh12aj4p",
    name: "Sarah",
    email: "sarah@asentic.com",
    lastUpdated: "July 20, 2023",
    lastActive: "2 hours ago",
    roles: ["team admin"],
    avatar:
      "https://images.unsplash.com/flagged/photo-1564430002610-40d4f8826bff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    status: "PENDING",
  },
  {
    id: "bh22aj4p",
    name: "Ann",
    email: "ann@asentic.com",
    lastUpdated: "July 20, 2023",
    lastActive: "2 hours ago",
    roles: ["team admin"],
    avatar:
      "https://images.unsplash.com/photo-1659982821258-f55151f18790?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    status: "INACTIVE",
  },
];

// --- UserTable Component ---

export function UserTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isUserPopUpOpen, setIsUserPopUpOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [editUser, setEditUser] = useState<boolean>(true);

  const handleSidebarClose = (): void => {
    setIsUserPopUpOpen(false);
    setSelectedUser(null);
  };

  const handleEditUser = (): void => setEditUser((prev) => !prev);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setGlobalFilter(event.target.value);
  };

  const handleViewProfileClick = (user: UserProfile): void => {
    setSelectedUser(user);
    setIsUserPopUpOpen(true);
  };

  const columns = useMemo(() => createColumns(handleViewProfileClick), []);

  const table = useReactTable<UserProfile>({
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

  useEffect(() => {
    table.getColumn("roles")?.setFilterValue(roleFilter);
  }, [roleFilter, table]);

  const uniqueAccessTags = Array.from(
    new Set(
      data.flatMap((user) =>
        (user.roles ?? []).map(
          (tag) =>
            `${tag.slice(0, 1).toUpperCase()}${tag.slice(1).toLowerCase()}`
        )
      )
    )
  ).sort((a, b) => a.localeCompare(b));

  const sidebar = useSidebar();
  const [window, setWindow] = useState("");
  useEffect(() => {
    console.log("side bar open", sidebar.open);
    setWindow(sidebar.open ? "w-[calc(100vw-330px)]" : "w-[calc(100vw-100px)]");
  }, [sidebar]);

  return (
    <div className="w-full">
      {/* Toolbar */}
      <TableToolbar
        globalFilter={globalFilter}
        onSearchChange={handleSearchChange}
        table={table}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        uniqueAccessTags={uniqueAccessTags}
      />

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

      {/* Pagination */}
      <TablePagination table={table} />

      {/* Sidebar Profile (No changes) */}
      {selectedUser && (
        <UserProfileDialog
          isOpen={isUserPopUpOpen}
          onClose={handleSidebarClose}
          user={selectedUser}
        >
          <div className="px-2 space-y-4 max-h-[250px] overflow-y-scroll no-scrollbar">
            {selectedUser.bio && (
              <p className="text-sm text-muted-foreground p-2 border rounded-lg">
                {selectedUser.bio.length > 120
                  ? `${selectedUser.bio.slice(0, 120)}...`
                  : selectedUser.bio}
              </p>
            )}
            <UserInfoCard user={selectedUser} />

            <EditUserForm user={selectedUser} isDisable={editUser} />
            <RolePermissionManager />
          </div>
          <DialogFooter className="py-3 px-2 flex-shrink-0 sm:justify-end">
            <Button
              variant="outline"
              className="bg-destructive/5 text-destructive border-destructive/5"
            >
              <Trash2 />
              Delete User
            </Button>
            <div className="flex justify-end w-full gap-3 flex-wrap">
              <Button
                type="button"
                variant="outline"
                onClick={handleSidebarClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleEditUser}
                className="font-semibold"
              >
                {!editUser ? "Save Changes" : "Update User"}
              </Button>
            </div>
          </DialogFooter>
        </UserProfileDialog>
      )}
    </div>
  );
}

// --- TableToolbar Component (Refined for responsiveness) ---

interface TableToolbarProps {
  globalFilter: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  table: ReactTableInstance<UserProfile>;
  roleFilter: string[];
  setRoleFilter: React.Dispatch<React.SetStateAction<string[]>>;
  uniqueAccessTags: string[];
}

const TableToolbar: React.FC<TableToolbarProps> = ({
  globalFilter,
  onSearchChange,
  table,
  roleFilter,
  setRoleFilter,
  uniqueAccessTags,
}) => (
  <div className="flex flex-col md:flex-row md:items-center py-4 gap-3">
    <div className="flex relative bg-input items-center w-full md:max-w-md border rounded-lg px-2 py-0 group">
      <Search className="absolute bg-transparent left-3 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
      <Input
        placeholder="Search by name or email..."
        value={globalFilter ?? ""}
        onChange={onSearchChange}
        className="w-full ml-7 border-none outline-none shadow-none p-0"
      />
    </div>

    <div className="flex flex-row gap-2 ml-auto flex-wrap sm:flex-nowrap">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-muted-foreground">
            Columns <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Filter Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-muted-foreground">
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem disabled className="opacity-70">
            Filter by Role
          </DropdownMenuCheckboxItem>
          {uniqueAccessTags.map((tag) => (
            <DropdownMenuCheckboxItem
              key={tag}
              checked={roleFilter.includes(tag)}
              onCheckedChange={(checked) =>
                setRoleFilter((prev) =>
                  checked ? [...prev, tag] : prev.filter((t) => t !== tag)
                )
              }
            >
              {tag}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <AddUser />
    </div>
  </div>
);
