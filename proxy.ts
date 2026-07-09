import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Case-sensitive redirect for /Explore → /explore.
 * next.config redirects are case-insensitive on Windows and can loop.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/Explore" || pathname.startsWith("/Explore/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/Explore/, "/explore");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Explore", "/Explore/:path*"],
};
