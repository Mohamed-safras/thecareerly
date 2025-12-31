import { useState } from "react";
import { CreditCard, Lock, CheckCircle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PricingPlan } from "@/interfaces/billing";

interface StripeCheckoutProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: PricingPlan;
  onSuccess: () => void;
}

export function StripeCheckout({
  open,
  onOpenChange,
  plan,
  onSuccess,
}: StripeCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : v;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsComplete(true);

    // Auto close after success
    setTimeout(() => {
      onSuccess();
      setIsComplete(false);
      setCardNumber("");
      setExpiry("");
      setCvc("");
      setName("");
    }, 1500);
  };

  const isFormValid =
    cardNumber.length >= 19 &&
    expiry.length >= 5 &&
    cvc.length >= 3 &&
    name.length > 0;

  if (isComplete) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center animate-in zoom-in duration-300">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Payment Successful!
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Your subscription to {plan.name} has been activated.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        {/* Stripe-like header */}
        <div className="bg-gradient-to-r from-[#635bff] to-[#7c3aed] px-6 py-4">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Secure Checkout
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6">
          {/* Order summary */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-foreground">{plan.name} Plan</p>
                <p className="text-sm text-muted-foreground">Billed monthly</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">
                  ${plan.price}
                </p>
                <p className="text-xs text-muted-foreground">/month</p>
              </div>
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Payment form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number" className="text-sm font-medium">
                Card number
              </Label>
              <div className="relative">
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
                  maxLength={19}
                  className="pl-10 h-11 bg-background border-border focus:border-[#635bff] focus:ring-[#635bff]"
                />
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry" className="text-sm font-medium">
                  Expiry date
                </Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                  className="h-11 bg-background border-border focus:border-[#635bff] focus:ring-[#635bff]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc" className="text-sm font-medium">
                  CVC
                </Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) =>
                    setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  maxLength={4}
                  className="h-11 bg-background border-border focus:border-[#635bff] focus:ring-[#635bff]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Cardholder name
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 bg-background border-border focus:border-[#635bff] focus:ring-[#635bff]"
              />
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isProcessing}
              className="w-full h-12 mt-4 bg-[#635bff] hover:bg-[#5851ea] text-white font-medium text-base"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Pay ${plan.price}</>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              Secured by Stripe. Demo mode - no real charges.
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
