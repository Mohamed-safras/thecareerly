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
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import ControlButton from "./control-button";
import { Separator } from "@/components/ui/separator";

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
        <div className="flex items-center gap-3 bg-[#292929] rounded-lg p-3">
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
                  size="icon"
                  className="h-11 w-11 rounded-md bg-[#3d3d3d] hover:bg-[#4a4a4a] "
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
                {/* <span className="text-[10px] text-white/80 mt-1.5">More</span> */}
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
        <Separator orientation="vertical" className="bg-[#3d3d3d] mx-3" />

        {/* Secondary controls */}
        <div className="flex items-center gap-3 bg-[#292929] rounded-lg p-3">
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
        <Separator orientation="vertical" className="bg-[#3d3d3d] mx-3" />

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
