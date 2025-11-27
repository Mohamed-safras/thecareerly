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
    <div className="group rounded-xl border bg-card shadow-sm hover:shadow-hover transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-gradient-to-r from-card to-muted/30">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-md">
            <Users className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-foreground truncate">
              {teamName.length > 20 ? `${teamName.slice(0, 20)}...` : teamName}
            </p>
          </div>
        </div>

        {/* Actions Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
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
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div className="space-y-3 mb-3">
          {/* Status Badge */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <IdCard className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">
                Team Status
              </span>
            </div>

            <Badge
              variant="outline"
              className={`rounded-full shadow-sm px-3 py-1 text-xs font-semibold border transition-all duration-200 ${statusBadge.color}`}
            >
              <statusBadge.Icon className="h-3.5 w-3.5 mr-1.5" />
              <span>{statusBadge.label}</span>
            </Badge>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex flex-col p-3 rounded-lg bg-muted/50 border border-border/50 transition-all hover:bg-muted hover:border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4" />
                <span className="text-xs text-muted-foreground font-medium">
                  Members
                </span>
              </div>
              <span className="text-xl font-bold text-foreground">
                {teamUser.length}
              </span>
            </div>

            {jobCount && (
              <div className="flex flex-col p-3 rounded-lg bg-muted/50 border border-border/50 transition-all hover:bg-muted hover:border-primary/20">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-xs text-muted-foreground font-medium">
                    Jobs
                  </span>
                </div>
                <span className="text-xl font-bold text-foreground">
                  {jobCount}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer: Team Members */}
        <div className="pt-3 border-t flex items-center justify-between text-xs">
          <div className="flex -space-x-2">
            {teamUser.slice(0, 7).map((user) => (
              <Avatar
                className="h-8 w-8 ring-2 ring-card border border-border transition-transform hover:scale-110 hover:z-10"
                key={user.id}
              >
                <AvatarImage
                  className="object-cover"
                  src={user?.avatar ?? undefined}
                  alt={user?.name ?? undefined}
                />
                <AvatarFallback className="text-xs bg-gradient-to-br from-primary/20 to-accent/20">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
            {teamUser.length > 7 && (
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground ring-2 ring-card border border-border">
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
