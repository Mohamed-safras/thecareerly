import { NotificationPreferences } from "@/interfaces/notification";

export const defaultNotificationPreferences: NotificationPreferences = {
  paymentFailures: true,
  renewalReminders: true,
  cardExpirationWarnings: true,
  spendingLimitAlerts: true,
  emailNotifications: true,
  pushNotifications: false,
};
