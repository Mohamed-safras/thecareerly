// components/AnimatedIconButton.tsx
"use client";

import React from "react";
import { motion, type MotionProps } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type AnimatedIconButtonProps = {
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
  busy?: boolean;
  busyIcon?: React.ReactNode;
  className?: string;
  size?: number;
  pulse?: boolean;
  animation?: "float" | "breath" | "bounce" | "tilt" | "orbit";
  /** how much to scale on effects (0.02 = +2%) */
  scaleDelta?: number;
  /** vertical travel in px for float/bounce */
  yDelta?: number;
  /** degrees for tilt hover */
  tiltDeg?: number;
  disabled?: boolean;
};

export function AnimatedIconButton({
  onClick,
  icon,
  label,
  busy = false,
  busyIcon,
  className,
  size = 48,
  pulse = true,
  animation = "float",
  scaleDelta = 0.02,
  yDelta = 2,
  tiltDeg = 4,
  disabled = false,
}: AnimatedIconButtonProps) {
  const isInactive = disabled || busy; // single source of truth

  const hoverScale = 1 + scaleDelta;
  const tapScale = Math.max(0.9, 1 - scaleDelta * 0.5);

  const commonHover = {
    whileHover: { scale: hoverScale },
    whileTap: { scale: tapScale },
  };

  const presets: Record<
    NonNullable<AnimatedIconButtonProps["animation"]>,
    Pick<
      MotionProps,
      "initial" | "animate" | "transition" | "whileHover" | "whileTap"
    >
  > = {
    float: {
      initial: { scale: 1, y: 0 },
      animate: { y: [0, -yDelta, 0] },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
      ...commonHover,
    },
    breath: {
      initial: { scale: 1 },
      animate: { scale: [1, 1 + scaleDelta, 1] },
      transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
      ...commonHover,
    },
    bounce: {
      initial: { y: 0 },
      animate: { y: [0, -yDelta * 1.5, 0] },
      transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" },
      ...commonHover,
    },
    tilt: {
      initial: { rotate: 0, scale: 1 },
      whileHover: { scale: hoverScale, rotate: -tiltDeg },
      whileTap: { scale: tapScale, rotate: 0 },
    },
    orbit: {
      initial: { scale: 1 },
      ...commonHover,
    },
  };

  const p = presets[animation];

  // Disable all motion/hover/tap when inactive
  const initial = p.initial;
  const animate = isInactive ? undefined : p.animate;
  const transition = isInactive ? undefined : p.transition;
  const whileHover = isInactive ? undefined : p.whileHover;
  const whileTap = isInactive ? undefined : p.whileTap;

  const handleClick = () => {
    if (isInactive) return;
    if (onClick) onClick();
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* idle pulse ring (active only) */}
      {pulse && !isInactive && animation !== "orbit" && (
        <span className="pointer-events-none absolute inset-0 rounded-full bg-primary/15 animate-ping" />
      )}

      {/* orbit ring (active only) */}
      {animation === "orbit" && !isInactive && (
        <motion.span
          className="pointer-events-none absolute -inset-1 rounded-full ring-2 ring-primary/20"
          style={{ transformOrigin: "50% 50%" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      )}

      <Button
        asChild
        aria-label={label}
        aria-busy={busy}
        aria-disabled={isInactive}
        data-state={isInactive ? "inactive" : "active"}
        disabled={isInactive}
        className={`rounded-full shadow-md ${
          isInactive ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        } ${className ?? ""}`}
        style={{ width: size, height: size, padding: 0 }}
      >
        <motion.button
          type="button"
          onClick={handleClick}
          disabled={isInactive}
          tabIndex={isInactive ? -1 : 0}
          initial={initial}
          animate={animate}
          transition={transition}
          whileHover={whileHover}
          whileTap={whileTap}
          className="flex items-center justify-center"
        >
          {busy
            ? busyIcon ?? <Loader2 className="h-4 w-4 animate-spin" />
            : icon}
        </motion.button>
      </Button>
    </div>
  );
}
