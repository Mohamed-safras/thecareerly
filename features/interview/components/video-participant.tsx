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
  size?: "sm" | "md" | "lg" | "full";
  onPin?: () => void;
  className?: string;
}

const sizeStyles = {
  sm: "h-28 w-40",
  md: "h-44 w-60",
  lg: "h-64 w-96",
  full: "h-full w-full",
};

export function VideoParticipant({
  participant,
  isLocal = false,
  isPinned = false,
  size = "md",
  onPin,
  className,
}: VideoParticipantProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "relative rounded-lg overflow-hidden group",
        "bg-gradient-to-br from-[#2d2c5e] to-[#1f1f3d]",
        sizeStyles[size],
        isPinned && "ring-2 ring-[#6264a7]",
        className,
      )}
    >
      {/* Video Feed or Avatar */}
      {participant.isVideoOn ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#3d3c6e] to-[#252548]">
          <div className="h-full w-full flex items-center justify-center">
            <Avatar className="h-20 w-20 ring-2 ring-white/10">
              <AvatarImage src={participant.avatarUrl} />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-[#6264a7] to-[#8b8cc7] text-white font-semibold">
                {participant.initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d2c5e] to-[#1a1a35] flex items-center justify-center">
          <Avatar className="h-24 w-24 ring-4 ring-[#6264a7]/30">
            <AvatarImage src={participant.avatarUrl} />
            <AvatarFallback className="text-3xl bg-gradient-to-br from-[#6264a7] to-[#8b8cc7] text-white font-semibold">
              {participant.initials}
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      {/* Speaking Indicator - Teams style glow */}
      {participant.isSpeaking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-lg ring-[3px] ring-[#6264a7] pointer-events-none"
          style={{
            boxShadow: "0 0 20px rgba(98, 100, 167, 0.5)",
          }}
        />
      )}

      {/* Hand raised indicator */}
      {false && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-[#ffaa44] flex items-center justify-center"
        >
          <Hand className="h-4 w-4 text-white" />
        </motion.div>
      )}

      {/* More options - visible on hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-black/40 hover:bg-black/60 text-white rounded-md"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[#292929] border-[#3d3d3d] text-white"
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

      {/* Bottom Info Bar - Teams style */}
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
            <span className="text-sm font-medium text-white truncate">
              {participant.name}
              {isLocal && " (You)"}
            </span>
            {participant.isMuted && (
              <div className="h-5 w-5 rounded bg-[#c4314b] flex items-center justify-center">
                <MicOff className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
