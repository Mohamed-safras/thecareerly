import { ColumnDef } from "@tanstack/react-table";
import { UserProfile } from "@/types/user-profile";
import { userStatus } from "@/const/action-colors";
import { CloudUpload, Copy, KeyRound, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { USER_STATUS } from "@/const/user-actions";

// Define the columns as a function that accepts the click handler
export const createColumns = (
  handleUpdateUserProfileClick: (user: UserProfile) => void,
): ColumnDef<UserProfile>[] => [
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
      const user = row.original;
      const { name, avatar, email, roles, lastActive, lastUpdated, status } =
        user;

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="flex items-center gap-2 cursor-pointer rounded-md p-1 -m-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onClick={() => handleUpdateUserProfileClick(user)}
              aria-label={`View profile of ${name}`}
            >
              <Avatar className="h-8 w-8">
                {avatar ? (
                  <AvatarImage
                    src={avatar}
                    alt={`${name}'s avatar`}
                    className="object-cover"
                  />
                ) : null}
                <AvatarFallback className="text-xs font-medium bg-muted">
                  {(name ?? "")
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-baseline flex-col">
                <span className="font-medium truncate max-w-[200px] hover:underline">
                  {name}
                </span>
                <span className=" truncate max-w-[200px] hover:underline">
                  {email}
                </span>
              </div>
            </button>
          </TooltipTrigger>

          <TooltipContent
            side="right"
            align="start"
            sideOffset={8}
            tooltipPrimitiveCustomClassName={`bg-background fill-transparent border-1 border-t-background border-l-background mt-[0.5px]`}
            className="min-w-[260px] max-w-[300px] p-4 bg-background border rounded-lg shadow-lg"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-background">
                  {avatar ? (
                    <AvatarImage
                      src={avatar}
                      alt={`${name}'s avatar`}
                      className="object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="text-sm font-semibold bg-muted">
                    {(name ?? "")
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-primary text-base font-semibold truncate">
                    {name}
                  </p>
                  <div className="flex gap-2">
                    <p className="text-sm text-muted-foreground truncate">
                      {email}
                    </p>
                    {status && (
                      <Badge
                        variant="outline"
                        className="flex items-center font-semibold"
                      >
                        <div
                          className={`w-1 h-1 mr-2 rounded-full ${
                            userStatus[status as USER_STATUS]
                          } animate-ping`}
                        />
                        <span className="text-muted-foreground">{status}</span>
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Roles */}
              {roles && roles.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {roles.map((role) => (
                    <Badge
                      key={role}
                      variant="secondary"
                      className="text-xs font-medium px-2 py-0.5 capitalize"
                    >
                      {role}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Metadata */}
              <div className="flex flex-col gap-1 text-xs text-muted-foreground border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span>Last active</span>
                  <span className="font-medium">{lastActive}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last updated</span>
                  <span className="font-medium">{lastUpdated}</span>
                </div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "roles",
    header: "Role",
    cell: ({ row }) => {
      const roles = row.getValue("roles") as string[];
      return (
        <div className="flex gap-1">
          {roles?.map((role) => (
            <Badge
              variant="outline"
              key={role}
              className="capitalize rounded-full px-2 py-0.5"
            >
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
          .includes(filter.toLowerCase()),
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof userStatus;
      return (
        status && (
          <Badge
            variant="secondary"
            className={`rounded-full px-2 py-0.5 capitalize`}
          >
            {status.toLocaleLowerCase()}
          </Badge>
        )
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
              onClick={() => navigator.clipboard.writeText(user.email ?? "")}
            >
              <Copy className="w-4 h-4 mr-2" />
              <span>Copy Email</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <KeyRound className="w-4 h-4 mr-2" />
              <span>Change Permission</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CloudUpload className="w-4 h-4 mr-2" />
              <span> Export details</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
