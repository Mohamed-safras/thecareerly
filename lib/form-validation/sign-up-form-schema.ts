// /types/sign-up-form-schema.ts
import { z } from "zod";
import { passwordPolicy } from "../common/form-validation-policy";

export const organizationSignUpSchema = z
  .object({
    organizationName: z
      .string()
      .min(2, "Organization name must be at least 2 characters"),
    organizationEmail: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordPolicy,
        "Use upper & lower case letters, a number, and a special character"
      ),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });
