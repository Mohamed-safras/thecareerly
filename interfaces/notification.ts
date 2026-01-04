import {
  NotificationCategory,
  NotificationPriority,
  NotificationType,
} from "@/types/notification";

export interface Notification {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: Record<string, unknown>;
}

export interface NotificationPreferences {
  paymentFailures: boolean;
  renewalReminders: boolean;
  cardExpirationWarnings: boolean;
  spendingLimitAlerts: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}
