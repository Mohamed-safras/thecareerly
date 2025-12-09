import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { LOGIN } from "./constents/router-links";
import { publicRoutes } from "./lib/route-config";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Check for Public Routes
  const isPublic = publicRoutes.some((route) => {
    if (pathname === route) return true;
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
  console.log("Access Token from cookies:", accessToken?.value);

  if (!accessToken) {
    const loginUrl = new URL(LOGIN, req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
