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

export type PaymentMethodType = "card" | "bank";
export type InvoiceStatus = "paid" | "pending" | "failed";
