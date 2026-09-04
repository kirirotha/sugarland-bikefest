import { NextRequest, NextResponse } from "next/server";
import { STAFF_COOKIE, verifyStaffSession } from "@/lib/staffAuth";

// Gates everything under /staff (day-of check-in lookup, waiver CSV export)
// behind the shared staff password, except the login page itself.
//
// This is an optimistic, cookie-only check (per Next.js's Proxy guidance —
// no DB calls here since Proxy runs on every matched request, including
// prefetches). Each protected route/API handler re-verifies the session
// itself as defense in depth.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/staff/login") return NextResponse.next();

  const token = req.cookies.get(STAFF_COOKIE)?.value;
  if (!verifyStaffSession(token)) {
    const loginUrl = new URL("/staff/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/staff/:path*",
    "/api/staff/search/:path*",
    "/api/staff/export/:path*",
    "/api/staff/waivers/:path*",
  ],
};
