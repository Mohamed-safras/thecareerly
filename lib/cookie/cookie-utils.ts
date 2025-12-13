import { NextRequest } from "next/server";

export function getAccessTokenFromCookies(req: NextRequest): string | null {
  const accessToken = req.cookies.get("access_token");
  if (!accessToken) {
    return null;
  }

  return accessToken?.value;
}
