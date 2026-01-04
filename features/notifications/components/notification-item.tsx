import { formatDistanceToNow } from "date-fns";
import { ChevronRight, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationPriority } from "@/types/notification";
import { Notification } from "@/interfaces/notification";

interface NotificationItemProps {
  notification: Notification;
  onAction?: (url: string) => void;
}

const priorityConfig: Record<
  NotificationPriority,
  {
    border: string;
    bg: string;
    icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
  }
> = {
  critical: {
    border: "border-l-red-500",
    bg: "bg-red-50 dark:bg-red-950/20",
    icon: AlertCircle,
    iconColor: "text-red-500",
  },
  high: {
    border: "border-l-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/20",
    icon: AlertTriangle,
    iconColor: "text-orange-500",
  },
  medium: {
    border: "border-l-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    icon: Info,
    iconColor: "text-blue-500",
  },
  low: {
    border: "border-l-gray-300",
    bg: "bg-muted/30",
    icon: Info,
    iconColor: "text-muted-foreground",
  },
};

export const NotificationItem = ({
  notification,
  onAction,
}: NotificationItemProps) => {
  const {
    priority,
    title,
    message,
    timestamp,
    isRead,
    actionUrl,
    actionLabel,
  } = notification;
  const config = priorityConfig[priority];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-start gap-4 p-4 border-l-4 rounded-r-lg transition-all",
        config.border,
        config.bg
      )}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        <Icon className={cn("h-5 w-5", config.iconColor)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground">{title}</h4>
            <p className="text-sm text-muted-foreground">{message}</p>
            <p className="text-xs text-muted-foreground/70">
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </p>
          </div>

          {/* Unread indicator */}
          {!isRead && (
            <div className="flex-shrink-0">
              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            </div>
          )}
        </div>
      </div>

      {/* Action */}
      {actionUrl && actionLabel && (
        <button
          onClick={() => onAction?.(actionUrl)}
          className="flex-shrink-0 flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          {actionLabel}
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
