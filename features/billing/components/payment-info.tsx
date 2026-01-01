import {
  Plus,
  Pencil,
  CreditCard as CreditCardIcon,
  Trash2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PaymentMethod, PricingPlan } from "@/interfaces/billing";
import { CreditCard } from "./credit-card";
import { Separator } from "@/components/ui/separator";
import { NextPaymentCard } from "./next-payment-card";
import { toast } from "sonner";
import { SubscriptionCard } from "./subscription-card";
import { pricingPlans } from "../data/billing-data";

interface PaymentInfoSectionProps {
  methods: PaymentMethod[];
  subscription?: {
    price: number;
    period: Date;
  };
  plan: PricingPlan;
  onEdit: () => void;
  onAdd: () => void;
  onChangePlan: () => void;
}

export function PaymentInfoSection({
  methods,
  subscription,
  plan,
  onEdit,
  onAdd,
  onChangePlan,
}: PaymentInfoSectionProps) {
  const defaultMethod = methods.find((m) => m.isDefault) || methods[0];
  // sticky z-10 top-18
  return (
    <Card className="p-3  h-fit w-fit bg-gradient-to-b from-card to-card/80">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <CreditCardIcon className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-semibold">Payment Method</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={onEdit}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>

      <SubscriptionCard plan={plan} onChangePlan={onChangePlan} />

      <NextPaymentCard
        amount={subscription?.price || 0}
        date={
          subscription?.period ||
          new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
        }
        onManage={() => toast.info("Manage payments")}
      />

      {/* Main Credit Card */}
      {defaultMethod && (
        <div className="relative">
          <CreditCard
            brand={
              defaultMethod.brand?.toLowerCase() === "mastercard"
                ? "mastercard"
                : "visa"
            }
            last4={defaultMethod.last4}
            cardholderName="Mohamed Safras"
            expiryMonth={defaultMethod.expiryMonth || 12}
            expiryYear={defaultMethod.expiryYear || 2026}
          />
          <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] px-2">
            Default
          </Badge>
        </div>
      )}

      <Separator />

      {/* Additional Cards */}
      {methods.length > 1 && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Other Cards
          </p>
          {methods.slice(1).map((method) => (
            <div
              key={method.id}
              className={cn(
                "group flex items-center justify-between p-3 rounded-xl border border-border/50 transition-all",
                "hover:border-primary/30 hover:bg-muted/50 cursor-pointer"
              )}
            >
              <div className="flex items-center gap-3">
                {/* Mini card preview */}
                <div
                  className={cn(
                    "w-10 h-7 rounded-md flex items-center justify-center text-white text-[8px] font-bold shadow-sm",
                    method.brand?.toLowerCase() === "mastercard"
                      ? "bg-gradient-to-br from-gray-800 to-red-900"
                      : "bg-gradient-to-br from-slate-700 to-slate-900"
                  )}
                >
                  {method.brand?.toLowerCase() === "mastercard" ? (
                    <div className="flex -space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    </div>
                  ) : (
                    <span className="text-[8px] font-bold italic">VISA</span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">•••• {method.last4}</p>
                  <p className="text-xs text-muted-foreground">
                    Expires {method.expiryMonth?.toString().padStart(2, "0")}/
                    {method.expiryYear?.toString().slice(-2)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <Button
        variant="outline"
        size="sm"
        className="w-full gap-1.5 h-10 border-dashed hover:border-primary hover:bg-primary/5"
        onClick={onAdd}
      >
        <Plus className="h-4 w-4" />
        Add new card
      </Button>
    </Card>
  );
}
