import { useState } from "react";
import { format } from "date-fns";
import {
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  Receipt,
  ChevronRight,
  ExternalLink,
  BarChart3,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface PaymentRecord {
  id: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  recipient: {
    name: string;
    avatar?: string;
  };
  date: Date;
  paymentMethod: {
    type: string;
    last4: string;
  };
  details?: {
    billingPlan: string;
    items: string[];
    invoiceNumber: string;
    datePaid?: Date;
  };
}

interface PaymentHistoryTableProps {
  payments: PaymentRecord[];
  onUsageClick?: () => void;
  onAccessClick?: () => void;
}

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    label: "Paid",
    bgClass: "bg-emerald-50 dark:bg-emerald-500/10",
    textClass: "text-emerald-600 dark:text-emerald-400",
    dotClass: "bg-emerald-500",
  },
  pending: {
    icon: Clock,
    label: "Pending",
    bgClass: "bg-amber-50 dark:bg-amber-500/10",
    textClass: "text-amber-600 dark:text-amber-400",
    dotClass: "bg-amber-500",
  },
  failed: {
    icon: XCircle,
    label: "Failed",
    bgClass: "bg-red-50 dark:bg-red-500/10",
    textClass: "text-red-600 dark:text-red-400",
    dotClass: "bg-red-500",
  },
};

function PaymentRow({ payment }: { payment: PaymentRecord }) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[payment.status];
  const StatusIcon = status.icon;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Invoice downloaded");
  };

  return (
    <div className="border-b p-3 border-border/50 last:border-0">
      {/* Main Row - Clean & Simple */}
      <div
        className={cn(
          "flex items-center gap-4 p-3 cursor-pointer transition-colors rounded-lg -mx-2",
          "hover:bg-muted/50",
          expanded && "bg-muted/30"
        )}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Status Dot */}
        <div
          className={cn("w-2.5 h-2.5 rounded-full shrink-0", status.dotClass)}
        />

        {/* Amount & Plan */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-lg">
              ${payment.amount.toFixed(2)}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">
              {payment.details?.billingPlan || "Payment"}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-sm text-muted-foreground">
            <span>{format(payment.date, "MMM d, yyyy")}</span>
            <span>·</span>
            <span className="capitalize">
              {payment.paymentMethod.type} ••{payment.paymentMethod.last4}
            </span>
          </div>
        </div>

        {/* Status Badge */}
        <Badge
          variant="secondary"
          className={cn(
            "font-medium gap-1.5 py-1 px-2.5",
            status.bgClass,
            status.textClass
          )}
        >
          <StatusIcon className="w-3.5 h-3.5" />
          {status.label}
        </Badge>

        {/* Expand Arrow */}
        <ChevronRight
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform",
            expanded && "rotate-90"
          )}
        />
      </div>

      {/* Expanded Details - Simple Card */}
      {expanded && (
        <div className="p-3 animate-fade-in">
          <div className="bg-muted/30 rounded-lg p-3 ml-2">
            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Invoice</p>
                <p className="font-mono text-sm font-medium">
                  #{payment.details?.invoiceNumber || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Date</p>
                <p className="text-sm font-medium">
                  {format(payment.date, "MMM d, yyyy")}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                <p className={cn("text-sm font-medium", status.textClass)}>
                  {status.label}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Amount</p>
                <p className="text-sm font-bold">
                  ${payment.amount.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Items List */}
            {payment.details?.items && payment.details.items.length > 0 && (
              <div className="border-t border-border/50 pt-3 mb-4">
                <p className="text-xs text-muted-foreground mb-2">Items</p>
                <ul className="space-y-1">
                  {payment.details.items.map((item, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 h-9"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" />
                Download Invoice
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 h-9 text-muted-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  toast.info("Opening invoice details");
                }}
              >
                <ExternalLink className="w-4 h-4" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function PaymentHistoryTable({
  payments,
  onUsageClick,
  onAccessClick,
}: PaymentHistoryTableProps) {
  return (
    <Card className="w-full h-fit shadow-sm gap-0 p-0 border">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Receipt className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Payment History</h3>
            <p className="text-xs text-muted-foreground">
              {payments.length} transactions
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onUsageClick} className="gap-2">
            <BarChart3 className="h-4 w-4" />
            View Usage & Limits
          </Button>

          <Button
            variant="outline"
            onClick={onAccessClick}
            className="gap-2 w-full sm:w-auto"
          >
            <Users className="h-4 w-4" />
            Account & Access
          </Button>
          <Button variant="outline" size="sm" className="gap-2 h-9">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Payment List */}
      {payments.length > 0 ? (
        <div className="max-h-[calc(100vh)] overflow-y-scroll">
          {payments.map((payment) => (
            <PaymentRow key={payment.id} payment={payment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <Receipt className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">No payments yet</p>
        </div>
      )}
    </Card>
  );
}

export type { PaymentRecord };
