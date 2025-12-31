import { Crown, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PricingPlan } from "@/interfaces/billing";

interface SubscriptionCardProps {
  plan: PricingPlan;
  onChangePlan: () => void;
}

export function SubscriptionCard({
  plan,
  onChangePlan,
}: SubscriptionCardProps) {
  const isPro = plan.tier === "pro";
  const isEnterprise = plan.tier === "enterprise";

  return (
    <div className="card-3d">
      <div
        className={cn(
          "card-3d-inner card-shine relative overflow-hidden rounded-lg p-3 text-white h-fit shadow-credit-card",
          plan.tier === "starter" &&
            "bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800",
          isPro &&
            "bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600",
          isEnterprise &&
            "bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        )}
      >
        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/5" />
        <div className="absolute top-1/2 right-8 w-24 h-24 rounded-full bg-white/5" />

        {/* Floating icons */}
        <div className="absolute top-4 right-4 p-3 bg-white/20 rounded-lg backdrop-blur-sm">
          {isPro ? (
            <Crown className="h-5 w-5" />
          ) : isEnterprise ? (
            <Zap className="h-5 w-5" />
          ) : (
            <Sparkles className="h-5 w-5" />
          )}
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <p className="text-sm w-fit text-foreground">
              Current subscription plan
            </p>

            <div className="flex items-baseline gap-1 mb-6 w-fit">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-lg text-white/90">.00</span>
            </div>

            <p className="text-lg font-bold mb-3">{plan.name}</p>
          </div>

          <Button
            variant="secondary"
            className="w-full group bg-background text-foreground border-0 "
            onClick={onChangePlan}
          >
            Change Plan
          </Button>
        </div>
      </div>
    </div>
  );
}
