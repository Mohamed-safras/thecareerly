import { CalendarDays, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface NextPaymentCardProps {
  amount: number;
  date: Date;
  onManage: () => void;
}

export function NextPaymentCard({
  amount,
  date,
  onManage,
}: NextPaymentCardProps) {
  return (
    <Card className="p-3 shadow-card rounded-lg border-0 bg-card relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Next payment</p>
            <div className="flex items-baseline gap-0.5">
              <span className="text-4xl font-bold">${amount}</span>
              <span className="text-lg text-foreground/70">.00</span>
            </div>
          </div>
          <div className="p-3 bg-primary/10 rounded-xl">
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3">
          on{" "}
          <span className="font-medium text-foreground">
            {format(date, "MMMM d, yyyy")}
          </span>
        </p>

        <Button className="w-full group" onClick={onManage}>
          Manage Payments
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Card>
  );
}
