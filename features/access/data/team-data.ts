import { SeatAllocation, TeamMember } from "@/interfaces/access";
import { BillingPermission } from "@/interfaces/billing";

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "owner",
    status: "active",
    joinedAt: "2024-01-15",
    lastActive: "2024-12-28",
    costPerMonth: 49,
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@company.com",
    role: "admin",
    status: "active",
    joinedAt: "2024-02-20",
    lastActive: "2024-12-27",
    costPerMonth: 49,
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily@company.com",
    role: "member",
    status: "active",
    joinedAt: "2024-03-10",
    lastActive: "2024-12-26",
    costPerMonth: 29,
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james@company.com",
    role: "member",
    status: "pending",
    joinedAt: "2024-12-20",
    lastActive: "2024-12-20",
    costPerMonth: 29,
  },
  {
    id: "5",
    name: "Anna Martinez",
    email: "anna@company.com",
    role: "viewer",
    status: "active",
    joinedAt: "2024-06-15",
    lastActive: "2024-12-25",
    costPerMonth: 0,
  },
];

export const seatAllocation: SeatAllocation = {
  total: 10,
  used: 4,
  pending: 1,
  costPerSeat: 29,
};

export const billingPermissions: BillingPermission[] = [
  {
    id: "view_invoices",
    name: "View Invoices",
    description: "Can view billing history and download invoices",
    roles: ["owner", "admin"],
  },
  {
    id: "manage_subscription",
    name: "Manage Subscription",
    description: "Can upgrade, downgrade, or cancel subscription",
    roles: ["owner"],
  },
  {
    id: "add_payment_method",
    name: "Add Payment Methods",
    description: "Can add or remove payment methods",
    roles: ["owner", "admin"],
  },
  {
    id: "invite_members",
    name: "Invite Team Members",
    description: "Can invite new members to the team",
    roles: ["owner", "admin"],
  },
  {
    id: "remove_members",
    name: "Remove Team Members",
    description: "Can remove members from the team",
    roles: ["owner", "admin"],
  },
  {
    id: "view_usage",
    name: "View Usage Analytics",
    description: "Can view usage metrics and analytics",
    roles: ["owner", "admin", "member"],
  },
];

export const roleConfig = {
  owner: {
    label: "Owner",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  admin: {
    label: "Admin",
    color: "bg-status-new-bg text-status-new border-status-new/20",
  },
  member: {
    label: "Member",
    color: "bg-status-active-bg text-status-active border-status-active/20",
  },
  viewer: {
    label: "Viewer",
    color: "bg-muted text-muted-foreground border-border",
  },
};

export const statusConfig = {
  active: {
    label: "Active",
    color: "bg-status-active-bg text-status-active",
  },
  pending: {
    label: "Pending",
    color: "bg-status-hold-bg text-status-hold",
  },
  deactivated: {
    label: "Deactivated",
    color: "bg-status-archived-bg text-status-archived",
  },
};
