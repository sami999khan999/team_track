import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("userSession");

  console.log(authToken);

  const isLoginOrSignupPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  // If there's an authToken and the user is on login/signup page, redirect to the homepage or dashboard
  if (authToken && isLoginOrSignupPage) {
    const homepageUrl = new URL("/", request.url); // Redirect to homepage or any other page
    return NextResponse.redirect(homepageUrl);
  }

  if (!authToken) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|login|signup|.*\\..*).*)", // Exclude API routes, _next, login, and signup
  ],
};
