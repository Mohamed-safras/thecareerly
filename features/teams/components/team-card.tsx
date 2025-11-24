import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { teamsStatus } from "@/constents/action-colors";
import { ACTIONS } from "@/constents/actions";
import { UserProfile } from "@/types/user-profile";
import {
  Users,
  Briefcase,
  Archive,
  Star,
  MoreHorizontal,
  Copy,
  Trash2,
  Settings,
  Zap,
  Clock,
  IdCard,
} from "lucide-react";

interface TeamCardProps {
  id: string;
  teamName: string;
  teamUser: UserProfile[];
  jobCount: number;
  status: string;
  lastActivity: string;
  createdDate: string;
}

const getStatusBadge = (status: string) => {
  const statusLower = status;
  let color;
  let Icon;

  switch (statusLower) {
    case ACTIONS.ACTIVE:
      color = teamsStatus.ACTIVE;
      Icon = Zap;
      break;
    case ACTIONS.ARCHIVED:
      color = teamsStatus.ARCHIVED;
      Icon = Archive;
      break;
    case ACTIONS.NEW:
      color = teamsStatus.NEW;
      Icon = Star;
      break;
    case ACTIONS.HOLD:
      color = teamsStatus.HOLD;
      Icon = Clock;
      break;
    default:
      color = "bg-blue-100 text-blue-800 border border-blue-200";
      Icon = Clock;
  }

  return {
    color,
    Icon,
    label: status,
  };
};

// Utility to copy text to clipboard using the supported method
const copyToClipboard = (text: string) => {
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed"; // Avoid scrolling to bottom
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    console.log("Copied to clipboard:", text);
  } catch (err) {
    console.error("Failed to copy text:", err);
    // Fallback or notification for user
  }
};

const TeamCard = ({
  id,
  teamName,
  teamUser,
  jobCount,
  status,
}: TeamCardProps) => {
  const statusBadge = getStatusBadge(status);
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm transition-all flex flex-col h-full">
      <div className="flex items-center p-3">
        {/* Team Name and Icon */}
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-muted-foreground">
              {teamName.length > 20 ? `${teamName.slice(0, 20)}...` : teamName}
            </p>
          </div>
        </div>

        {/* Actions Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 ml-auto flex-shrink-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => copyToClipboard(id)}>
              <Copy className="w-4 h-4 mr-2" />
              <span>Copy Team ID</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Viewing Team:", teamName)}
            >
              <Briefcase className="w-4 h-4 mr-2" />
              <span>View Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Editing Team:", teamName)}
            >
              <Settings className="w-4 h-4 mr-2" />
              <span>Edit Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive group"
              onClick={() => console.log("Deleting Team:", teamName)}
            >
              <Trash2 className="w-4 h-4 mr-2 group-hover:text-destructive" />
              <span>Archive/Delete Team</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Card Content */}
      <div className="p-3 flex-grow flex flex-col justify-between">
        <div className="space-y-2 mb-2">
          {/* Status Badge */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <IdCard className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="font-normal text-muted-foreground">
                Team Status
              </span>
            </div>

            <Badge
              variant={"outline"}
              className={`rounded-full shadow-sm px-2 py-0.5 text-xs font-medium `}
            >
              <statusBadge.Icon
                className={`h-4 w-4 mr-1 ${statusBadge.color}`}
              />
              <span className="text-muted-foreground">{statusBadge.label}</span>
            </Badge>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-1 text-sm">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground font-normal">
                Team Members
              </span>
            </div>
            <span className="text-right text-muted-foreground">
              {teamUser.length}
            </span>

            {jobCount && (
              <>
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground font-normal">
                    Team Jobs
                  </span>
                </div>
                <span className="text-right text-muted-foreground">
                  {jobCount}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Footer: Manager and Activity */}
        <div className="pt-3 border-t flex items-center justify-between text-xs">
          {/* Manager Avatar and Name */}

          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
            {teamUser.slice(0, 7).map((user) => (
              <Avatar className="h-7 w-7" key={user.id}>
                <AvatarImage
                  className="object-cover"
                  src={user?.avatar ?? undefined}
                  alt={user?.name ?? undefined}
                />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {teamUser.length > 7 && (
              <div className="h-7 w-7 flex items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground ring-2 ring-background">
                +{teamUser.length - 7}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
