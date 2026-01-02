import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const yearlySavingsPercent = 20;

export interface BillingToggleProps {
  isYearly: boolean;
  setIsYearly: React.Dispatch<React.SetStateAction<boolean>>;
}

const BillingToggle: React.FC<BillingToggleProps> = ({
  isYearly,
  setIsYearly,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 p-4 bg-muted/30 rounded-lg">
      <div className="flex items-center gap-3">
        <Label
          htmlFor="billing-toggle"
          className={`text-sm cursor-pointer transition-colors ${
            !isYearly ? "text-foreground font-medium" : "text-muted-foreground"
          }`}
        >
          Monthly
        </Label>
        <Switch
          id="billing-toggle"
          checked={isYearly}
          onCheckedChange={setIsYearly}
        />
        <Label
          htmlFor="billing-toggle"
          className={`text-sm cursor-pointer transition-colors ${
            isYearly ? "text-foreground font-medium" : "text-muted-foreground"
          }`}
        >
          Yearly
        </Label>
      </div>
      {isYearly && (
        <Badge
          variant="secondary"
          className="bg-primary/10 text-primary border-0"
        >
          Save {yearlySavingsPercent}%
        </Badge>
      )}
    </div>
  );
};

export default BillingToggle;
