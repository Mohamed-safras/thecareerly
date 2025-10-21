import { BadRequestError, ConflictError } from "@/lib/error/http-error";
import { organizationSignUpSchema } from "@/lib/form-validation/sign-up-form-schema";
import { errorResponse } from "@/server/response/api-error-response";
import { successResponse } from "@/server/response/success-response";
import { createOrganization } from "@/server/services/auth/organization.create.service";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received organization sign-up data:", body);
    const {
      organizationEmail,
      organizationName,
      password,
      confirmPassword,
      phone,
    } = organizationSignUpSchema.parse(body);

    console.log("Parsed organization sign-up data:", { phone });

    const response = await createOrganization({
      organizationEmail,
      organizationName,
      password,
      confirmPassword,
      phone,
    } as { organizationEmail: string; organizationName: string; password: string; confirmPassword: string; phone: string });

    return successResponse(201, "Organization account created.", response);
  } catch (err: unknown) {
    console.error("Error in organization creation:", err);
    if (err instanceof ConflictError) return errorResponse(409, err.message);

    if (err instanceof BadRequestError) return errorResponse(400, err.message);

    return errorResponse(500, "Internal Server Error");
  }
}
