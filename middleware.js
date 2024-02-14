import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

function getTokenFromCookie() {
  const nextCookies = cookies();

  const tokenCookieStr = nextCookies.has("auth-token")
    ? nextCookies.get("auth-token").value
    : '"no-token"';

  // return token without "..."
  return tokenCookieStr.replaceAll('"', "");
}

export default async function middleware(req) {
  const authToken = getTokenFromCookie();

  if (authToken === "no-token") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/insert-auction", "/public-profile"],
};
