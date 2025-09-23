// /types/sign-up-form-schema.ts
import { z } from "zod";
import { passwordPolicy, phonePolicy } from "../common/form-validation-policy";

export const SignUpFormScheama = z
  .object({
    name: z.string().trim().min(2, "Full name must be at least 2 characters"),
    email: z.string().trim().toLowerCase().email("Enter a valid email address"),
    phone: z.string().trim().regex(phonePolicy, "Enter a valid phone number"),
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

export type SignUpForm = z.infer<typeof SignUpFormScheama>;
