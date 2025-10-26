// lib/api-error.ts
import { STATUS_TEXT } from "@/server/response/http-status";
import { ApiResponse } from "@/types/api-response";
import { NextResponse } from "next/server";

export function errorResponse(
  status: number,
  message: string,
  details?: unknown
) {
  const body: ApiResponse<never> = {
    status,
    statusText: STATUS_TEXT[status] ?? "Error",
    message,
    details,
  };
  return NextResponse.json(body, { status });
}
// Mapping HTTP codes → text
