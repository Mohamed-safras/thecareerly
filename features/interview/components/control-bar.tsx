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

// ============================================================================
// Types
// ============================================================================

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

// ============================================================================
// Constants
// ============================================================================

const CONTROL_GROUP_CLASSES = cn(
  "flex items-center gap-3 rounded-lg p-3",
  // Light theme
  "bg-gray-100",
  // Dark theme (original)
  "dark:bg-[#292929]",
);

const DROPDOWN_MENU_CLASSES = cn(
  "w-56",
  // Light theme
  "bg-white border-gray-200",
  // Dark theme (original)
  "dark:bg-[#292929] dark:border-[#3d3d3d]",
);

const DROPDOWN_ITEM_CLASSES = cn(
  // Light theme
  "hover:bg-gray-100 focus:bg-gray-100",
  // Dark theme (original)
  "dark:hover:bg-[#3d3d3d] dark:focus:bg-[#3d3d3d]",
);

const SEPARATOR_CLASSES = cn(
  "mx-3",
  // Light theme
  "bg-gray-300",
  // Dark theme (original)
  "dark:bg-[#3d3d3d]",
);

// ============================================================================
// Sub-components
// ============================================================================

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
    <div className={CONTROL_GROUP_CLASSES}>
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
            size="icon"
            className={cn(
              "h-11 w-11 rounded-md",
              // Light theme
              "bg-gray-200 hover:bg-gray-300 text-gray-700",
              // Dark theme (original)
              "dark:bg-[#3d3d3d] dark:hover:bg-[#4a4a4a] dark:text-foreground",
            )}
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className={DROPDOWN_MENU_CLASSES}>
        <DropdownMenuItem
          className={DROPDOWN_ITEM_CLASSES}
          onClick={onToggleRecording}
        >
          {isRecording ? "Stop recording" : "Start recording"}
        </DropdownMenuItem>
        <DropdownMenuItem className={DROPDOWN_ITEM_CLASSES}>
          Turn on live captions
        </DropdownMenuItem>
        <DropdownMenuSeparator
          className={cn("bg-gray-200 dark:bg-[#3d3d3d]")}
        />
        <DropdownMenuItem className={DROPDOWN_ITEM_CLASSES}>
          Device settings
        </DropdownMenuItem>
        <DropdownMenuItem className={DROPDOWN_ITEM_CLASSES}>
          Meeting options
        </DropdownMenuItem>
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
    <div className={CONTROL_GROUP_CLASSES}>
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
        className={cn(
          "rounded-md font-medium text-white",
          // Same red for both themes
          "bg-[#c4314b] hover:bg-[#a52a3f]",
        )}
        onClick={onLeave}
      >
        <PhoneOff className="h-5 w-5" />
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
      className="absolute left-4 flex items-center gap-2 bg-[#c4314b] px-3 py-1.5 rounded-md text-white"
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

// ============================================================================
// Main Component
// ============================================================================

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
          // Light theme
          "bg-gray-50",
          // Dark theme (original)
          "dark:bg-[#1f1f1f]",
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

        <Separator orientation="vertical" className={SEPARATOR_CLASSES} />

        <SecondaryControls
          chatUnread={chatUnread}
          showChat={showChat}
          showParticipants={showParticipants}
          onToggleChat={onToggleChat}
          onToggleParticipants={onToggleParticipants}
        />

        <Separator orientation="vertical" className={SEPARATOR_CLASSES} />

        <LeaveButton onLeave={onLeave} />

        <RecordingIndicator isRecording={isRecording} />
      </motion.div>
    </TooltipProvider>
  );
}
