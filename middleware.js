import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

function getTokenFromCookie() {
  const nextCookies = cookies();

  const tokenCookieStr = nextCookies.has("token")
    ? nextCookies.get("token").value
    : '"no-token"';

  // return token without "..."
  return tokenCookieStr.substring(1, tokenCookieStr.length - 1);
}

export default async function middleware(req) {
  const token = getTokenFromCookie();

  if (token === "no-token") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/insert-auction", "/private-profile", "/public-profile"],
};
