import { z as zod } from "zod";

export const SignUpSchema = zod.object({
  email: zod.string().email(),
  name: zod.string().min(1).optional(),
  password: zod.string().min(8),
  // optional candidate profile fields
});
