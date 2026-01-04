import { Notification } from "@/interfaces/notification";

export const mockNotifications: Notification[] = [
  // Critical - Payment & Billing
  {
    id: "1",
    type: "payment_failed",
    category: "billing",
    priority: "critical",
    title: "Payment Failed",
    message:
      "Your latest payment of $299 failed. Please update your payment method to avoid service interruption.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    isRead: false,
    actionUrl: "/billing",
    actionLabel: "Update Payment",
  },
  {
    id: "2",
    type: "card_expiring",
    category: "billing",
    priority: "high",
    title: "Credit Card Expiring Soon",
    message:
      "Your credit card ending in 4242 expires next month. Update your payment method to ensure uninterrupted service.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isRead: false,
    actionUrl: "/billing",
    actionLabel: "Update Card",
  },
  {
    id: "3",
    type: "spending_limit",
    category: "billing",
    priority: "high",
    title: "Spending Limit Warning",
    message:
      "You've used 85% of your monthly spending limit ($2,550 of $3,000). Consider increasing your limit.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    isRead: false,
    actionUrl: "/billing",
    actionLabel: "Manage Limits",
  },
  {
    id: "4",
    type: "renewal_reminder",
    category: "billing",
    priority: "medium",
    title: "Subscription Renewal in 7 Days",
    message:
      "Your Pro plan subscription will renew on Jan 11, 2026 for $299/month.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isRead: true,
    actionUrl: "/billing",
    actionLabel: "View Plan",
  },

  // Activity - Candidate Updates
  {
    id: "5",
    type: "candidate_update",
    category: "activity",
    priority: "medium",
    title: "Candidate Moved to Final Round",
    message:
      "Sarah Chen has been moved to the final interview stage for Senior Developer position.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
    isRead: false,
    actionUrl: "/candidates",
    actionLabel: "View Candidate",
  },
  {
    id: "6",
    type: "interview_scheduled",
    category: "activity",
    priority: "medium",
    title: "Interview Scheduled",
    message:
      "Technical interview with Michael Park scheduled for tomorrow at 2:00 PM.",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
    isRead: false,
    actionUrl: "/calendar",
    actionLabel: "View Calendar",
  },
  {
    id: "7",
    type: "offer_sent",
    category: "activity",
    priority: "medium",
    title: "Offer Letter Sent",
    message:
      "Offer letter has been sent to Emily Rodriguez for the Product Manager position.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    isRead: true,
    actionUrl: "/candidates",
    actionLabel: "View Details",
  },
  {
    id: "8",
    type: "approval_required",
    category: "activity",
    priority: "high",
    title: "Approval Required",
    message: "New job requisition for 'Data Scientist' requires your approval.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    isRead: false,
    actionUrl: "/approvals",
    actionLabel: "Review",
  },

  // Team Activity
  {
    id: "9",
    type: "team_activity",
    category: "team",
    priority: "low",
    title: "New Team Member Added",
    message:
      "John Smith has been added to your recruiting team as a Hiring Manager.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    isRead: true,
    actionUrl: "/billing",
    actionLabel: "View Team",
  },
  {
    id: "10",
    type: "team_activity",
    category: "team",
    priority: "low",
    title: "Role Updated",
    message: "Lisa Wang's role has been changed from Viewer to Editor.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    isRead: true,
  },

  // System Notifications
  {
    id: "11",
    type: "system",
    category: "system",
    priority: "low",
    title: "System Maintenance Scheduled",
    message:
      "Scheduled maintenance on Jan 10, 2026 from 2:00 AM - 4:00 AM UTC. Brief interruptions may occur.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    isRead: true,
  },
  {
    id: "12",
    type: "system",
    category: "system",
    priority: "medium",
    title: "New Feature Available",
    message:
      "AI-powered candidate matching is now available. Try it in the CV Matching section.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    isRead: true,
    actionUrl: "/cv-matching",
    actionLabel: "Explore",
  },
];
