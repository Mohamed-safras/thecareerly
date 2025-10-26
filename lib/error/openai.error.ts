import OpenAI from "openai";
import { NextResponse } from "next/server";

export function mapOpenAIError(e: unknown) {
  if (e instanceof OpenAI.APIError) {
    const status = e.status ?? 502;
    const message = e.error?.message || e.message || "Upstream provider error";
    const res = NextResponse.json({ error: message }, { status });
    // If you want to forward Retry-After, pluck it from e as available in your runtime.
    return res;
  }
  const message = e instanceof Error ? e.message : "Upstream error";
  console.log(message);
  return NextResponse.json({ error: message }, { status: 502 });
}
