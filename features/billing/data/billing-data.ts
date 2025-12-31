import {
  Invoice,
  PaymentMethod,
  PricingPlan,
  Subscription,
  UsageMetrics,
} from "@/interfaces/billing";

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tier: "starter",
    price: 49,
    billingPeriod: "monthly",
    description:
      "Perfect for small teams getting started with recruitment automation.",
    features: [
      "Up to 5 active job posts",
      "100 candidate profiles",
      "50 AI screenings/month",
      "2 team members",
      "Email support",
      "Basic analytics",
    ],
    limits: {
      jobPosts: 5,
      candidates: 100,
      aiScreenings: 50,
      teamMembers: 2,
    },
  },
  {
    id: "pro",
    name: "Professional",
    tier: "pro",
    price: 149,
    billingPeriod: "monthly",
    description: "For growing companies with higher recruitment needs.",
    features: [
      "Up to 25 active job posts",
      "1,000 candidate profiles",
      "500 AI screenings/month",
      "10 team members",
      "Priority support",
      "Advanced analytics",
      "Custom workflows",
      "API access",
    ],
    limits: {
      jobPosts: 25,
      candidates: 1000,
      aiScreenings: 500,
      teamMembers: 10,
    },
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tier: "enterprise",
    price: 399,
    billingPeriod: "monthly",
    description: "For large organizations with complex recruitment workflows.",
    features: [
      "Unlimited job posts",
      "Unlimited candidates",
      "Unlimited AI screenings",
      "Unlimited team members",
      "24/7 dedicated support",
      "Custom integrations",
      "SSO & advanced security",
      "Custom AI model training",
      "SLA guarantee",
    ],
    limits: {
      jobPosts: "unlimited",
      candidates: "unlimited",
      aiScreenings: "unlimited",
      teamMembers: "unlimited",
    },
  },
];

export const currentSubscription: Subscription = {
  id: "sub_123",
  planId: "pro",
  status: "active",
  currentPeriodStart: new Date("2024-12-01"),
  currentPeriodEnd: new Date("2025-01-01"),
  cancelAtPeriodEnd: false,
};

export const usageMetrics: UsageMetrics = {
  jobPosts: { used: 18, limit: 25 },
  candidates: { used: 847, limit: 1000 },
  aiScreenings: { used: 312, limit: 500 },
  teamMembers: { used: 7, limit: 10 },
};

export const invoiceHistory: Invoice[] = [
  {
    id: "inv_001",
    date: new Date("2024-12-01"),
    amount: 149,
    status: "paid",
    description: "Professional Plan - December 2024",
  },
  {
    id: "inv_002",
    date: new Date("2024-11-01"),
    amount: 149,
    status: "paid",
    description: "Professional Plan - November 2024",
  },
  {
    id: "inv_003",
    date: new Date("2024-10-01"),
    amount: 149,
    status: "paid",
    description: "Professional Plan - October 2024",
  },
  {
    id: "inv_004",
    date: new Date("2024-09-01"),
    amount: 49,
    status: "paid",
    description: "Starter Plan - September 2024",
  },
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: "pm_001",
    type: "card",
    last4: "4242",
    brand: "Visa",
    expiryMonth: 12,
    expiryYear: 2026,
    isDefault: true,
  },
  {
    id: "pm_002",
    type: "card",
    last4: "1234",
    brand: "Mastercard",
    expiryMonth: 6,
    expiryYear: 2025,
    isDefault: false,
  },
];
