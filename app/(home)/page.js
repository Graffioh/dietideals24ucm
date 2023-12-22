import Link from "next/link";

import TestPagesNavigation from "../components/testpagesNavigation";
import AuctionPagination from "../components/auctionPagination";
import CardAuction from "../components/cardAuction";
import { cookies } from 'next/headers'

export default async function Home() {
  const chiara = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  async function getTokenFromCookie() {
    // NOT WORKING WITH SERVER COMPONENT
    // try {
    //   const tokenResponse = await fetch(
    //     "http://localhost:8080/get-login-token",
    //     {
    //       method: "GET",
    //       credentials: "include",
    //     }
    //   );

    //   const token = await tokenResponse.text();
    //   // setToken(token);
    //   console.log("TOKEN: " + token);
    //   return token;
    // } catch (e) {
    //   console.log({ e });
    // }
    // 

    // Working using cookies() from next/header
    const nextCookies = cookies();
    const tokenCookieStr = nextCookies.get("token").value

    // return token without "..."
    return tokenCookieStr.substring(1, tokenCookieStr.length - 1)
  }

  // GET TOKEN
  const token = await getTokenFromCookie();

  // EXTRACT EMAIL FROM TOKEN AND GET CURRENT USER

  return (
    <>
      {/* <TestPagesNavigation /> */}

      <Link href="/login" className="italic">
        Go to Login →
      </Link>

      <Link href="/create-account" className="italic">
        Go to Create account →
      </Link>
    
      {/* <Button onClick={getTokenFromCookie}>TOKEN</Button> */}

      <div>TOKEN: {token}</div>

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
