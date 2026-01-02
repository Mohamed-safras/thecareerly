export type PlanTier = "starter" | "pro" | "enterprise";

export interface PricingPlan {
  id: string;
  name: string;
  tier: PlanTier;
  price: number;
  billingPeriod: "monthly" | "yearly";
  description: string;
  features: string[];
  limits: {
    jobPosts: number | "unlimited";
    candidates: number | "unlimited";
    aiScreenings: number | "unlimited";
    teamMembers: number | "unlimited";
  };
  popular?: boolean;
}

export interface PlanFeature {
  name: string;
  starter: boolean | string;
  professional: boolean | string;
  enterprise: boolean | string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  features: string[];
}

export interface TrialInfo {
  isActive: boolean;
  daysRemaining: number;
  endDate: Date;
  plan: string;
}

export interface Subscription {
  id: string;
  planId: string;
  status: "active" | "canceled" | "past_due" | "trialing";
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface UsageMetrics {
  jobPosts: { used: number; limit: number | "unlimited" };
  candidates: { used: number; limit: number | "unlimited" };
  aiScreenings: { used: number; limit: number | "unlimited" };
  teamMembers: { used: number; limit: number | "unlimited" };
}

export interface Invoice {
  id: string;
  date: Date;
  amount: number;
  status: InvoiceStatus;
  description: string;
  downloadUrl?: string;
}

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  last4: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface UsageMetric {
  id: string;
  name: string;
  used: number;
  limit: number;
  unit: string;
  icon: string;
}

export interface UsageAlert {
  id: string;
  title: string;
  message: string;
  severity: "critical" | "warning" | "info";
  timestamp: Date;
}

export interface UsageHistoryPoint {
  date: string;
  apiCalls: number;
  storage: number;
  seats: number;
}

export type PaymentMethodType = "card" | "bank";
export type InvoiceStatus = "paid" | "pending" | "failed";
