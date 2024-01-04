import Link from "next/link";

import { cookies } from "next/headers";

import TestPagesNavigation from "../components/testpagesNavigation";
import AuctionPagination from "../components/auctionPagination";
import CardAuction from "../components/cardAuction";

export default async function Home() {
  const chiara = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  function getTokenFromCookie() {
    const nextCookies = cookies();

    const tokenCookieStr = nextCookies.has("token")
      ? nextCookies.get("token").value
      : '"no-token"';

    // return token without "..."
    if (tokenCookieStr[0] == '"') {
      return tokenCookieStr.substring(1, tokenCookieStr.length - 1);
    } else {
      return tokenCookieStr;
    }
  }

  async function getCurrentUserSubjectFromToken(token) {
    try {
      const subjectFromToken = await fetch(
        "http://localhost:8080/get-subject-from-token",
        {
          method: "POST",
          credentials: "include",
          body: token,
        }
      );

      return subjectFromToken.text();
    } catch (e) {
      console.log({ e });
    }
  }

  const token = getTokenFromCookie();

  const subject = await getCurrentUserSubjectFromToken(token);

  return (
    <>
      {/* <TestPagesNavigation /> */}

      <div>Subject: {subject}</div>

      <div className="flex flex-col justify-center items-center">
        {/* <div className="grid grid-rows-auto grid-cols-4 gap-x-14">
          {chiara.map((number) => (
            <>
              <Link href="/auction-details">
                <CardAuction key={number} isHomepage={true} />
              </Link>
            </>
          ))}
        </div>

        <div className="my-5 mt-10">
          <AuctionPagination />
        </div> */}
      </div>
    </>
  );
}
