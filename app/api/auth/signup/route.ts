import { SignUpSchema } from "@/server/db/schema/validation/sign-up-schema";
import { errorResponse } from "@/server/response/api-error-response";
import { successResponse } from "@/server/response/success-response";
import { candidateSignUp } from "@/server/services/auth/candidate.service";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, name, password } = SignUpSchema.parse(body);

    const signUp = await candidateSignUp(email, password, name);

    return successResponse(201, "Candidate account created.", signUp);
  } catch (error: unknown) {
    console.log(error);
    const message = error instanceof Error ? error.message : "Invalid request";
    const details =
      error instanceof Error && "issues" in error ? error.issues : undefined; // zod errors if any

    return errorResponse(400, message, details);
  }
}
