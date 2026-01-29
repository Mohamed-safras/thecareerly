import { motion } from "framer-motion";
import { MicOff, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Participant } from "@/interfaces/interview";

// ============================================================================
// Types
// ============================================================================

interface VideoParticipantProps {
  participant: Participant;
  isLocal?: boolean;
  layout?: "grid" | "together" | "gallery" | "focus";
  isPinned?: boolean;
  onPin?: () => void;
  className?: string;
}

interface SpeakingIndicatorProps {
  isSpeaking: boolean;
}

interface ParticipantAvatarProps {
  participant: Participant;
  isSpeaking: boolean;
}

interface HandRaiseIndicatorProps {
  isVisible: boolean;
}

interface ParticipantInfoProps {
  name: string;
  isLocal: boolean;
  isMuted: boolean;
  hasHandRaised: boolean;
}

interface OptionsMenuProps {
  isPinned: boolean;
  isLocal: boolean;
  onPin?: () => void;
}

// ============================================================================
// Constants
// ============================================================================

const AVATAR_SIZES = cn(
  "h-12 w-12",
  "sm:h-14 sm:w-14",
  "md:h-16 md:w-16",
  "lg:h-18 lg:w-18",
  "xl:h-20 xl:w-20",
);

const PING_ANIMATION = {
  initial: { scale: 1, opacity: 0.8 },
  duration: 1.5,
  ease: "easeInOut" as const,
};

// ============================================================================
// Sub-components
// ============================================================================

function SpeakingIndicator({ isSpeaking }: SpeakingIndicatorProps) {
  if (!isSpeaking) return null;

  return (
    <>
      {/* First ping ring */}
      <motion.div
        className={cn(
          AVATAR_SIZES,
          "absolute rounded-full border border-muted dark:border-muted-foreground",
        )}
        initial={{ scale: 1, opacity: PING_ANIMATION.initial.opacity }}
        animate={{ scale: 1.4, opacity: 0 }}
        transition={{
          duration: PING_ANIMATION.duration,
          repeat: Infinity,
          ease: PING_ANIMATION.ease,
        }}
      />
      {/* Second ping ring (delayed) */}
      <motion.div
        className={cn(
          AVATAR_SIZES,
          "absolute rounded-full border border-muted dark:border-muted-foreground",
        )}
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: 1.8, opacity: 0 }}
        transition={{
          duration: PING_ANIMATION.duration,
          repeat: Infinity,
          ease: PING_ANIMATION.ease,
          delay: 0.8,
        }}
      />
    </>
  );
}

function ParticipantAvatar({
  participant,
  isSpeaking,
}: ParticipantAvatarProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <SpeakingIndicator isSpeaking={isSpeaking} />

        <Avatar
          className={cn(
            AVATAR_SIZES,
            "border-2 border-muted dark:border-muted-foreground",
            "transition-colors duration-300",
            "relative z-10",
          )}
        >
          <AvatarImage
            src={participant.avatarUrl}
            alt={participant.name}
            className="object-cover"
          />
          <AvatarFallback
            className={cn(
              "bg-gradient-to-br font-semibold",
              "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl",
            )}
          >
            {participant.initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

function HandRaiseIndicator({ isVisible }: HandRaiseIndicatorProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "absolute top-1 right-1 sm:top-2 sm:right-2",
        "flex items-center gap-1 sm:gap-1.5",
        // Light: slightly darker purple, Dark: original color
        "bg-[#5254a3] dark:bg-[#6264a7] text-white",
        "text-[10px] sm:text-xs",
        "px-1.5 sm:px-2 py-0.5 sm:py-1",
        "rounded",
      )}
    >
      <span className="hidden md:inline">✋ raised their hand</span>
    </motion.div>
  );
}

function ParticipantInfo({
  name,
  isLocal,
  isMuted,
  hasHandRaised,
}: ParticipantInfoProps) {
  return (
    <div className="absolute bottom-0 left-0 z-10">
      <div className="flex items-center justify-center gap-1 sm:gap-2">
        <div
          className={cn(
            "flex items-center gap-1 sm:gap-1.5",
            "backdrop-blur-sm rounded",
            "bg-white/30 dark:bg-transparent",
            "px-1.5 sm:px-2 py-0.5 sm:py-1",
          )}
        >
          <span
            className={cn(
              "text-[10px] sm:text-xs md:text-xs",
              "font-medium truncate",
              "max-w-[60px] sm:max-w-[80px] md:max-w-[120px]",
              // Light: dark text, Dark: light text
              "text-gray-800 dark:text-foreground",
            )}
          >
            {name}
            {isLocal && " (You)"}
          </span>

          {hasHandRaised && (
            <span className="text-xs sm:text-sm hidden sm:inline">✋</span>
          )}

          {isMuted && <MutedIndicator />}
        </div>
      </div>
    </div>
  );
}

function MutedIndicator() {
  return (
    <div
      className={cn(
        "h-3 w-3 sm:h-4 sm:w-4",
        "rounded",
        "bg-destructive",
        "flex items-center justify-center",
      )}
    >
      <MicOff className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-destructive-foreground" />
    </div>
  );
}

function OptionsMenu({ isPinned, isLocal, onPin }: OptionsMenuProps) {
  return (
    <div
      className={cn(
        "absolute top-2 right-2",
        "opacity-0 group-hover:opacity-100",
        "transition-opacity",
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="secondary" className="h-7 w-7 rounded">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className={cn(
            // Light theme
            "bg-white border-gray-200",
            // Dark theme (original)
            "dark:bg-[#292929] dark:border-[#3d3d3d]",
          )}
        >
          <DropdownMenuItem
            onClick={onPin}
            className={cn(
              // Light theme
              "hover:bg-gray-100 focus:bg-gray-100",
              // Dark theme (original)
              "dark:hover:bg-[#3d3d3d] dark:focus:bg-[#3d3d3d]",
            )}
          >
            {isPinned ? "Unpin" : "Pin"}
          </DropdownMenuItem>

          <DropdownMenuItem
            className={cn(
              "hover:bg-gray-100 focus:bg-gray-100",
              "dark:hover:bg-[#3d3d3d] dark:focus:bg-[#3d3d3d]",
            )}
          >
            Spotlight
          </DropdownMenuItem>

          {!isLocal && (
            <DropdownMenuItem
              className={cn(
                "text-destructive hover:text-destructive focus:text-destructive",
                "hover:bg-gray-100 focus:bg-gray-100",
                "dark:hover:bg-[#3d3d3d] dark:focus:bg-[#3d3d3d]",
              )}
            >
              Remove from meeting
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function VideoParticipant({
  participant,
  isLocal = false,
  isPinned = false,
  layout,
  onPin,
  className,
}: VideoParticipantProps) {
  // TODO: Add hasHandRaised to Participant interface
  const hasHandRaised = participant.id === "user-6";

  const showHandRaiseBanner = (layout === "focus" || isPinned) && hasHandRaised;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "relative rounded-md overflow-hidden group h-full w-full",
        // Light: light gray, Dark: original dark gray
        "bg-gray-200 dark:bg-[#292929]",
        isPinned && "ring-2 ring-ring",
        className,
      )}
    >
      <ParticipantAvatar
        participant={participant}
        isSpeaking={participant.isSpeaking}
      />

      <HandRaiseIndicator isVisible={showHandRaiseBanner} />

      <OptionsMenu isPinned={isPinned} isLocal={isLocal} onPin={onPin} />

      <ParticipantInfo
        name={participant.name}
        isLocal={isLocal}
        isMuted={participant.isMuted}
        hasHandRaised={hasHandRaised}
      />
    </motion.div>
  );
}
