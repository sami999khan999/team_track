import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware is executing");

  const authToken = request.cookies.get("userSession");
  console.log("Auth Token:", authToken); // Log the auth token

  if (!authToken) {
    const loginUrl = new URL("/login", request.url);
    console.log("Redirecting to login:", loginUrl.toString()); // Log the redirect URL
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|login|signup|.*\\..*).*)", // Exclude API routes, _next, login, and signup
  ],
};
