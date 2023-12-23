import Link from "next/link";

import TestPagesNavigation from "../components/testpagesNavigation";
import AuctionPagination from "../components/auctionPagination";
import CardAuction from "../components/cardAuction";
import { cookies } from "next/headers";

export default async function Home() {
  const chiara = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  function getTokenFromCookie() {
    const nextCookies = cookies();

    const tokenCookieStr = nextCookies.has("token")
      ? nextCookies.get("token").value
      : "no-token";
    
      return tokenCookieStr;
  }

  async function getCurrentUserEmailFromToken(token) {
    try {
      const emailFromToken = await fetch(
        "http://localhost:8080/get-email-from-token",
        {
          method: "POST",
          credentials: "include",
          body: token,
        }
      );

      return emailFromToken.text();
    } catch (e) {
      console.log({ e });
    }
  }

  // get JWT token for user session
  const token = getTokenFromCookie();

  // Extract current user email from token 
  const currentUserEmail = await getCurrentUserEmailFromToken(token);

  return (
    <>
      {/* <TestPagesNavigation /> */}

      <Link href="/login" className="italic">
        Go to Login →
      </Link>

      <Link href="/create-account" className="italic">
        Go to Create account →
      </Link>

      <div>TOKEN: {token}</div>
      <div>EMAIL: {currentUserEmail}</div>

      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-rows-auto grid-cols-4 gap-x-14">
          {chiara.map((number) => (
            <>
              <CardAuction key={number} isHomepage={true} />
            </>
          ))}
        </div>

        <div className="my-5 mt-10">
          <AuctionPagination />
        </div>
      </div>
    </>
  );
}
