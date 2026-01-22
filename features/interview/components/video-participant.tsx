import { motion } from "framer-motion";
import { MicOff, MoreHorizontal, Hand } from "lucide-react";
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

interface VideoParticipantProps {
  participant: Participant;
  isLocal?: boolean;
  isPinned?: boolean;
  onPin?: () => void;
  className?: string;
}

export function VideoParticipant({
  participant,
  isLocal = false,
  isPinned = false,
  onPin,
  className,
}: VideoParticipantProps) {
  // Check if participant has hand raised (you can add this to Participant type)
  const hasHandRaised = participant.id === "2"; // Demo: second participant has hand raised

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "relative rounded-md overflow-hidden group h-full w-full",
        "bg-[#292929]",
        isPinned && "ring-2 ring-muted-foreground",
        className,
      )}
    >
      {/* Centered circular avatar with ping animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          {/* Pinging ring animation when speaking - positioned behind avatar */}
          {participant.isSpeaking && (
            <>
              <motion.div
                className="absolute h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 rounded-full border-1 border-muted-foreground"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 rounded-full border-1 border-muted-foreground"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
              />
            </>
          )}

          {/* Static avatar - no scale animation */}
          <Avatar
            className={cn(
              "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 ring-2 transition-colors duration-300 relative z-10",
              participant.isSpeaking
                ? "ring-muted-foreground"
                : "ring-transparent",
            )}
          >
            <AvatarImage src={participant.avatarUrl} className="object-cover" />
            <AvatarFallback className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl bg-gradient-to-br  text-secondary font-semibold">
              {participant.initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Hand raised indicator - top right with banner */}
      {hasHandRaised && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-1 right-1 sm:top-2 sm:right-2 flex items-center gap-1 sm:gap-1.5 bg-[#6264a7] text-secondary text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded"
        >
          <Hand className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          <span className="hidden md:inline">raised their hand</span>
        </motion.div>
      )}

      {/* More options - visible on hover */}
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 bg-black/50 hover:bg-black/70 text-secondary rounded"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="bg-[#292929] border-[#3d3d3d] text-secondary"
          >
            <DropdownMenuItem
              onClick={onPin}
              className="hover:bg-[#3d3d3d] focus:bg-[#3d3d3d]"
            >
              {isPinned ? "Unpin" : "Pin"}
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#3d3d3d] focus:bg-[#3d3d3d]">
              Spotlight
            </DropdownMenuItem>
            {!isLocal && (
              <DropdownMenuItem className="hover:bg-[#3d3d3d] focus:bg-[#3d3d3d] text-red-400">
                Remove from meeting
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Bottom Info Bar - name with emoji reactions */}
      <div className="absolute bottom-0 left-0">
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          <div className="flex items-center gap-1 sm:gap-1.5 backdrop-blur-sm rounded px-1.5 sm:px-2 py-0.5 sm:py-1">
            <span className="text-[10px] sm:text-xs md:text-xs font-medium text-secondary truncate max-w-[60px] sm:max-w-[80px] md:max-w-[120px]">
              {!isLocal && participant.name}
              {isLocal && "You"}
            </span>
            {hasHandRaised && (
              <span className="text-xs sm:text-sm hidden sm:inline">✋</span>
            )}
            {participant.isMuted && (
              <div className="h-3 w-3 sm:h-4 sm:w-4 rounded bg-[#c4314b] flex items-center justify-center">
                <MicOff className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-secondary" />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
