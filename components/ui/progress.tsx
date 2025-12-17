"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
}

function Progress({
  className,
  value,
  indicatorClassName,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-accent-foreground/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator asChild>
        <motion.div
          className={cn(
            "h-full w-full flex-1",
            indicatorClassName ||
              "bg-card-foreground dark:bg-primary-foreground"
          )}
          initial={{ x: "-100%" }}
          whileInView={{ x: `-${100 - (value || 0)}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: "circOut",
            delay: 0.2,
          }}
        />
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
