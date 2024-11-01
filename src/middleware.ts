import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // const authToken = request.cookies.get("userSession");

  // if (!authToken) {
  //   const loginUrl = new URL("/login", request.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

// export const config = {
//   matcher: [
//     "/((?!api|_next|login|signup|.*\\..*).*)", // Exclude API routes, _next, login, and signup
//   ],
// };
