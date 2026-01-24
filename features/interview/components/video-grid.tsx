import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Participant } from "@/interfaces/interview";
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
    ? participants.find((p) => p.id === pinnedId)
    : null;

  // Dynamic grid configuration based on participant count
  const gridConfig = useMemo(() => {
    const count = participants.length;

    if (count === 1) {
      return { cols: 1, rows: 1, maxWidth: "max-w-2xl" };
    }
    if (count === 2) {
      return { cols: 2, rows: 1, maxWidth: "max-w-4xl" };
    }
    if (count === 3) {
      return { cols: 3, rows: 1, maxWidth: "max-w-5xl" };
    }
    if (count === 4) {
      return { cols: 2, rows: 2, maxWidth: "max-w-4xl" };
    }
    if (count <= 6) {
      return { cols: 3, rows: 2, maxWidth: "max-w-5xl" };
    }
    if (count <= 9) {
      return { cols: 3, rows: 3, maxWidth: "max-w-6xl" };
    }
    return { cols: 4, rows: Math.ceil(count / 4), maxWidth: "max-w-7xl" };
  }, [participants.length]);

  const getGridClasses = () => {
    const { cols } = gridConfig;
    const colClasses: Record<number, string> = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    };
    return colClasses[cols] || "grid-cols-4";
  };

  // Focus layout - one main speaker, others in filmstrip
  if (layout === "focus" || pinnedParticipant) {
    const mainParticipant =
      pinnedParticipant ||
      participants.find((participant) => participant.isSpeaking) ||
      participants[0];
    const otherParticipants = participants.filter(
      (participant) => participant.id !== mainParticipant.id,
    );

    return (
      <div className={cn("flex flex-col h-full", className)}>
        {/* Main speaker */}
        <div className="flex-1 flex items-center justify-center p-3">
          <motion.div layout className="w-full max-w-5xl aspect-video">
            <VideoParticipant
              participant={mainParticipant}
              isLocal={mainParticipant.id === localParticipantId}
              isPinned={mainParticipant.id === pinnedId}
              layout={layout}
              onPin={() =>
                setPinnedId(
                  pinnedId === mainParticipant.id ? null : mainParticipant.id,
                )
              }
            />
          </motion.div>
        </div>

        {/* Filmstrip */}
        {otherParticipants.length > 0 && (
          <div className="flex justify-center gap-3 p-3 overflow-x-auto">
            <AnimatePresence>
              {otherParticipants.map((participant) => (
                <motion.div
                  key={participant.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="h-24 w-32 flex-shrink-0"
                >
                  <VideoParticipant
                    participant={participant}
                    isLocal={participant.id === localParticipantId}
                    isPinned={participant.id === pinnedId}
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

  // Gallery layout - Teams dynamic grid
  return (
    <div
      className={cn("h-full flex items-center justify-center p-3", className)}
    >
      <div
        className={cn(
          "grid gap-3 w-full mx-auto",
          getGridClasses(),
          gridConfig.maxWidth,
        )}
      >
        <AnimatePresence>
          {participants.map((participant, index) => (
            <motion.div
              key={participant.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="aspect-video"
            >
              <VideoParticipant
                participant={participant}
                isLocal={participant.id === localParticipantId}
                isPinned={participant.id === pinnedId}
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
