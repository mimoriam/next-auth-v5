import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";
import {NextResponse} from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    // if routes aren't protected properly, replace this line with below:
    return NextResponse.next();
    // return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
// Do not copy regexp from next-auth docs. Copy it from clerk documentation:
// https://clerk.com/docs/references/nextjs/auth-middleware
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
