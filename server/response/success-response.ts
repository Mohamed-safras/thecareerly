import { ApiResponse } from "@/types/api-response";
import { NextResponse } from "next/server";
import { STATUS_TEXT } from "./http-status";

export function successResponse<T>(status: number, message: string, data?: T) {
  const responseBody: ApiResponse<T> = {
    status,
    statusText: STATUS_TEXT[status] ?? "Success",
    message,
    data,
  };
  return NextResponse.json(responseBody, { status });
}
