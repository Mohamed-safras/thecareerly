import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PricingPlan } from "@/interfaces/billing";
import { StripeCheckout } from "./stripe-checkout";

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan: PricingPlan;
  targetPlan: PricingPlan;
  onConfirm: () => void;
}

export function UpgradeDialog({
  open,
  onOpenChange,
  currentPlan,
  targetPlan,
  onConfirm,
}: UpgradeDialogProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const isUpgrade = targetPlan.price > currentPlan.price;
  const priceDifference = Math.abs(targetPlan.price - currentPlan.price);

  const handleProceedToPayment = () => {
    setShowCheckout(true);
  };

  const handlePaymentSuccess = () => {
    setShowCheckout(false);
    onConfirm();
  };

  // Get new features in target plan
  const newFeatures = targetPlan.features.filter(
    (feature) => !currentPlan.features.includes(feature)
  );

  if (showCheckout) {
    return (
      <StripeCheckout
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setShowCheckout(false);
          }
          onOpenChange(isOpen);
        }}
        plan={targetPlan}
        onSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <Badge variant="secondary">
              {isUpgrade ? "Upgrade" : "Downgrade"}
            </Badge>
          </div>
          <DialogTitle>
            {isUpgrade ? "Upgrade to" : "Switch to"} {targetPlan.name}
          </DialogTitle>
          <DialogDescription>
            {isUpgrade
              ? "Unlock more features and higher limits for your recruitment needs."
              : "You'll have reduced limits and fewer features."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-6">
          {/* Plan comparison */}
          <div className="flex items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="text-center flex-1">
              <p className="text-sm text-muted-foreground">Current</p>
              <p className="font-semibold">{currentPlan.name}</p>
              <p className="text-2xl font-bold">${currentPlan.price}</p>
              <p className="text-xs text-muted-foreground">/month</p>
            </div>

            <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />

            <div
              className={cn(
                "text-center flex-1 p-3 rounded-lg",
                isUpgrade ? "bg-primary/10" : "bg-muted"
              )}
            >
              <p className="text-sm text-muted-foreground">New</p>
              <p className="font-semibold">{targetPlan.name}</p>
              <p className="text-2xl font-bold">${targetPlan.price}</p>
              <p className="text-xs text-muted-foreground">/month</p>
            </div>
          </div>

          {/* New features */}
          {isUpgrade && newFeatures.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-3">What you&apos;ll get:</p>
              <ul className="space-y-2">
                {newFeatures.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
                {newFeatures.length > 4 && (
                  <li className="text-sm text-muted-foreground">
                    +{newFeatures.length - 4} more features
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Price change */}
          <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm">Monthly change</span>
              <span
                className={cn(
                  "font-semibold",
                  isUpgrade ? "text-foreground" : "text-success"
                )}
              >
                {isUpgrade ? "+" : "-"}${priceDifference}/mo
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleProceedToPayment}
            className="bg-[#635bff] hover:bg-[#5851ea]"
          >
            {isUpgrade ? `Proceed to Payment` : `Switch to ${targetPlan.name}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
