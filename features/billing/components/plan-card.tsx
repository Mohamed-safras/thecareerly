import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Plan } from "@/interfaces/billing";

interface PlanCardProps {
  plan: Plan;
  isYearly: boolean;
  isCurrentPlan: boolean;
  onSelect: (planId: string) => void;
}

export const PlanCard = ({
  plan,
  isYearly,
  isCurrentPlan,
  onSelect,
}: PlanCardProps) => {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const monthlyEquivalent = isYearly
    ? Math.round(plan.yearlyPrice / 12)
    : plan.monthlyPrice;
  const savings = isYearly ? plan.monthlyPrice * 12 - plan.yearlyPrice : 0;

  return (
    <Card
      className={cn(
        "relative flex flex-col h-full transition-all",
        plan.popular && "border-primary shadow-md",
        isCurrentPlan && "ring-2 ring-primary/50"
      )}
    >
      {plan.popular && (
        <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3">
          Most Popular
        </Badge>
      )}

      <CardHeader className="text-center pb-4 pt-6">
        <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>

        <div className="mt-4">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl sm:text-4xl font-bold text-foreground">
              ${monthlyEquivalent}
            </span>
            <span className="text-muted-foreground">/month</span>
          </div>
          {isYearly && (
            <p className="text-sm text-muted-foreground mt-1">
              ${price} billed yearly
              {savings > 0 && (
                <span className="text-primary font-medium ml-1">
                  (Save ${savings})
                </span>
              )}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col pt-0">
        <ul className="space-y-3 flex-1">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={() => onSelect(plan.id)}
          variant={
            isCurrentPlan ? "outline" : plan.popular ? "default" : "secondary"
          }
          className="w-full mt-6"
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? "Current Plan" : "Select Plan"}
        </Button>
      </CardContent>
    </Card>
  );
};
