// /types/sign-up-form-schema.ts
import { z } from "zod";
import { passwordPolicy } from "../common/form-validation-policy";

// Baseline password policy: 8+ chars, 1 upper, 1 lower, 1 number, 1 special.

export const LoginFormScheama = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      passwordPolicy,
      "Use upper & lower case letters, a number, and a special character"
    ),
});

export type SignUpForm = z.infer<typeof LoginFormScheama>;
