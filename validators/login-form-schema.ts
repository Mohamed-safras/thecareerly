// /types/sign-up-form-schema.ts
import { z } from "zod";

export const LoginFormScheama = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .toLowerCase()
    .email("Enter a valid email address"),
  password: z.string({ required_error: "Password is required" }),
});

export type SignUpForm = z.infer<typeof LoginFormScheama>;
