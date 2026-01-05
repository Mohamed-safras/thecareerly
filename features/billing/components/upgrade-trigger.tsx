import { Sparkles } from "lucide-react";

import { useSidebar } from "@/components/ui/sidebar";

const UpgradeTrigger = () => {
  const { state } = useSidebar();
  // Always render, but animate in/out with sidebar
  return (
    <div
      className={
        `w-full p-3 flex items-center justify-between bg-secondary/10 border border-border rounded-lg gap-3 cursor-pointer hover:bg-secondary transition-colors ` +
        `transition-all duration-200 ease-linear will-change-transform will-change-opacity will-change-max-height will-change-scale will-change-margin ` +
        (state === "expanded"
          ? "opacity-100 translate-x-0 max-h-32 pointer-events-auto"
          : "opacity-0 -translate-x-4 max-h-0 pointer-events-none overflow-hidden")
      }
      aria-hidden={state !== "expanded"}
      tabIndex={state === "expanded" ? 0 : -1}
    >
      <div className="flex items-start flex-col">
        <span className="text-sm font-medium">Upgrade to Pro</span>
        <span className="text-sm">Unlock more benifits</span>
      </div>
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary/100">
        <Sparkles className="w-4 h-4 animate-pulse" />
      </div>
    </div>
  );
};

export default UpgradeTrigger;
