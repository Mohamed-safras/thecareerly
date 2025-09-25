import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID!;
const REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI!;
const SCOPES =
  process.env.LINKEDIN_SCOPES || "email profile openid w_member_social";

export async function GET(req: NextRequest) {
  console.log("🔍 LinkedIn Auth Start - URL:", req.url);

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    console.log("❌ No session found");
    return NextResponse.redirect("/auth/signin?error=unauthorized");
  }

  const organizationId =
    req.nextUrl.searchParams.get("organizationId") ||
    "64fa1b2c1234567890abc001";
  console.log("🔍 Organization ID:", organizationId);

  if (!organizationId) {
    return NextResponse.redirect(
      `${process.env.NEXT_AUTH_LOCAL_URL}/connect/employee/dashboard/settings?error=missing_organization`
    );
  }

  // Verify user has admin access
  // const teamUser = await prisma.teamUser.findFirst({
  //   where: {
  //     user_id: session.user.id,
  //     role: "Admin",
  //     team: {
  //       organizationId: organizationId,
  //     },
  //   },
  // });

  // if (!teamUser) {
  //   console.log("❌ User not admin of organization");
  //   return NextResponse.redirect(
  //     "/dashboard/settings?error=unauthorized_organization"
  //   );
  // }

  const state = crypto.randomBytes(32).toString("hex");
  console.log("🔍 Generated state:", state);

  const authUrl = new URL("https://www.linkedin.com/oauth/v2/authorization");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("scope", SCOPES);
  authUrl.searchParams.set("state", state);

  console.log("🔍 Auth URL:", authUrl.toString());

  const response = NextResponse.redirect(authUrl.toString());

  // More permissive cookie settings for localhost
  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 600, // 10 minutes
    path: "/",
    // Don't set secure: true for localhost
    ...(process.env.NODE_ENV === "production" && { secure: true }),
  };

  console.log("🔍 Setting cookies with options:", cookieOptions);

  response.cookies.set("linkedin_oauth_state", state, cookieOptions);
  response.cookies.set("linkedin_org_id", organizationId, cookieOptions);

  return response;
}
