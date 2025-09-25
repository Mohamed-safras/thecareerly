import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { seal } from "@/lib/encryption/crypto";
import { LinkedInService } from "@/server/services/social/linkedin";
import { buildUrl } from "@/lib/http/url";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID!;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET!;
const REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI!;

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.redirect(
      `${process.env.NEXT_AUTH_LOCAL_URL}/connect/employee/login`
    );
  }
  // const code = req.nextUrl.searchParams.get("code");
  // const state = req.nextUrl.searchParams.get("state");
  // const error = req.nextUrl.searchParams.get("error");
  // const storedState = req.cookies.get("linkedin_oauth_state")?.value;
  // const organizationId = req.cookies.get("linkedin_org_id")?.value;
  const settingsUrl = `${process.env.NEXT_AUTH_LOCAL_URL}/connect/employee/dashboard/settings`;
  // if (error) {
  //   return NextResponse.redirect(
  //     buildUrl(settingsUrl, { linkedin: "error", reason: error })
  //   );
  // }
  // if (!code || !state || !organizationId || state !== storedState) {
  //   return NextResponse.redirect(
  //     buildUrl(settingsUrl, { linkedin: "error", reason: "invalid_state" })
  //   );
  // }
  // try {
  //   // Exchange code for access token
  //   const tokenResponse = await fetch(
  //     "https://www.linkedin.com/oauth/v2/accessToken",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: new URLSearchParams({
  //         grant_type: "authorization_code",
  //         code,
  //         redirect_uri: REDIRECT_URI,
  //         client_id: CLIENT_ID,
  //         client_secret: CLIENT_SECRET,
  //       }),
  //     }
  //   );
  //   if (!tokenResponse.ok) {
  //     throw new Error("Token exchange failed");
  //   }
  //   const tokenData = await tokenResponse.json();
  //   const accessToken = tokenData.access_token;
  //   const expiresIn = tokenData.expires_in || 5184000; // Default 60 days
  //   // Get user's admin organizations
  //   const orgsData = await LinkedInService.getOrganizations(accessToken);
  //   const adminOrgs = orgsData.elements || [];
  //   if (adminOrgs.length === 0) {
  //     return NextResponse.redirect(
  //       buildUrl(settingsUrl, {
  //         linkedin: "error",
  //         reason: "no_admin_organizations",
  //       })
  //     );
  //   }
  //   // For simplicity, take the first organization (you can extend this for multiple choice)
  //   const linkedinOrg = adminOrgs[0];
  //   const organizationUrn = linkedinOrg.organization;
  //   const orgId = organizationUrn.split(":").pop();
  //   // Get organization details
  //   let organizationName = "LinkedIn Company";
  //   try {
  //     const orgDetails = await LinkedInService.getOrganizationDetails(
  //       orgId,
  //       accessToken
  //     );
  //     organizationName = orgDetails.localizedName || organizationName;
  //   } catch (error) {
  //     console.warn("Failed to fetch organization details:", error);
  //   }
  //   // Calculate expiry date
  //   const expiryDate = new Date(Date.now() + expiresIn * 1000);
  //   // Save or update the social account
  //   await prisma.socialAccount.upsert({
  //     where: {
  //       organizationId_platform_accountId: {
  //         organizationId: organizationId,
  //         platform: "linkedin",
  //         accountId: organizationUrn,
  //       },
  //     },
  //     update: {
  //       accessToken: seal(accessToken),
  //       refreshToken: tokenData.refresh_token
  //         ? seal(tokenData.refresh_token)
  //         : null,
  //       expiry: expiryDate,
  //       updatedAt: new Date(),
  //     },
  //     create: {
  //       organizationId: organizationId,
  //       platform: "linkedin",
  //       accountId: organizationUrn,
  //       accessToken: seal(accessToken),
  //       refreshToken: tokenData.refresh_token
  //         ? seal(tokenData.refresh_token)
  //         : null,
  //       expiry: expiryDate,
  //     },
  //   });
  //   const response = NextResponse.redirect(
  //     buildUrl(settingsUrl, {
  //       linkedin: "connected",
  //       company: organizationName,
  //     })
  //   );
  //   // Clear cookies
  //   response.cookies.set("linkedin_oauth_state", "", { maxAge: 0, path: "/" });
  //   response.cookies.set("linkedin_org_id", "", { maxAge: 0, path: "/" });
  //   return response;
  // } catch (error) {
  //   console.error("LinkedIn callback error:", error);
  //   return NextResponse.redirect(
  //     buildUrl(settingsUrl, {
  //       linkedin: "error",
  //       reason: "callback_failed",
  //     })
  //   );
  // }
  return NextResponse.redirect(
    buildUrl(settingsUrl, {
      linkedin: "error",
      reason: "callback_failed",
    })
  );
}
