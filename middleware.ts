// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  API_AUTH,
  CONNECT_ORGANIZATION_LOGIN,
  CONNECT_MEMBER_LOGIN,
  FORBIDDEN,
  HOME,
  CONNECT_ORGANIZATION_CREATE,
} from "./constents/router-links";
import { TeamRole } from "@prisma/client";
import { ROLES } from "./lib/role";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith(API_AUTH) ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/public") ||
    pathname === CONNECT_ORGANIZATION_CREATE ||
    pathname === CONNECT_ORGANIZATION_LOGIN ||
    pathname === CONNECT_MEMBER_LOGIN ||
    pathname === FORBIDDEN ||
    pathname === HOME ||
    pathname.includes("favicon.ico")
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "session-token",
  });

  // Redirect to forbidden if no token
  if (!token) {
    const forbiddenUrl = new URL(FORBIDDEN, req.url);
    // forbiddenUrl.searchParams.set("callbackUrl", pathname);
    console.log("No token - redirecting to forbidden");
    return NextResponse.redirect(forbiddenUrl);
  }

  const roles = (token as { roles?: TeamRole[] }).roles;

  // Check if user has any valid role
  const hasValidRole =
    roles &&
    roles.length > 0 &&
    roles.some(
      (role) =>
        role === ROLES.ORGANIZATION_SUPER_ADMIN ||
        role === ROLES.TEAM_ADMIN ||
        role === ROLES.TEAM_MEMBER ||
        role === ROLES.GUEST
    );

  if (!hasValidRole) {
    console.log("Invalid or missing roles - redirecting to forbidden");
    return NextResponse.redirect(new URL("/forbidden", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|public).*)"],
};
