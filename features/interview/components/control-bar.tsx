import { motion } from "framer-motion";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  PhoneOff,
  MoreHorizontal,
  MessageSquare,
  Users,
  Hand,
  ChevronUp,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ControlBarProps {
  isMuted: boolean;
  isVideoOn: boolean;
  isScreenSharing: boolean;
  isHandRaised: boolean;
  isRecording: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onToggleScreenShare: () => void;
  onToggleHand: () => void;
  onToggleChat: () => void;
  onToggleParticipants: () => void;
  onToggleRecording: () => void;
  onLeave: () => void;
  chatUnread?: number;
  showChat?: boolean;
  showParticipants?: boolean;
  className?: string;
}

export function ControlBar({
  isMuted,
  isVideoOn,
  isScreenSharing,
  isHandRaised,
  isRecording,
  onToggleMute,
  onToggleVideo,
  onToggleScreenShare,
  onToggleHand,
  onToggleChat,
  onToggleParticipants,
  onToggleRecording,
  onLeave,
  chatUnread = 0,
  showChat = false,
  showParticipants = false,
  className,
}: ControlBarProps) {
  const ControlButton = ({
    active,
    danger,
    onClick,
    icon: Icon,
    label,
    badge,
    hasDropdown,
    selected,
  }: {
    active?: boolean;
    danger?: boolean;
    onClick: () => void;
    icon: React.ElementType;
    label: string;
    badge?: number;
    hasDropdown?: boolean;
    selected?: boolean;
  }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-11 w-11 rounded-md transition-all relative",
              danger && "bg-[#c4314b] hover:bg-[#a52a3f] text-white",
              active && !danger && "bg-[#6264a7] hover:bg-[#5254a3] text-white",
              !active &&
                !danger &&
                "bg-[#3d3d3d] hover:bg-[#4a4a4a] text-white",
              selected &&
                "ring-2 ring-[#6264a7] ring-offset-2 ring-offset-[#1f1f1f]",
            )}
            onClick={onClick}
          >
            <Icon className="h-5 w-5" />
            {badge && badge > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#c4314b] text-white text-xs flex items-center justify-center">
                {badge > 9 ? "9+" : badge}
              </span>
            )}
          </Button>
          {hasDropdown && (
            <ChevronUp className="h-3 w-3 text-white/60 absolute -bottom-1" />
          )}
          <span className="text-[10px] text-white/80 mt-1.5">{label}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="bg-[#1f1f1f] border-[#3d3d3d] text-white"
      >
        {label}
      </TooltipContent>
    </Tooltip>
  );

  return (
    <TooltipProvider delayDuration={200}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex items-center justify-center gap-1 px-4 py-3",
          "bg-[#1f1f1f]",
          className,
        )}
      >
        {/* Main controls */}
        <div className="flex items-center gap-1 bg-[#292929] rounded-lg p-1.5">
          {/* Camera */}
          <ControlButton
            danger={!isVideoOn}
            onClick={onToggleVideo}
            icon={isVideoOn ? Video : VideoOff}
            label={isVideoOn ? "Camera" : "Camera off"}
          />

          {/* Mic */}
          <ControlButton
            danger={isMuted}
            onClick={onToggleMute}
            icon={isMuted ? MicOff : Mic}
            label={isMuted ? "Unmute" : "Mute"}
          />

          {/* Share */}
          <ControlButton
            active={isScreenSharing}
            onClick={onToggleScreenShare}
            icon={MonitorUp}
            label="Share"
            hasDropdown
          />

          {/* Hand */}
          <ControlButton
            active={isHandRaised}
            onClick={onToggleHand}
            icon={Hand}
            label={isHandRaised ? "Lower" : "Raise"}
          />

          {/* More */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 rounded-md bg-[#3d3d3d] hover:bg-[#4a4a4a] text-white"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
                <span className="text-[10px] text-white/80 mt-1.5">More</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="bg-[#292929] border-[#3d3d3d] text-white w-56"
            >
              <DropdownMenuItem
                className="hover:bg-[#3d3d3d] focus:bg-[#3d3d3d]"
                onClick={onToggleRecording}
              >
                {isRecording ? "Stop recording" : "Start recording"}
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#3d3d3d] focus:bg-[#3d3d3d]">
                Turn on live captions
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#3d3d3d]" />
              <DropdownMenuItem className="hover:bg-[#3d3d3d] focus:bg-[#3d3d3d]">
                Device settings
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#3d3d3d] focus:bg-[#3d3d3d]">
                Meeting options
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-[#3d3d3d] mx-2" />

        {/* Secondary controls */}
        <div className="flex items-center gap-1 bg-[#292929] rounded-lg p-1.5">
          {/* Chat */}
          <ControlButton
            onClick={onToggleChat}
            icon={MessageSquare}
            label="Chat"
            badge={chatUnread}
            selected={showChat}
          />

          {/* Participants */}
          <ControlButton
            onClick={onToggleParticipants}
            icon={Users}
            label="People"
            selected={showParticipants}
          />

          {/* Share tray */}
          <ControlButton onClick={() => {}} icon={Share2} label="Share tray" />
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-[#3d3d3d] mx-2" />

        {/* Leave */}
        <div className="flex flex-col items-center">
          <Button
            className="h-11 px-6 rounded-md bg-[#c4314b] hover:bg-[#a52a3f] text-white font-medium"
            onClick={onLeave}
          >
            <PhoneOff className="h-5 w-5 mr-2" />
            Leave
          </Button>
        </div>

        {/* Recording indicator */}
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute left-4 flex items-center gap-2 bg-[#c4314b] px-3 py-1.5 rounded-md"
          >
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-white"
            />
            <span className="text-sm font-medium text-white">Recording</span>
          </motion.div>
        )}
      </motion.div>
    </TooltipProvider>
  );
}
