"use client";
import { Participant } from "@/interfaces/interview";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { VideoParticipant } from "./video-participant";

interface VideoGridProps {
  participants: Participant[];
  localParticipantId?: string;
  layout?: "grid" | "together" | "gallery" | "focus";
  className?: string;
}

export function VideoGrid({
  participants,
  localParticipantId,
  layout = "gallery",
  className,
}: VideoGridProps) {
  const [pinnedId, setPinnedId] = useState<string | null>(null);

  const pinnedParticipant = pinnedId
    ? participants.find((participant) => participant.id === pinnedId)
    : null;

  const getGridLayout = (count: number) => {
    if (count === 1) return "grid-cols-1 max-w-2xl mx-auto";
    if (count === 2) return "grid-cols-2 max-w-4xl mx-auto";
    if (count === 3) return "grid-cols-3 max-w-5xl mx-auto";
    if (count === 4) return "grid-cols-2 max-w-4xl mx-auto";
    if (count <= 6) return "grid-cols-3 max-w-6xl mx-auto";
    if (count <= 9) return "grid-cols-3";
    return "grid-cols-4";
  };

  // Focus layout - one main speaker, others in filmstrip
  if (layout === "focus" || pinnedParticipant) {
    const mainParticipant =
      pinnedParticipant ||
      participants.find((p) => p.isSpeaking) ||
      participants[0];
    const otherParticipants = participants.filter(
      (p) => p.id !== mainParticipant.id,
    );

    return (
      <div className={cn("flex flex-col gap-3 h-full", className)}>
        {/* Main speaker */}
        <div className="flex-1 flex items-center justify-center p-2">
          <VideoParticipant
            participant={mainParticipant}
            isLocal={mainParticipant.id === localParticipantId}
            isPinned={mainParticipant.id === pinnedId}
            size="full"
            onPin={() =>
              setPinnedId(
                pinnedId === mainParticipant.id ? null : mainParticipant.id,
              )
            }
            className="max-w-5xl max-h-[70vh] aspect-video"
          />
        </div>

        {/* Filmstrip */}
        {otherParticipants.length > 0 && (
          <div className="flex justify-center gap-2 px-4 py-2 overflow-x-auto">
            <AnimatePresence>
              {otherParticipants.map((participant) => (
                <motion.div
                  key={participant.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <VideoParticipant
                    participant={participant}
                    isLocal={participant.id === localParticipantId}
                    isPinned={participant.id === pinnedId}
                    size="sm"
                    onPin={() =>
                      setPinnedId(
                        pinnedId === participant.id ? null : participant.id,
                      )
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  }

  // Gallery layout - Teams default grid
  return (
    <div
      className={cn("h-full flex items-center justify-center p-4", className)}
    >
      <div
        className={cn("grid gap-2 w-full", getGridLayout(participants.length))}
      >
        <AnimatePresence>
          {participants.map((participant) => (
            <motion.div
              key={participant.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="aspect-video"
            >
              <VideoParticipant
                participant={participant}
                isLocal={participant.id === localParticipantId}
                isPinned={participant.id === pinnedId}
                size="full"
                onPin={() =>
                  setPinnedId(
                    pinnedId === participant.id ? null : participant.id,
                  )
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
