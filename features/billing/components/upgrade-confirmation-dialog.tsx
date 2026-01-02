import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CreditCard } from "lucide-react";
import { Plan } from "@/interfaces/billing";

interface UpgradeConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fromPlan: Plan | null;
  toPlan: Plan | null;
  isYearly: boolean;
  onConfirm: () => void;
}

export const UpgradeConfirmationDialog = ({
  open,
  onOpenChange,
  fromPlan,
  toPlan,
  isYearly,
  onConfirm,
}: UpgradeConfirmationDialogProps) => {
  if (!fromPlan || !toPlan) return null;

  const isUpgrade = toPlan.monthlyPrice > fromPlan.monthlyPrice;
  const fromPrice = isYearly
    ? fromPlan.yearlyPrice / 12
    : fromPlan.monthlyPrice;
  const toPrice = isYearly ? toPlan.yearlyPrice / 12 : toPlan.monthlyPrice;
  const priceDiff = Math.abs(toPrice - fromPrice);

  // Calculate prorated amount (simplified - assuming mid-cycle)
  const daysRemaining = 15;
  const daysInMonth = 30;
  const proratedAmount = isUpgrade
    ? (priceDiff * (daysRemaining / daysInMonth)).toFixed(2)
    : (priceDiff * (daysRemaining / daysInMonth)).toFixed(2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[95vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            {isUpgrade ? "Upgrade" : "Downgrade"} Plan
          </DialogTitle>
          <DialogDescription>
            Review the changes to your subscription
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Plan Change Visual */}
          <div className="flex items-center justify-center gap-3 p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">From</p>
              <p className="font-semibold text-foreground">{fromPlan.name}</p>
              <p className="text-sm text-muted-foreground">
                ${Math.round(fromPrice)}/mo
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">To</p>
              <p className="font-semibold text-primary">{toPlan.name}</p>
              <p className="text-sm text-muted-foreground">
                ${Math.round(toPrice)}/mo
              </p>
            </div>
          </div>

          <Separator />

          {/* Billing Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              Billing Details
            </h4>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Billing cycle</span>
                <span className="text-foreground">
                  {isYearly ? "Yearly" : "Monthly"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  New {isYearly ? "yearly" : "monthly"} price
                </span>
                <span className="text-foreground">
                  ${isYearly ? toPlan.yearlyPrice : toPlan.monthlyPrice}
                </span>
              </div>
              {isUpgrade ? (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Prorated charge today
                  </span>
                  <span className="text-foreground">${proratedAmount}</span>
                </div>
              ) : (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Credit applied</span>
                  <span className="text-primary">+${proratedAmount}</span>
                </div>
              )}
            </div>
          </div>

          {!isUpgrade && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                Your new plan will take effect at the end of your current
                billing cycle. You&apos;ll retain access to all features until
                then.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} className="w-full sm:w-auto">
            Confirm {isUpgrade ? "Upgrade" : "Downgrade"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
