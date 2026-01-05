import { Zap } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import React from "react";

const UpgradeTrigger = () => {
  const { state } = useSidebar();
  // Always render, but animate in/out with sidebar
  return (
    <div
      className={
        `w-full p-3 flex items-center justify-between bg-muted/70 border rounded-lg gap-3 cursor-pointer relative overflow-hidden hover:bg-muted/100` +
        `transition-all duration-200 ease-linear will-change-transform will-change-opacity will-change-max-height will-change-scale will-change-margin ` +
        (state === "expanded"
          ? "opacity-100 translate-x-0 max-h-32 pointer-events-auto"
          : "opacity-0 -translate-x-4 max-h-0 pointer-events-none overflow-hidden")
      }
      aria-hidden={state !== "expanded"}
      tabIndex={state === "expanded" ? 0 : -1}
      style={{ zIndex: 1 }}
    >
      {/* Animated Instagram gradient border only */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg z-0 opacity-0 hover:opacity-100 focus-visible:opacity-100 border-gradient-animate"
      />
      <style>{`
        .border-gradient-animate {
          border: 1px solid transparent;
          background: linear-gradient(90deg, #fdc468, #df4996, #3f5efb, #fd5e53, #fdc468 100%) border-box;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          border-radius: 0.5rem;
          position: absolute;
          inset: 0;
          z-index: 0;
          transition: opacity 0.3s;
          background-size: 200% 100%;
          background-position: 0% 0%;
        }
        .group:hover .border-gradient-animate,
        .group:focus-visible .border-gradient-animate {
          animation: border-move 1.2s linear forwards;
          opacity: 1;
        }
        @keyframes border-move {
          from {
            background-position: 0% 0%;
          }
          to {
            background-position: 100% 0%;
          }
        }
      `}</style>
      <div className="relative z-10 flex items-start flex-col">
        <span className="text-sm font-medium">Upgrade to Pro</span>
        <span className="text-sm">Unlock more benifits</span>
      </div>
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary/100 relative z-10">
        <Zap className="w-4 h-4 animate-pulse" fill="var(--primary)" />
      </div>
    </div>
  );
};

export default UpgradeTrigger;
