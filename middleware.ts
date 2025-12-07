// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { LOGIN, FORBIDDEN } from "./constents/router-links";
import { publicRoutes } from "./lib/route-config";
import { Roles } from "./lib/role";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Check for Public Routes
  // We use `some` to allow for prefix matching (e.g. /public/* or /images/*)
  // or exact matches for specific pages.
  const isPublic = publicRoutes.some((route) => {
    // Exact match
    if (pathname === route) return true;
    // Prefix match for folders (assumes routes like /images vs /images/logo.png)
    // Be careful not to match partial words (e.g. /log match /login) unless intended.
    // Ideally use explicit prefixes like "/" for root or check slashes.
    if (route.startsWith("/") && route !== "/") {
      return pathname.startsWith(route);
    }
    return false;
  });

  if (isPublic) {
    return NextResponse.next();
  }

  // 2. Token Validation
  const accessToken = req.cookies.get("access_token");
  const refreshToken = req.cookies.get("refresh_token");

  // No tokens -> Redirect to login
  if (!accessToken && !refreshToken) {
    const loginUrl = new URL(LOGIN, req.url);
    // Optional: Add `?next=` param to redirect back after login
    // loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Access token expired/missing but refresh token exists
  // Handled by client-side interceptors usually, but middleware can allow it
  // to pass through to let the app try refreshing or redirect if api fails.
  // For strict security, you might want to force refresh here, but that's complex.
  // We'll allow it to pass for now as per original logic.
  if (!accessToken && refreshToken) {
    return NextResponse.next();
  }

  try {
    // 3. Decode Token safely
    const tokenParts = accessToken!.value.split(".");
    if (tokenParts.length !== 3) {
      throw new Error("Invalid token format");
    }

    const tokenPayload = JSON.parse(
      Buffer.from(tokenParts[1], "base64").toString()
    );

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (tokenPayload.exp && tokenPayload.exp < now) {
      // Token expired.
      // If we have a refresh token, we might want to let it pass (handled above),
      // otherwise redirect. Since we are here, we have an access token but it's expired.
      // Redirecting to login is safer, or rely on client to refresh.
      // For now, let's redirect to login for explicit security,
      // user experience might be better if we redirect to a strictly public refresh endpoint if exists.
      return NextResponse.redirect(new URL(LOGIN, req.url));
    }

    const roles = tokenPayload.realm_access?.roles || [];

    // 4. Role-Based Access Control
    // Check if the user has at least one valid role from our system
    const validRoles = Object.values(Roles);

    // We cast to string for comparison as token roles are strings
    const hasValidRole = roles.some((role: string) =>
      validRoles.includes(role as Roles)
    );

    if (!hasValidRole) {
      console.warn("User has no valid roles:", roles);
      return NextResponse.redirect(new URL(FORBIDDEN, req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Auth Error:", error);
    return NextResponse.redirect(new URL(LOGIN, req.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // Simplified matcher, relies on logic
};
