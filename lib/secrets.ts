import { object } from "zod";

export const envVerification = {
  appUrl: process.env.NEXTAUTH_URL!,
  linkedin: {
    clientId: process.env.LINKEDIN_CLIENT_ID!,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    redirectUri: process.env.LINKEDIN_REDIRECT_URI!,
  },
  upstashRedisUrl: process.env.UPSTASH_REDIS_REST_URL!,
};

Object.entries(envVerification).forEach(([key, value]) => {
  if (typeof value === "object")
    Object.entries(value).forEach((nestedKey, nestedValue) => {
      if (!nestedValue) throw new Error(`Missing env: ${key}.${nestedKey}`);
      else if (!value) throw new Error(`Missing env: ${key}`);
    });
});
