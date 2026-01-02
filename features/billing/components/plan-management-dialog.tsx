import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";

import { PlanCard } from "./plan-card";
import { FeatureComparisonTable } from "./feature-comparison-table";
import { Plan } from "@/interfaces/billing";
import { currentPlan, plans, trialInfo } from "../data/plans-data";
import { TrialStatusCard } from "./trial-status-card";
import { UpgradeConfirmationDialog } from "./upgrade-confirmation-dialog";
import BillingToggle from "./billing-toggle";

interface PlanManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PlanManagementDialog = ({
  open,
  onOpenChange,
}: PlanManagementDialogProps) => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const currentPlanData = plans.find((p) => p.id === currentPlan.id);

  const handleSelectPlan = (planId: string) => {
    if (planId === currentPlan.id) return;
    const plan = plans.find((p) => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
      setConfirmDialogOpen(true);
    }
  };

  const handleConfirmChange = () => {
    if (selectedPlan) {
      toast.success(`Successfully switched to ${selectedPlan.name} plan`);
      setConfirmDialogOpen(false);
      setSelectedPlan(null);
      onOpenChange(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="min-w-xs sm:min-w-2xl md:min-w-3xl lg:min-w-4xl xl:min-w-5xl 2xl:min-w-6xl max-w-7xl p-0 max-h-[calc(90vh-3rem)] m-auto overflow-y-auto">
          <DialogHeader className="sticky top-0 z-10 px-6 pt-6 pb-4 border-b bg-muted">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold">
                  Plan Management
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Choose the plan that best fits your needs
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-3  space-y-3">
            {/* Trial Status */}
            {trialInfo.isActive && (
              <TrialStatusCard
                trial={trialInfo}
                onUpgrade={() => handleSelectPlan("professional")}
              />
            )}

            {/* Billing Toggle */}
            <BillingToggle isYearly={isYearly} setIsYearly={setIsYearly} />

            <Tabs defaultValue="plans" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-xs mx-auto">
                <TabsTrigger value="plans">Plans</TabsTrigger>
                <TabsTrigger value="compare">Compare</TabsTrigger>
              </TabsList>

              <TabsContent value="plans" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                  {plans.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      isYearly={isYearly}
                      isCurrentPlan={plan.id === currentPlan.id}
                      onSelect={handleSelectPlan}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="compare" className="mt-6">
                <FeatureComparisonTable />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      <UpgradeConfirmationDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        fromPlan={currentPlanData || null}
        toPlan={selectedPlan}
        isYearly={isYearly}
        onConfirm={handleConfirmChange}
      />
    </>
  );
};
