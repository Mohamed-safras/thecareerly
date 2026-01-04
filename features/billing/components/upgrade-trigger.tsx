import { Sparkles } from "lucide-react";
import React from "react";

const UpgradeTrigger = () => {
  return (
    <div className="w-full p-3 flex items-center justify-between bg-secondary/30 border border-border rounded-lg  gap-3 cursor-pointer hover:bg-secondary transition-colors">
      <div className="flex items-start flex-col">
        <p className="font-semibold">Upgrade to Pro</p>
        <span className="text-sm">Unlock more benifits</span>
      </div>
      <div>
        <Sparkles className="w-5 h-5 animate-pulse" />
      </div>
    </div>
  );
};

export default UpgradeTrigger;
