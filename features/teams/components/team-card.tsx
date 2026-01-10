import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Briefcase,
  MoreHorizontal,
  Copy,
  Trash2,
  Settings,
  LayoutDashboard,
  Clock,
} from "lucide-react";

interface UserProfile {
  id?: string;
  name?: string;
  avatar?: string;
}

interface TeamCardProps {
  id: string;
  teamName: string;
  teamUser: UserProfile[];
  jobCount: number;
  status: string;
  lastActivity: string;
  createdDate: string;
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).catch((err) => {
    console.error("Failed to copy text:", err);
  });
};

const TeamCard = ({
  id,
  teamName,
  teamUser,
  jobCount,
  status,
  lastActivity,
}: TeamCardProps) => {
  return (
    <div className="group relative flex flex-col rounded-xl border border-border/60 bg-card p-0 transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
      {/* Top Section: Name & Menu */}
      <div className="flex items-start justify-between p-5 pb-4">
        <div className="space-y-1 overflow-hidden">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-foreground">
              {teamName}
            </h3>
            <Badge
              variant="outline"
              className="h-5 rounded-md px-1.5 text-[10px] font-medium uppercase tracking-wider bg-secondary/30"
            >
              <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {status}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Active {lastActivity}</span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => copyToClipboard(id)}>
              <Copy className="mr-2 h-4 w-4" /> Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Dashboard")}>
              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Settings")}>
              <Settings className="mr-2 h-4 w-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Archive Team
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Middle Section: Stats */}
      <div className="flex px-5 py-2 gap-8">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-medium">
            Members
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm font-bold">{teamUser.length}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-medium">
            Active Jobs
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Briefcase className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm font-bold">{jobCount}</span>
          </div>
        </div>
      </div>

      {/* Footer Section: Avatar Stack */}
      <div className="mt-4 flex items-center justify-between border-t border-border/50 bg-muted/20 px-5 py-3 rounded-b-xl">
        <div className="flex -space-x-2 overflow-hidden">
          {teamUser.slice(0, 5).map((user, index) => (
            <Avatar
              key={user?.id || index}
              className="h-7 w-7 border-2 border-background ring-0 transition-transform hover:z-10 hover:scale-105"
            >
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-muted text-[10px] font-medium text-muted-foreground">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ))}
          {teamUser.length > 5 && (
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-secondary text-[10px] font-bold text-secondary-foreground">
              +{teamUser.length - 5}
            </div>
          )}
        </div>
        <Button
          variant="link"
          className="h-auto p-0 text-xs font-semibold text-primary hover:no-underline"
          onClick={() => console.log("View Team")}
        >
          View Team
        </Button>
      </div>
    </div>
  );
};

export default TeamCard;
