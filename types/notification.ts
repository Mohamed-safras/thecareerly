export type NotificationType =
  | "candidate_update"
  | "interview_scheduled"
  | "offer_sent"
  | "payment_failed"
  | "renewal_reminder"
  | "card_expiring"
  | "spending_limit"
  | "approval_required"
  | "team_activity"
  | "system";

export type NotificationPriority = "low" | "medium" | "high" | "critical";

export type NotificationCategory = "activity" | "billing" | "system" | "team";
