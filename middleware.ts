import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  API_AUTH,
  FORBIDDEN,
  CONNECT_ORGANIZATION_NEW,
  LOGIN,
} from "./constents/router-links";
import { OrganizationRole, TeamRole } from "./lib/role";
import { OrganizationUser, TeamUser } from "./types/user-profile";

type TokenType = {
  teamUsers?: TeamUser[];
  organizationUsers?: OrganizationUser[];
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith(API_AUTH) ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/public") ||
    pathname === CONNECT_ORGANIZATION_NEW ||
    pathname === LOGIN ||
    pathname === FORBIDDEN ||
    pathname.includes("favicon.ico")
  ) {
    return NextResponse.next();
  }

  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "session-token",
  })) as TokenType | null;

  // Redirect to login if no token
  if (!token) {
    const loginUrl = new URL(LOGIN, req.url);
    console.log("No token - redirecting to login");
    return NextResponse.redirect(loginUrl);
  }

  const teamRoles =
    token.teamUsers?.map((user) => user.role).filter(Boolean) ?? [];
  const organizationRoles =
    token.organizationUsers?.map((user) => user.role).filter(Boolean) ?? [];

  console.log("Middleware - Team Roles:", teamRoles);
  console.log("Middleware - Organization Roles:", organizationRoles);

  const validOrgRoles: string[] = [
    OrganizationRole.ORG_ADMIN,
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

  // Check if user has any valid role
  const hasValidRole =
    organizationRoles
      .filter((role): role is string => typeof role === "string")
      .some((role) => validOrgRoles.includes(role)) ||
    teamRoles
      .filter((role): role is string => typeof role === "string")
      .some((role) => validTeamRoles.includes(role));

  console.log("Middleware - Roles:", hasValidRole);

  if (!hasValidRole) {
    console.log("Invalid or missing roles - redirecting to forbidden");
    return NextResponse.redirect(new URL(FORBIDDEN, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|public).*)"],
};
