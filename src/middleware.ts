import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isPrivatePath = path === "/my-profile" || path.startsWith("/events/");
  const isAuthPaths = path === "/auth/login" || path === "/auth/register" || path === "/auth/complete-profile";

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect to login if not logged in and accessing protected route
  if (!token && (isPrivatePath || path === "/auth/complete-profile")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Check if profile is complete for authenticated users
  if (token && !token.isProfileComplete && path !== "/auth/complete-profile") {
    return NextResponse.redirect(
      new URL(
        `/auth/complete-profile`,
        req.url
      )
    );
  }

  // Redirect to dashboard if already logged in and accessing auth pages
  if (token && token.isProfileComplete && isAuthPaths) {
    return NextResponse.redirect(new URL("/my-profile", req.url));
  }

  return NextResponse.next();
}

// Specify which paths this middleware should run on
export const config = {
  matcher: [
    "/events/register/:id",
    "/my-profile/:path*",
    "/auth/login",
    "/auth/register",
    "/auth/complete-profile",
  ],
};