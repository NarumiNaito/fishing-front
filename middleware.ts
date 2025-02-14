import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isPublicPage = ["/", "/:path*", "/login", "/register"].includes(nextUrl.pathname);

  const isLogin = req.cookies.get("user_session");

  if (isLogin && isPublicPage) {
    const redirectTo = req.nextUrl.searchParams.get("redirect") || "/dashboard";
    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  if (!isLogin && !isPublicPage) {
    return NextResponse.redirect(new URL(`/login?redirect=${nextUrl.pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|global-error.tsx|layout|loading|not-found|page|earth.jpg|Auth.mov|mainVideo.mp4).*)",
    "/dashboard/:path*",
    "/profile/:path*",
    "/login",
    "/register",
    "/",
  ],
};
