// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  API_AUTH,
  CONNECT_CANDIDATE_lOGIN,
  CONNECT_CANDIDATE_SIGNUP,
  CONNECT_EMPLOYEE_LOGIN,
  FORBIDDEN,
  HOME,
} from "./constents/router-links";

import { wantsCandidate, wantsEmployee } from "./lib/route/route-helper";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log(pathname);

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith(API_AUTH) ||
    pathname.startsWith("/api/linkedin") ||
    pathname === CONNECT_CANDIDATE_lOGIN ||
    pathname === CONNECT_CANDIDATE_SIGNUP ||
    pathname === CONNECT_EMPLOYEE_LOGIN ||
    pathname === FORBIDDEN ||
    pathname === HOME
  ) {
    return NextResponse.next();
  }

  if (!wantsEmployee(pathname) && !wantsCandidate(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const url = new URL(HOME, req.url);
    console.log(url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  const utype = (token as { utype?: "Employee" | "Candidate" }).utype;

  if (wantsEmployee(pathname) && utype !== "Employee") {
    return NextResponse.redirect(new URL(FORBIDDEN, req.url));
  }
  if (wantsCandidate(pathname) && utype !== "Candidate") {
    return NextResponse.redirect(new URL(FORBIDDEN, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|public).*)"],
};
