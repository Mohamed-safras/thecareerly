"use client";
import React, { useState } from "react";
import { toast } from "sonner";

import { PricingCard } from "@/features/billing/components/pricing-card";
import { UpgradeDialog } from "@/features/billing/components/upgrade-dialog";
import {
  pricingPlans,
  currentSubscription,
  paymentMethods,
} from "@/features/billing/data/billing-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SubscriptionCard } from "@/features/billing/components/subscription-card";
import { NextPaymentCard } from "@/features/billing/components/next-payment-card";
import { PricingPlan } from "@/interfaces/billing";
import {
  PaymentHistoryTable,
  PaymentRecord,
} from "@/features/billing/components/payment-history-table";
import { PaymentInfoSection } from "@/features/billing/components/payment-info";

const paymentHistory: PaymentRecord[] = [
  {
    id: "1",
    amount: 65.0,
    status: "pending",
    recipient: { name: "Gabriel Banks" },
    date: new Date("2024-05-10"),
    paymentMethod: { type: "Visa", last4: "5432" },
  },
  {
    id: "2",
    amount: 250.0,
    status: "completed",
    recipient: { name: "Claudia Welch" },
    date: new Date("2024-04-10"),
    paymentMethod: { type: "Visa", last4: "5432" },
    details: {
      billingPlan: "Company Start",
      items: [
        "5 team members ($8 / month each)",
        "100 GB extra storage ($25.00)",
        "8 extra hours ($2 per 1 hour)",
      ],
      invoiceNumber: "EKG2SJFN",
      datePaid: new Date("2024-04-10"),
    },
  },
  {
    id: "3",
    amount: 50.0,
    status: "completed",
    recipient: { name: "Nina Sherman" },
    date: new Date("2024-03-10"),
    paymentMethod: { type: "Visa", last4: "5432" },
    details: {
      billingPlan: "Basic Plan",
      items: ["Monthly subscription"],
      invoiceNumber: "PLK8MNQR",
      datePaid: new Date("2024-03-10"),
    },
  },
  {
    id: "4",
    amount: 50.0,
    status: "completed",
    recipient: { name: "Elizabeth Robbins" },
    date: new Date("2024-02-10"),
    paymentMethod: { type: "Visa", last4: "5432" },
    details: {
      billingPlan: "Basic Plan",
      items: ["Monthly subscription"],
      invoiceNumber: "HTY3WDKL",
      datePaid: new Date("2024-02-10"),
    },
  },
  {
    id: "5",
    amount: 50.0,
    status: "completed",
    recipient: { name: "Elizabeth Robbins" },
    date: new Date("2024-02-10"),
    paymentMethod: { type: "Visa", last4: "5432" },
    details: {
      billingPlan: "Basic Plan",
      items: ["Monthly subscription"],
      invoiceNumber: "HTY3WDKL",
      datePaid: new Date("2024-02-10"),
    },
  },
  {
    id: "6",
    amount: 50.0,
    status: "completed",
    recipient: { name: "Elizabeth Robbins" },
    date: new Date("2024-02-10"),
    paymentMethod: { type: "Visa", last4: "5432" },
    details: {
      billingPlan: "Basic Plan",
      items: ["Monthly subscription"],
      invoiceNumber: "HTY3WDKL",
      datePaid: new Date("2024-02-10"),
    },
  },
];

const BillingWrapper = () => {
  const [subscription, setSubscription] = useState(currentSubscription);
  const [plansDialogOpen, setPlansDialogOpen] = useState(false);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const currentPlan = pricingPlans.find(
    (plan) => plan.id === subscription.planId
  )!;

  const handleSelectPlan = (planId: string) => {
    if (planId === subscription.planId) return;
    const plan = pricingPlans.find((p) => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
      setPlansDialogOpen(false);
      setUpgradeDialogOpen(true);
    }
  };

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
        <PaymentHistoryTable payments={paymentHistory} />
        <PaymentInfoSection
          methods={paymentMethods}
          subscription={{
            price: currentPlan.price,
            period: subscription.currentPeriodEnd,
          }}
          plan={currentPlan}
          onEdit={() => toast.info("Edit payment method")}
          onAdd={() => toast.info("Add payment method")}
          onChangePlan={() => setPlansDialogOpen(true)}
        />
      </div>

      {/* Plans Dialog */}
      <Dialog open={plansDialogOpen} onOpenChange={setPlansDialogOpen}>
        <DialogContent className="min-w-xs sm:min-w-2xl md:min-w-3xl lg:min-w-4xl xl:min-w-5xl 2xl:min-w-6xl max-w-7xl p-3 max-h-[calc(90vh-3rem)] m-auto overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Choose a plan</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-3 gap-3 mt-3">
            {pricingPlans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                isCurrentPlan={plan.id === subscription.planId}
                onSelect={handleSelectPlan}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>

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
    </div>
  );
};

export default BillingWrapper;
