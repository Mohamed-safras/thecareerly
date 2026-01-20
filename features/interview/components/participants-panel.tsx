import { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Mic,
  MicOff,
  VideoOff,
  MoreHorizontal,
  Search,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Participant } from "@/interfaces/interview";

interface ParticipantsPanelProps {
  participants: Participant[];
  currentUserId: string;
  onClose: () => void;
  className?: string;
}

export function ParticipantsPanel({
  participants,
  currentUserId,
  onClose,
  className,
}: ParticipantsPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredParticipants = participants.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const organizers = filteredParticipants.filter(
    (p) => p.role === "interviewer",
  );
  const attendees = filteredParticipants.filter(
    (p) => p.role !== "interviewer",
  );

  const ParticipantRow = ({ participant }: { participant: Participant }) => {
    const isCurrentUser = participant.id === currentUserId;

    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 px-4 py-2 hover:bg-[#3d3d3d] group rounded-md mx-2"
      >
        <div className="relative">
          <Avatar className="h-9 w-9">
            <AvatarImage src={participant.avatarUrl} />
            <AvatarFallback className="bg-[#6264a7] text-white text-sm">
              {participant.initials}
            </AvatarFallback>
          </Avatar>
          {participant.isSpeaking && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#92c353] border-2 border-[#292929]"
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">
            {participant.name}
            {isCurrentUser && <span className="text-white/50"> (You)</span>}
          </p>
          {participant.role === "interviewer" && (
            <p className="text-xs text-white/50">Organizer</p>
          )}
        </div>

        <div className="flex items-center gap-1">
          {participant.isMuted ? (
            <div className="h-7 w-7 rounded flex items-center justify-center bg-[#c4314b]/20">
              <MicOff className="h-4 w-4 text-[#c4314b]" />
            </div>
          ) : (
            <div className="h-7 w-7 rounded flex items-center justify-center">
              <Mic className="h-4 w-4 text-white/50" />
            </div>
          )}

          {!participant.isVideoOn && (
            <div className="h-7 w-7 rounded flex items-center justify-center bg-[#c4314b]/20">
              <VideoOff className="h-4 w-4 text-[#c4314b]" />
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100 text-white/60 hover:text-white hover:bg-[#4a4a4a]"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#292929] border-[#3d3d3d] text-white"
            >
              <DropdownMenuItem className="hover:bg-[#3d3d3d] focus:bg-[#3d3d3d]">
                Pin for me
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#3d3d3d] focus:bg-[#3d3d3d]">
                Spotlight for everyone
              </DropdownMenuItem>
              {!isCurrentUser && (
                <>
                  <DropdownMenuSeparator className="bg-[#3d3d3d]" />
                  <DropdownMenuItem className="hover:bg-[#3d3d3d] focus:bg-[#3d3d3d]">
                    Mute participant
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#3d3d3d] focus:bg-[#3d3d3d] text-[#c4314b]">
                    Remove from meeting
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={cn(
        "w-[360px] h-full bg-[#292929] border-l border-[#3d3d3d] flex flex-col",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#3d3d3d]">
        <h3 className="font-semibold text-white">
          People ({participants.length})
        </h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white/70 hover:text-white hover:bg-[#3d3d3d]"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Search and invite */}
      <div className="p-4 space-y-3 border-b border-[#3d3d3d]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for participants"
            className="pl-9 bg-[#3d3d3d] border-0 text-white placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-[#6264a7]"
          />
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-[#6264a7] hover:text-[#8b8cc7] hover:bg-[#3d3d3d]"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Invite someone
        </Button>
      </div>

      {/* Participants */}
      <ScrollArea className="flex-1 py-2">
        {organizers.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-medium text-white/50 uppercase px-4 py-2">
              Organizers ({organizers.length})
            </h4>
            {organizers.map((p) => (
              <ParticipantRow key={p.id} participant={p} />
            ))}
          </div>
        )}

        {attendees.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-white/50 uppercase px-4 py-2">
              Attendees ({attendees.length})
            </h4>
            {attendees.map((p) => (
              <ParticipantRow key={p.id} participant={p} />
            ))}
          </div>
        )}
      </ScrollArea>
    </motion.div>
  );
}
