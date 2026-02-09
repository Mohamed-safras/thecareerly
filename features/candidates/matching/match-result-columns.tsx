import { ColumnDef } from "@tanstack/react-table";
import { userStatus } from "@/const/action-colors";
import {
  Calendar,
  FileText,
  MessageSquare,
  MoreHorizontal,
  Phone,
} from "lucide-react";
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
import StarRating from "@/components/star-rating";
import { MatchResult } from "@/interfaces/matching";

// Define the columns as a function that accepts the click handler
export const createMatchResultColumns = (
  handleUpdateUserProfileClick: (candidate: MatchResult) => void,
  onViewDetails: (candidate: MatchResult) => void,
): ColumnDef<MatchResult>[] => [
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
    header: () => <div>Candidate</div>,
    cell: ({ row }) => {
      const user = row.original;
      const { name, avatar, email, status } = user;

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
            </div>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => <div>Position</div>,
    cell: ({ row }) => {
      const candidate = row.original;
      const role = candidate.role as string;
      const department = candidate.department as string;
      return (
        <div>
          <p className="font-medium">{role}</p>
          <p className="text-sm text-muted-foreground">{department}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "stage",
    header: () => <div>Stage</div>,
    cell: ({ row }) => {
      const candidate = row.original;
      return (
        <Badge variant="outline" className={`rounded-full`}>
          {candidate.stage}
        </Badge>
      );
    },
  },
  {
    accessorKey: "rating",
    header: () => <div>Rating</div>,
    cell: ({ row }) => {
      const candidate = row.original;
      return (
        <div className="flex items-center gap-1">
          <StarRating rating={candidate.rating} className="h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "experience",
    header: () => <div>Experience</div>,
    cell: ({ row }) => {
      const candidate = row.original;
      return (
        <span className="text-muted-foreground">{candidate.experience}</span>
      );
    },
  },
  {
    accessorKey: "appliedDate",
    header: () => <div>Applied Date</div>,
    cell: ({ row }) => {
      const candidate = row.original;
      return (
        <span className="text-muted-foreground">{candidate.appliedDate}</span>
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const candidate = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewDetails(candidate)}>
              <FileText className="h-4 w-4 mr-2" />
              <span>View Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Interview
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Phone className="h-4 w-4 mr-2" />
              Call Candidate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
