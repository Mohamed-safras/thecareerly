import { Plan, PlanFeature, TrialInfo } from "@/interfaces/billing";

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small teams getting started",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "Up to 5 active job posts",
      "100 candidate profiles",
      "50 AI screenings/month",
      "2 team members",
      "Email support",
      "Basic analytics",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Best for growing businesses",
    monthlyPrice: 79,
    yearlyPrice: 790,
    popular: true,
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
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with custom needs",
    monthlyPrice: 199,
    yearlyPrice: 1990,
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
  },
];

export const featureMatrix: PlanFeature[] = [
  {
    name: "Team members",
    starter: "Up to 5",
    professional: "Up to 25",
    enterprise: "Unlimited",
  },
  {
    name: "Storage",
    starter: "10 GB",
    professional: "100 GB",
    enterprise: "1 TB",
  },
  {
    name: "API calls",
    starter: "10K/month",
    professional: "100K/month",
    enterprise: "Unlimited",
  },
  {
    name: "Email support",
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    name: "Priority support",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    name: "24/7 dedicated support",
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    name: "Basic analytics",
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    name: "Advanced analytics",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    name: "Custom analytics",
    starter: false,
    professional: false,
    enterprise: true,
  },
  { name: "API access", starter: false, professional: true, enterprise: true },
  {
    name: "Custom integrations",
    starter: false,
    professional: true,
    enterprise: true,
  },
  { name: "SSO & SAML", starter: false, professional: false, enterprise: true },
  { name: "Audit logs", starter: false, professional: false, enterprise: true },
];

export const currentPlan = {
  id: "professional",
  billingCycle: "monthly" as const,
};

export const trialInfo: TrialInfo = {
  isActive: true,
  daysRemaining: 7,
  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  plan: "Professional",
};
