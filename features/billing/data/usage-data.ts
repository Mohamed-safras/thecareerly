import {
  UsageAlert,
  UsageHistoryPoint,
  UsageMetric,
} from "@/interfaces/billing";

export const usageData: UsageMetric[] = [
  {
    id: "api-calls",
    name: "API Calls",
    used: 45230,
    limit: 50000,
    unit: "calls",
    icon: "api",
  },
  {
    id: "storage",
    name: "Storage",
    used: 78,
    limit: 100,
    unit: "GB",
    icon: "storage",
  },
  {
    id: "team-seats",
    name: "Team Seats",
    used: 8,
    limit: 10,
    unit: "seats",
    icon: "seats",
  },
];

export const usageAlerts: UsageAlert[] = [
  {
    id: "1",
    title: "API calls approaching limit",
    message:
      "You've used 90% of your monthly API calls. Consider upgrading your plan to avoid service interruptions.",
    severity: "critical",
    timestamp: new Date("2024-05-08"),
  },
  {
    id: "2",
    title: "Storage usage high",
    message:
      "Your storage usage is at 78%. Clean up unused files or upgrade for more space.",
    severity: "warning",
    timestamp: new Date("2024-05-07"),
  },
  {
    id: "3",
    title: "New team member added",
    message: "John Doe was added to your team. 8 of 10 seats now in use.",
    severity: "info",
    timestamp: new Date("2024-05-05"),
  },
];

export const usageHistory: UsageHistoryPoint[] = [
  { date: "Jan", apiCalls: 25, storage: 45, seats: 5 },
  { date: "Feb", apiCalls: 32, storage: 52, seats: 6 },
  { date: "Mar", apiCalls: 38, storage: 58, seats: 6 },
  { date: "Apr", apiCalls: 42, storage: 68, seats: 7 },
  { date: "May", apiCalls: 45, storage: 78, seats: 8 },
  { date: "Jun", apiCalls: 48, storage: 82, seats: 8 },
  { date: "Jul", apiCalls: 52, storage: 85, seats: 9 },
  { date: "Aug", apiCalls: 55, storage: 88, seats: 9 },
  { date: "Sep", apiCalls: 60, storage: 90, seats: 10 },
  { date: "Oct", apiCalls: 65, storage: 92, seats: 10 },
  { date: "Nov", apiCalls: 70, storage: 95, seats: 10 },
  { date: "Dec", apiCalls: 75, storage: 98, seats: 10 },
];
