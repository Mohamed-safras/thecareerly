import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Participant } from "@/interfaces/interview";
import { VideoParticipant } from "./video-participant";

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface VideoGridProps {
  participants: Participant[];
  localParticipantId?: string;
  layout?: "grid" | "together" | "gallery" | "focus";
  className?: string;
}

interface FilmstripBarProps {
  participants: Participant[];
  localParticipantId?: string;
  pinnedId: string | null;
  onPin: (id: string | null) => void;
  filmstripHeight: string;
  filmstripWidth: string;
  gap: number;
  label?: string;
  className?: string;
}

function FilmstripBar({
  participants,
  localParticipantId,
  pinnedId,
  onPin,
  filmstripHeight,
  filmstripWidth,
  gap,
  label,
  className,
}: FilmstripBarProps) {
  if (participants.length === 0) return null;

  return (
    <div
      className={cn(
        "shrink-0 w-full border-t border-muted/30 dark:border-muted-foreground/30",
        className,
      )}
    >
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <div
          className="flex items-center justify-start px-3 py-3 min-w-max"
          style={{ gap: `${gap}px` }}
        >
          {label && (
            <span className="text-xs text-muted-foreground shrink-0">
              {label}
            </span>
          )}
          <AnimatePresence>
            {participants.map((participant) => (
              <motion.div
                key={participant.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={cn("flex-shrink-0", filmstripHeight, filmstripWidth)}
              >
                <VideoParticipant
                  participant={participant}
                  isLocal={participant.id === localParticipantId}
                  isPinned={participant.id === pinnedId}
                  onPin={() =>
                    onPin(pinnedId === participant.id ? null : participant.id)
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function getScreenSize(width: number): ScreenSize {
  if (width < 480) return "xs";
  if (width < 640) return "sm";
  if (width < 1024) return "md";
  if (width < 1280) return "lg";
  if (width < 1536) return "xl";
  return "2xl";
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
  // Mobile XS (< 480px) — 1 col, max 1 row
  if (screenSize === "xs") {
    return {
      cols: 1,
      maxRows: 1,
      maxWidth: "max-w-full",
      gap: 6,
      filmstripHeight: "h-14",
      filmstripWidth: "w-20",
    };
  }

  // Mobile SM (480–639px) — max 1 col, max 2 rows
  if (screenSize === "sm") {
    return {
      cols: 1,
      maxRows: 2,
      maxWidth: "max-w-sm",
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

  // Desktop LG (1024–1279px) & XL Desktop (1280–1535px) — max 2 cols, max 2 rows
  if (screenSize === "lg" || screenSize === "xl") {
    let cols = 2;
    let maxWidth = "max-w-2xl";
    if (count === 1) {
      cols = 1;
      maxWidth = "max-w-xl";
    } else {
      cols = 2;
      maxWidth = "max-w-2xl";
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

  // 2XL Desktop (≥1536px) — max 3 cols, max 3 rows
  let cols = 3;
  let maxWidth = "max-w-6xl";
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
  } else {
    cols = 3;
    maxWidth = "max-w-6xl";
  }
  return {
    cols,
    maxRows: 3,
    maxWidth,
    gap: 12,
    filmstripHeight: "h-28",
    filmstripWidth: "w-38",
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
      <div className={cn("flex flex-col h-full w-full", className)}>
        {/* Main speaker - properly centered */}
        <div className="flex-1 min-h-0 w-full overflow-hidden">
          <div className="h-full w-full flex items-center justify-center p-3">
            <motion.div
              layout
              className={cn(
                "aspect-video",
                isMobile ? "w-full" : "w-full max-w-5xl",
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
        </div>

        {/* Filmstrip for other participants */}
        {/* <FilmstripBar
          participants={otherParticipants}
          localParticipantId={localParticipantId}
          pinnedId={pinnedId}
          onPin={setPinnedId}
          filmstripHeight={gridConfig.filmstripHeight}
          filmstripWidth={gridConfig.filmstripWidth}
          gap={gridConfig.gap}
        /> */}
      </div>
    );
  }

  // Gallery layout - responsive grid with centered last row
  return (
    <div className={cn("h-full w-full flex flex-col", className)}>
      {/* Main grid area */}
      <div className="flex-1 min-h-0 w-full overflow-hidden">
        <div className="h-full w-full flex items-center justify-center p-3">
          <div
            className={cn(
              "flex flex-wrap justify-center w-full content-center",
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
      </div>

      {/* Overflow scrollable filmstrip */}
      <FilmstripBar
        participants={overflowParticipants}
        localParticipantId={localParticipantId}
        pinnedId={pinnedId}
        onPin={setPinnedId}
        filmstripHeight={gridConfig.filmstripHeight}
        filmstripWidth={gridConfig.filmstripWidth}
        gap={gridConfig.gap}
        label={`+${overflowParticipants.length} more`}
      />
    </div>
  );
}
