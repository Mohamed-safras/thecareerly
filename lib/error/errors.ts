import { NextResponse } from "next/server";

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function withHeaders(
  res: NextResponse,
  headers?: Record<string, string | number | undefined>
) {
  if (!headers) return res;
  for (const [k, v] of Object.entries(headers)) {
    if (typeof v !== "undefined") res.headers.set(k, String(v));
  }
  return res;
}
