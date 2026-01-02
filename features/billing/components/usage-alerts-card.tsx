import React from "react";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UsageAlert } from "@/interfaces/billing";

interface UsageAlertsCardProps {
  alerts: UsageAlert[];
  onDismiss?: (id: string) => void;
}

const severityConfig = {
  critical: {
    icon: AlertCircle,
    bgColor: "bg-destructive/10 border-destructive/30",
    iconColor: "text-destructive",
    badge: "bg-destructive/10 text-destructive border-transparent",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-muted/50 border-border",
    iconColor: "text-primary",
    badge: "bg-primary/10 text-primary border-transparent",
  },
  info: {
    icon: Info,
    bgColor: "bg-muted/30 border-border",
    iconColor: "text-muted-foreground",
    badge: "bg-muted text-muted-foreground border-transparent",
  },
};

export const UsageAlertsCard = ({
  alerts,
  onDismiss,
}: UsageAlertsCardProps) => {
  if (alerts.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Active Alerts
        </h3>
        <Badge variant="outline" className="text-xs">
          {alerts.length} alert{alerts.length !== 1 ? "s" : ""}
        </Badge>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;

          return (
            <div
              key={alert.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg border",
                config.bgColor
              )}
            >
              <Icon
                className={cn("h-5 w-5 mt-0.5 shrink-0", config.iconColor)}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-medium text-sm">{alert.title}</span>
                  <Badge
                    variant="outline"
                    className={cn("text-xs capitalize", config.badge)}
                  >
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {alert.timestamp.toLocaleDateString()}
                </p>
              </div>
              {onDismiss && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={() => onDismiss(alert.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
