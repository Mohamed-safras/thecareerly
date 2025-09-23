import { badRequest } from "@/lib/error/errors";
import { BadRequestError, ConflictError } from "@/lib/error/http-error";
import { SignUpFormScheama } from "@/lib/form-validation/sign-up-form-schema";
import { errorResponse } from "@/server/response/api-error-response";
import { successResponse } from "@/server/response/success-response";
import { candidateSignUp } from "@/server/services/auth/candidate.service";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, name, password, phone } = SignUpFormScheama.parse(body);

    const signUp = await candidateSignUp(email, password, name, phone);

    return successResponse(201, "Candidate account created.", signUp);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Invalid request";
    const details =
      error instanceof Error && "issues" in error ? error.issues : undefined; // zod errors if any

    if (error instanceof ConflictError) {
      return errorResponse(error.status, error.message);
    }

    if (error instanceof BadRequestError) {
      return errorResponse(error.status, error.message);
    }

    return errorResponse(500, message, details);
  }
}
