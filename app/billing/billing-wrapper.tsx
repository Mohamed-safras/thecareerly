"use client";
import { useState } from "react";
import { toast } from "sonner";
import { UpgradeDialog } from "@/features/billing/components/upgrade-dialog";
import {
  pricingPlans,
  currentSubscription,
  paymentMethods,
  paymentHistory,
} from "@/features/billing/data/billing-data";
import { PricingPlan } from "@/interfaces/billing";
import { PaymentHistoryTable } from "@/features/billing/components/payment-history-table";
import { PaymentInfoSection } from "@/features/billing/components/payment-info";
import BillingSettingsWrapper from "./billing-settings-wrapper";
import { UsageDashboardDialog } from "@/features/billing/components/usage-dashboard-dialog";
import { PlanManagementDialog } from "@/features/billing/components/plan-management-dialog";
import { AccountAccess } from "@/features/access/components/account-access";

const BillingWrapper = () => {
  const [subscription, setSubscription] = useState(currentSubscription);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [usageDialogOpen, setUsageDialogOpen] = useState(false);
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [accessDialogOpen, setAccessDialogOpen] = useState(false);

  const currentPlan = pricingPlans.find(
    (plan) => plan.id === subscription.planId
  )!;

  const handleUpgradeConfirm = () => {
    if (selectedPlan) {
      setSubscription((prev) => ({ ...prev, planId: selectedPlan.id }));
      toast.success(`Successfully switched to ${selectedPlan.name} plan`);
      setUpgradeDialogOpen(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div>
      <div className="p-3 flex justify-between gap-3 border-l">
        <div className="flex flex-col gap-3 flex-1">
          <BillingSettingsWrapper />
          <PaymentHistoryTable
            payments={paymentHistory}
            onUsageClick={() => setUsageDialogOpen(true)}
            onAccessClick={() => setAccessDialogOpen(true)}
          />
        </div>

        <PaymentInfoSection
          methods={paymentMethods}
          subscription={{
            price: currentPlan.price,
            period: subscription.currentPeriodEnd,
          }}
          plan={currentPlan}
          onEdit={() => toast.info("Edit payment method")}
          onAdd={() => toast.info("Add payment method")}
          onChangePlan={() => setPlanDialogOpen(true)}
        />
      </div>

      {/* Upgrade Dialog */}
      {selectedPlan && (
        <UpgradeDialog
          open={upgradeDialogOpen}
          onOpenChange={setUpgradeDialogOpen}
          currentPlan={currentPlan}
          targetPlan={selectedPlan}
          onConfirm={handleUpgradeConfirm}
        />
      )}

      <UsageDashboardDialog
        open={usageDialogOpen}
        onOpenChange={setUsageDialogOpen}
      />

      <PlanManagementDialog
        open={planDialogOpen}
        onOpenChange={setPlanDialogOpen}
      />

      <AccountAccess
        open={accessDialogOpen}
        onOpenChange={setAccessDialogOpen}
      />
    </div>
  );
};

export default BillingWrapper;
