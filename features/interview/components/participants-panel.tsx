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

  const filteredParticipants = participants.filter((participant) =>
    participant.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const organizers = filteredParticipants.filter(
    (participant) => participant.role === "interviewer",
  );
  const attendees = filteredParticipants.filter(
    (participant) => participant.role !== "interviewer",
  );

  const ParticipantRow = ({ participant }: { participant: Participant }) => {
    const isCurrentUser = participant.id === currentUserId;

    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 p-3 group rounded-md mx-2"
      >
        <div className="relative">
          <Avatar className="h-9 w-9">
            <AvatarImage src={participant.avatarUrl} className="object-cover" />
            <AvatarFallback className="bg-gradient-to-br border-2 border-muted-foreground text-sm">
              {participant.initials}
            </AvatarFallback>
          </Avatar>
          {participant.isSpeaking && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-status-active border-2 border-[#292929]"
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">
            {participant.name}
            {isCurrentUser && <span> (You)</span>}
          </p>
          {participant.role === "interviewer" && (
            <p className="text-xs text-foreground/70">Organizer</p>
          )}
        </div>

        <div className="flex items-center gap-1">
          {participant.isMuted ? (
            <div className="h-8 w-8 rounded flex items-center justify-center ">
              <MicOff className="h-4 w-4 text-destructive" />
            </div>
          ) : (
            <div className="h-8 w-8 rounded flex items-center justify-center">
              <Mic className="h-4 w-4 " />
            </div>
          )}

          {!participant.isVideoOn && (
            <div className="h-8 w-8 rounded flex items-center justify-center ">
              <VideoOff className="h-4 w-4 text-destructive" />
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Pin for me</DropdownMenuItem>
              <DropdownMenuItem>Spotlight for everyone</DropdownMenuItem>
              {!isCurrentUser && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Mute participant</DropdownMenuItem>
                  <DropdownMenuItem className=" text-destructive hover:text-destructive focus:text-destructive ">
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
        "w-[360px] h-full bg-muted border-l flex flex-col",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <h3 className="font-semibold">People ({participants.length})</h3>
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Search and invite */}
      <div className="p-3 space-y-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for participants"
            className="pl-9 placeholder:text-input/40 focus-visible:ring-1 focus-visible:ring-[#6264a7]"
          />
        </div>
        <Button variant="secondary" className="w-fit justify-start">
          <UserPlus className="h-4 w-4 mr-2" />
          Invite someone
        </Button>
      </div>

      {/* Participants */}
      <ScrollArea className="flex-1 py-2">
        {organizers.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-medium  uppercase p-3">
              Organizers ({organizers.length})
            </h4>
            {organizers.map((p) => (
              <ParticipantRow key={p.id} participant={p} />
            ))}
          </div>
        )}

        {attendees.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-white/50 uppercase p-3">
              Attendees ({attendees.length})
            </h4>
            {attendees.map((participant) => (
              <ParticipantRow key={participant.id} participant={participant} />
            ))}
          </div>
        )}
      </ScrollArea>
    </motion.div>
  );
}
