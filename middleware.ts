// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  API_AUTH,
  FORBIDDEN,
  CONNECT_ORGANIZATION_NEW,
  LOGIN,
} from "./constents/router-links";
import { OrganizationRole, TeamRole } from "./lib/role";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith(API_AUTH) ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/public") ||
    pathname === CONNECT_ORGANIZATION_NEW ||
    pathname === LOGIN ||
    pathname === FORBIDDEN ||
    pathname.includes("favicon.ico")
  ) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("access_token");
  const refreshToken = req.cookies.get("refresh_token");

  if (!accessToken && !refreshToken) {
    const loginUrl = new URL(LOGIN, req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow request if refresh token exists (will be handled by interceptor)
  if (!accessToken && refreshToken) {
    return NextResponse.next();
  }

  try {
    const tokenPayload = JSON.parse(
      Buffer.from(accessToken!.value.split(".")[1], "base64").toString()
    );

    console.log("Token payload:", tokenPayload);

    const roles = tokenPayload.realm_access?.roles || [];
    console.log("User roles from token:", roles);
    const validOrgRoles: string[] = [
      OrganizationRole.ORGANIZATION_ADMIN,
      OrganizationRole.BILLING_ADMIN,
    ];

    const validTeamRoles: string[] = [
      TeamRole.TEAM_ADMIN,
      TeamRole.TEAM_MEMBER,
      TeamRole.GUEST,
      TeamRole.INTERVIEWER,
      TeamRole.RECRUITER,
      TeamRole.HIRING_MANAGER,
    ];

    const hasValidRole = roles.some(
      (role: string) =>
        validOrgRoles.includes(role) || validTeamRoles.includes(role)
    );

    console.log("Has valid role:", hasValidRole);

    if (!hasValidRole) {
      return NextResponse.redirect(new URL(FORBIDDEN, req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL(LOGIN, req.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|public).*)"],
};
