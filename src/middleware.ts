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

  if (!token && (isPrivatePath || path === "/auth/complete-profile")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (token && !token.isProfileComplete && path !== "/auth/complete-profile") {
    return NextResponse.redirect(
      new URL(
        `/auth/complete-profile`,
        req.url
      )
    );
  }

  if (token && token.isProfileComplete && isAuthPaths) {
    return NextResponse.redirect(new URL("/my-profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/events/register/:id",
    "/my-profile/:path*",
    "/auth/login",
    "/auth/register",
    "/auth/complete-profile",
  ],
};