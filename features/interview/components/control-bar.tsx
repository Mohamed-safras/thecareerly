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

// Sub-components
interface MainControlsProps {
  isVideoOn: boolean;
  isMuted: boolean;
  isScreenSharing: boolean;
  isHandRaised: boolean;
  isRecording: boolean;
  onToggleVideo: () => void;
  onToggleMute: () => void;
  onToggleScreenShare: () => void;
  onToggleHand: () => void;
  onToggleRecording: () => void;
}

function MainControls({
  isVideoOn,
  isMuted,
  isScreenSharing,
  isHandRaised,
  isRecording,
  onToggleVideo,
  onToggleMute,
  onToggleScreenShare,
  onToggleHand,
  onToggleRecording,
}: MainControlsProps) {
  return (
    <div className={"flex items-center gap-3 rounded-lg p-3"}>
      <ControlButton
        danger={!isVideoOn}
        onClick={onToggleVideo}
        icon={isVideoOn ? Video : VideoOff}
        label={isVideoOn ? "Camera" : "Camera off"}
      />

      <ControlButton
        danger={isMuted}
        onClick={onToggleMute}
        icon={isMuted ? MicOff : Mic}
        label={isMuted ? "Unmute" : "Mute"}
      />

      <ControlButton
        active={isScreenSharing}
        onClick={onToggleScreenShare}
        icon={MonitorUp}
        label="Share"
      />

      <ControlButton
        active={isHandRaised}
        onClick={onToggleHand}
        icon={Hand}
        label={isHandRaised ? "Lower" : "Raise"}
      />

      <MoreOptionsDropdown
        isRecording={isRecording}
        onToggleRecording={onToggleRecording}
      />
    </div>
  );
}

interface MoreOptionsDropdownProps {
  isRecording: boolean;
  onToggleRecording: () => void;
}

function MoreOptionsDropdown({
  isRecording,
  onToggleRecording,
}: MoreOptionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col items-center">
          <Button
            variant="secondary"
            size="icon"
            className={"h-12 w-12 rounded-md"}
          >
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={onToggleRecording}>
          {isRecording ? "Stop recording" : "Start recording"}
        </DropdownMenuItem>
        <DropdownMenuItem>Turn on live captions</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Device settings</DropdownMenuItem>
        <DropdownMenuItem>Meeting options</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface SecondaryControlsProps {
  chatUnread: number;
  showChat: boolean;
  showParticipants: boolean;
  onToggleChat: () => void;
  onToggleParticipants: () => void;
}

function SecondaryControls({
  chatUnread,
  showChat,
  showParticipants,
  onToggleChat,
  onToggleParticipants,
}: SecondaryControlsProps) {
  return (
    <div className={"flex items-center gap-3 rounded-lg p-3 bg-muted"}>
      <ControlButton
        onClick={onToggleChat}
        icon={MessageSquare}
        label="Chat"
        badge={chatUnread}
        selected={showChat}
      />

      <ControlButton
        onClick={onToggleParticipants}
        icon={Users}
        label="People"
        selected={showParticipants}
      />

      <ControlButton onClick={() => {}} icon={Share2} label="Share tray" />
    </div>
  );
}

interface LeaveButtonProps {
  onLeave: () => void;
}

function LeaveButton({ onLeave }: LeaveButtonProps) {
  return (
    <div className="flex flex-col items-center">
      <Button
        size="icon"
        variant="secondary"
        className={
          "rounded-md font-medium bg-[#c4314b] hover:bg-[#a52a3f] h-12 w-12"
        }
        onClick={onLeave}
      >
        <PhoneOff className="h-6 w-6" />
      </Button>
    </div>
  );
}

interface RecordingIndicatorProps {
  isRecording: boolean;
}

function RecordingIndicator({ isRecording }: RecordingIndicatorProps) {
  if (!isRecording) return null;

  return (
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
      <span className="text-sm font-medium">Recording</span>
    </motion.div>
  );
}

// Main Component
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
          "flex items-center bg-muted border-t justify-center gap-1 p-3",
          className,
        )}
      >
        <MainControls
          isVideoOn={isVideoOn}
          isMuted={isMuted}
          isScreenSharing={isScreenSharing}
          isHandRaised={isHandRaised}
          isRecording={isRecording}
          onToggleVideo={onToggleVideo}
          onToggleMute={onToggleMute}
          onToggleScreenShare={onToggleScreenShare}
          onToggleHand={onToggleHand}
          onToggleRecording={onToggleRecording}
        />

        <Separator orientation="vertical" className="mx-3" />

        <SecondaryControls
          chatUnread={chatUnread}
          showChat={showChat}
          showParticipants={showParticipants}
          onToggleChat={onToggleChat}
          onToggleParticipants={onToggleParticipants}
        />

        <Separator orientation="vertical" className="mx-3" />

        <LeaveButton onLeave={onLeave} />

        <RecordingIndicator isRecording={isRecording} />
      </motion.div>
    </TooltipProvider>
  );
}
