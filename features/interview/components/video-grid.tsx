import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Participant } from "@/interfaces/interview";
import { VideoParticipant } from "./video-participant";

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl";

interface VideoGridProps {
  participants: Participant[];
  localParticipantId?: string;
  layout?: "grid" | "together" | "gallery" | "focus";
  className?: string;
}

function getScreenSize(width: number): ScreenSize {
  if (width < 480) return "xs";
  if (width < 640) return "sm";
  if (width < 1024) return "md";
  if (width < 1280) return "lg";
  return "xl";
}

interface GridConfig {
  cols: number;
  maxRows: number;
  maxWidth: string;
  gap: number;
  filmstripHeight: string;
  filmstripWidth: string;
}

function getGridConfig(count: number, screenSize: ScreenSize): GridConfig {
  // Mobile XS (< 480px) — 1 col, max 2 rows
  if (screenSize === "xs") {
    return {
      cols: 1,
      maxRows: 2,
      maxWidth: "max-w-full",
      gap: 6,
      filmstripHeight: "h-14",
      filmstripWidth: "w-20",
    };
  }

  // Mobile SM (480–639px) — max 2 cols, max 2 rows
  if (screenSize === "sm") {
    return {
      cols: count === 1 ? 1 : 2,
      maxRows: 2,
      maxWidth: count === 1 ? "max-w-sm" : "max-w-lg",
      gap: 8,
      filmstripHeight: "h-16",
      filmstripWidth: "w-24",
    };
  }

  // Tablet MD (640–1023px) — max 2 cols, max 2 rows
  if (screenSize === "md") {
    let cols = 2;
    let maxWidth = "max-w-2xl";
    if (count === 1) {
      cols = 1;
      maxWidth = "max-w-md";
    } else {
      cols = 2;
      maxWidth = "max-w-2xl";
    }
    return {
      cols,
      maxRows: 2,
      maxWidth,
      gap: 10,
      filmstripHeight: "h-18",
      filmstripWidth: "w-28",
    };
  }

  // Desktop LG (1024–1279px) — max 2 cols, max 2 rows
  if (screenSize === "lg") {
    let cols = 2;
    let maxWidth = "max-w-4xl";
    if (count === 1) {
      cols = 1;
      maxWidth = "max-w-2xl";
    } else {
      cols = 2;
      maxWidth = "max-w-4xl";
    }
    return {
      cols,
      maxRows: 2,
      maxWidth,
      gap: 12,
      filmstripHeight: "h-20",
      filmstripWidth: "w-28",
    };
  }

  // XL Desktop (≥1280px) — max 4 cols, max 5 rows
  let cols = 4;
  let maxWidth = "max-w-7xl";
  if (count === 1) {
    cols = 1;
    maxWidth = "max-w-2xl";
  } else if (count === 2) {
    cols = 2;
    maxWidth = "max-w-4xl";
  } else if (count === 3) {
    cols = 3;
    maxWidth = "max-w-5xl";
  } else if (count === 4) {
    cols = 2;
    maxWidth = "max-w-4xl";
  } else if (count <= 6) {
    cols = 3;
    maxWidth = "max-w-5xl";
  } else if (count <= 9) {
    cols = 3;
    maxWidth = "max-w-6xl";
  } else {
    cols = 4;
    maxWidth = "max-w-7xl";
  }
  return {
    cols,
    maxRows: 5,
    maxWidth,
    gap: 12,
    filmstripHeight: "h-20",
    filmstripWidth: "w-28",
  };
}

function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() =>
    typeof window !== "undefined" ? getScreenSize(window.innerWidth) : "lg",
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}

export function VideoGrid({
  participants,
  localParticipantId,
  layout = "gallery",
  className,
}: VideoGridProps) {
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const screenSize = useScreenSize();

  const pinnedParticipant = pinnedId
    ? participants.find((p) => p.id === pinnedId)
    : null;

  const gridConfig = useMemo(
    () => getGridConfig(participants.length, screenSize),
    [participants.length, screenSize],
  );

  const isMobile = screenSize === "xs" || screenSize === "sm";

  // Split participants into main grid and overflow
  const { mainParticipants, overflowParticipants } = useMemo(() => {
    const maxInGrid = gridConfig.cols * gridConfig.maxRows;

    if (participants.length <= maxInGrid) {
      return {
        mainParticipants: participants,
        overflowParticipants: [],
      };
    }

    return {
      mainParticipants: participants.slice(0, maxInGrid),
      overflowParticipants: participants.slice(maxInGrid),
    };
  }, [participants, gridConfig.cols, gridConfig.maxRows]);

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
        <div className="flex-1 flex items-center justify-center p-2 sm:p-3 min-h-0">
          <motion.div
            layout
            className={cn(
              "w-full aspect-video",
              isMobile ? "max-w-full" : "max-w-5xl",
            )}
          >
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
          <div
            className={cn(
              "flex justify-start sm:justify-center gap-2 sm:gap-3 p-2 sm:p-3 overflow-x-auto",
              "scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent",
            )}
          >
            <AnimatePresence>
              {otherParticipants.map((participant) => (
                <motion.div
                  key={participant.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={cn(
                    "flex-shrink-0",
                    gridConfig.filmstripHeight,
                    gridConfig.filmstripWidth,
                  )}
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

  // Gallery layout - responsive grid with centered last row
  return (
    <div className={cn("h-full flex flex-col", className)}>
      {/* Main grid area */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-3 min-h-0">
        <div
          className={cn(
            "flex flex-wrap justify-center w-full mx-auto content-center",
            gridConfig.maxWidth,
          )}
          style={{ gap: `${gridConfig.gap}px` }}
        >
          <AnimatePresence>
            {mainParticipants.map((participant, index) => {
              const widthPercent = `calc(${100 / gridConfig.cols}% - ${((gridConfig.cols - 1) * gridConfig.gap) / gridConfig.cols}px)`;

              return (
                <motion.div
                  key={participant.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="aspect-video"
                  style={{ width: widthPercent }}
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
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Overflow scrollable filmstrip */}
      {/* {overflowParticipants.length > 0 && (
        <div className="shrink-0 border-t border-white/10 bg-black/20">
          <div className="flex items-center gap-2 px-2 sm:px-3 py-2">
            <span className="text-xs text-white/50 shrink-0">
              +{overflowParticipants.length} more
            </span>
            <div
              className={cn(
                "flex overflow-x-auto py-1",
                "scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent",
              )}
              style={{ gap: `${gridConfig.gap}px` }}
            >
              <AnimatePresence>
                {overflowParticipants.map((participant) => (
                  <motion.div
                    key={participant.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={cn(
                      "flex-shrink-0",
                      gridConfig.filmstripHeight,
                      gridConfig.filmstripWidth,
                    )}
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
        </div>
      )} */}
    </div>
  );
}
