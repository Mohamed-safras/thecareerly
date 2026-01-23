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

export function InterviewHeader({
  session,
  layout,
  onLayoutChange,
  onBack,
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

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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
          "flex items-center justify-between px-4 py-2 bg-[#1f1f1f] border-b border-[#3d3d3d]",
          className,
        )}
      >
        {/* Left section - Meeting info */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-transparent hover:bg-transparent text-secondary gap-1 px-2">
                <span className="font-medium text-sm">{session.title}</span>
                <ChevronDown className="h-4 w-4 text-white/60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="bg-[#292929] border-[#3d3d3d] text-white w-72"
            >
              <div className="p-3 border-b border-[#3d3d3d]">
                <p className="font-medium">{session.title}</p>
                <p className="text-sm text-white/60 mt-1">
                  {session.candidate} • {session.position}
                </p>
              </div>
              <DropdownMenuItem
                className="hover:bg-[#3d3d3d] focus:bg-[#3d3d3d] hover:text-secondary focus:text-secondary"
                onClick={copyMeetingLink}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy meeting link
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#3d3d3d] focus:bg-[#3d3d3d] hover:text-secondary focus:text-secondary">
                <Info className="h-4 w-4 mr-2" />
                Meeting details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-status-active" />
            <span className="text-xs text-white/50">Secured</span>
          </div>
        </div>

        {/* Center - Timer */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#292929] rounded-md">
            {session.status === "in-progress" && (
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-[#c4314b]"
              />
            )}
            <span className="text-sm font-mono text-white">
              {formatTime(elapsedTime)}
            </span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center bg-[#292929] rounded-md p-0.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-sm",
                    layout === "gallery"
                      ? "bg-[#6264a7] text-white"
                      : "text-white/60 hover:text-white hover:bg-[#3d3d3d]",
                  )}
                  onClick={() => onLayoutChange("gallery")}
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-[#1f1f1f] border-[#3d3d3d] text-white"
              >
                Gallery
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-sm",
                    layout === "focus"
                      ? "bg-[#6264a7] text-white"
                      : "text-white/60 hover:text-white hover:bg-[#3d3d3d]",
                  )}
                  onClick={() => onLayoutChange("focus")}
                >
                  <Rows3 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-[#1f1f1f] border-[#3d3d3d] text-white"
              >
                Focus
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Fullscreen */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/60 hover:text-white hover:bg-[#3d3d3d]"
                onClick={() => document.documentElement.requestFullscreen?.()}
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="bg-[#1f1f1f] border-[#3d3d3d] text-white"
            >
              Full screen
            </TooltipContent>
          </Tooltip>

          {/* More */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/60 hover:text-white hover:bg-[#3d3d3d]"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#292929] border-[#3d3d3d] text-secondary"
            >
              <DropdownMenuItem className="hover:bg-[#3d3d3d] focus:bg-[#3d3d3d] hover:text-secondary focus:text-secondary">
                Meeting options
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#3d3d3d] focus:bg-[#3d3d3d] hover:text-secondary focus:text-secondary">
                Call health
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#3d3d3d]" />
              <DropdownMenuItem className="hover:bg-[#3d3d3d] focus:bg-[#3d3d3d] hover:text-secondary focus:text-secondary">
                Report a problem
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.header>
    </TooltipProvider>
  );
}
