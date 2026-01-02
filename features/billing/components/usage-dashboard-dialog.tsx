import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { UsageMetricsCard } from "./usage-metrics-card";
import { UsageAlertsCard } from "./usage-alerts-card";
import { UsageHistoryChart } from "./usage-history-chart";
import { usageData, usageAlerts, usageHistory } from "../data/usage-data";
import { Gauge } from "lucide-react";

interface UsageDashboardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UsageDashboardDialog = ({
  open,
  onOpenChange,
}: UsageDashboardDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-xs sm:min-w-2xl md:min-w-3xl lg:min-w-4xl xl:min-w-5xl 2xl:min-w-6xl max-w-7xl p-0 max-h-[calc(90vh-3rem)] m-auto overflow-y-auto">
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <Gauge className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold">
                Usage & Limits
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Monitor your resource consumption and plan limits
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
          {/* Usage Metrics */}
          <section>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              Current Usage
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {usageData.map((metric) => (
                <UsageMetricsCard key={metric.id} metric={metric} />
              ))}
            </div>
          </section>

          {/* Alerts */}
          <UsageAlertsCard alerts={usageAlerts} />

          {/* Usage History */}
          <UsageHistoryChart data={usageHistory} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
