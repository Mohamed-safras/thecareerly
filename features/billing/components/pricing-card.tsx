import { Check, Sparkles, Crown, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PricingPlan } from "@/interfaces/billing";

interface PricingCardProps {
  plan: PricingPlan;
  isCurrentPlan?: boolean;
  onSelect: (planId: string) => void;
}

const tierIcons = {
  starter: Sparkles,
  pro: Crown,
  enterprise: Building2,
};

export function PricingCard({
  plan,
  isCurrentPlan,
  onSelect,
}: PricingCardProps) {
  const isPopular = plan.popular;
  const TierIcon = tierIcons[plan.tier];

  return (
    <Card
      className={cn(
        "relative flex flex-col p-3 transition-all duration-300 hover:shadow-lg border-0 shadow-card",
        isPopular && "ring-2 ring-primary shadow-lg scale-[1.02]",
        isCurrentPlan && "bg-muted/30"
      )}
    >
      {isPopular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary border-0">
          Most Popular
        </Badge>
      )}

      <div>
        <div className="flex items-center gap-3 mb-3">
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center bg-muted"
            )}
          >
            <TierIcon
              className={cn(
                "h-5 w-5",
                plan.tier === "starter" && "text-foreground",
                plan.tier !== "starter" && "text-white"
              )}
            />
          </div>
          <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
        </div>

        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold">${plan.price}</span>
        <span className="text-muted-foreground">
          /{plan.billingPeriod === "monthly" ? "mo" : "yr"}
        </span>
      </div>

      <ul className="space-y-3 flex-1">
        {plan.features.slice(0, 6).map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="mt-0.5 p-0.5 rounded-full bg-primary/10">
              <Check className="h-3 w-3 text-primary" />
            </div>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
        {plan.features.length > 6 && (
          <li className="text-sm text-muted-foreground pl-6">
            +{plan.features.length - 6} more features
          </li>
        )}
      </ul>

      <Button
        className={cn(
          "w-full",
          isPopular && "gradient-primary border-0 hover:opacity-90"
        )}
        variant={isPopular ? "default" : "outline"}
        disabled={isCurrentPlan}
        onClick={() => onSelect(plan.id)}
      >
        {isCurrentPlan
          ? "Current Plan"
          : plan.tier === "enterprise"
          ? "Contact Sales"
          : "Get Started"}
      </Button>
    </Card>
  );
}
