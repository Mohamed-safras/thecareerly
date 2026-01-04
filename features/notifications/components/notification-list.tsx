import { Bell } from "lucide-react";
import { NotificationItem } from "./notification-item";
import { Notification } from "@/interfaces/notification";

interface NotificationListProps {
  notifications: Notification[];
  onAction?: (url: string) => void;
}

export const NotificationList = ({
  notifications,
  onAction,
}: NotificationListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Bell className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-1">No notifications</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          You&apo;re all caught up! New notifications will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onAction={onAction}
        />
      ))}
    </div>
  );
};
