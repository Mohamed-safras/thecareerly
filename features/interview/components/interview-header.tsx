import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Copy,
  MoreHorizontal,
  Grid2X2,
  Rows3,
  Maximize,
  Info,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { InterviewSession } from "@/interfaces/interview";

interface InterviewHeaderProps {
  session: InterviewSession;
  layout: "grid" | "gallery" | "focus";
  onLayoutChange: (layout: "grid" | "gallery" | "focus") => void;
  onBack?: () => void;
  className?: string;
}

const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

// Sub-components

interface MeetingInfoDropdownProps {
  session: InterviewSession;
  onCopyLink: () => void;
}

function MeetingInfoDropdown({
  session,
  onCopyLink,
}: MeetingInfoDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="gap-1 px-2">
          <span className="font-medium text-sm">{session.title}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <div className={cn("p-3 border-b")}>
          <p className="font-medium">{session.title}</p>
          <p className="text-sm text-foreground mt-1">
            {session.candidate} • {session.position}
          </p>
        </div>
        <DropdownMenuItem onClick={onCopyLink}>
          <Copy className="h-4 w-4 mr-2" />
          Copy meeting link
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Info className="h-4 w-4 mr-2" />
          Meeting details
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SecurityBadge() {
  return (
    <div className="flex items-center gap-2">
      <Shield className="h-4 w-4 text-status-active" />
      <span className="text-xs">Secured</span>
    </div>
  );
}

interface TimerDisplayProps {
  status: InterviewSession["status"];
  elapsedTime: number;
}

function TimerDisplay({ status, elapsedTime }: TimerDisplayProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={"flex items-center gap-2 px-3 py-1.5 rounded-md"}>
        {status === "in-progress" && (
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-2 w-2 rounded-full bg-destructive"
          />
        )}
        <span className="text-sm font-mono">{formatTime(elapsedTime)}</span>
      </div>
    </div>
  );
}

interface LayoutToggleProps {
  layout: "grid" | "gallery" | "focus";
  onLayoutChange: (layout: "grid" | "gallery" | "focus") => void;
}

function LayoutToggle({ layout, onLayoutChange }: LayoutToggleProps) {
  const getButtonClasses = (isActive: boolean) =>
    cn(
      "h-8 w-8 rounded-sm",
      isActive && // Active state - same for both themes
        "bg-[#5254a3]",
    );

  return (
    <div className={"flex items-center rounded-md p-0.5"}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className={getButtonClasses(layout === "gallery")}
            onClick={() => onLayoutChange("gallery")}
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Gallery</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={getButtonClasses(layout === "focus")}
            onClick={() => onLayoutChange("focus")}
          >
            <Rows3 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Focus</TooltipContent>
      </Tooltip>
    </div>
  );
}

function FullscreenButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={"h-8 w-8"}
          onClick={() => document.documentElement.requestFullscreen?.()}
        >
          <Maximize className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">Full screen</TooltipContent>
    </Tooltip>
  );
}

function MoreOptionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={"h-8 w-8"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Meeting options</DropdownMenuItem>
        <DropdownMenuItem>Call health</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Report a problem</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Main Component
export function InterviewHeader({
  session,
  layout,
  onLayoutChange,
  className,
}: InterviewHeaderProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (session.status === "in-progress") {
      const interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [session.status]);

  const copyMeetingLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Meeting link copied");
  };

  return (
    <TooltipProvider delayDuration={300}>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex items-center justify-between bg-muted p-3 border-b",
          className,
        )}
      >
        {/* Left section - Meeting info */}
        <div className="flex items-center gap-3">
          <MeetingInfoDropdown session={session} onCopyLink={copyMeetingLink} />
          <SecurityBadge />
        </div>

        {/* Center - Timer */}
        <TimerDisplay status={session.status} elapsedTime={elapsedTime} />

        {/* Right section */}
        <div className="flex items-center gap-2">
          <LayoutToggle layout={layout} onLayoutChange={onLayoutChange} />
          <FullscreenButton />
          <MoreOptionsMenu />
        </div>
      </motion.header>
    </TooltipProvider>
  );
}
