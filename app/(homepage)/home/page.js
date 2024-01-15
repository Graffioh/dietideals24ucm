import Link from "next/link";

import { cookies } from "next/headers";

import AuctionPagination from "../../components/auctionPagination";
import CardAuction from "../../components/cardAuction";

export default async function Home() {

  // function getTokenFromCookie() {
  //   const nextCookies = cookies();

  //   const tokenCookieStr = nextCookies.has("token")
  //     ? nextCookies.get("token").value
  //     : '"no-token"';

  //   // return token without "..."
  //   return tokenCookieStr.replaceAll('"', "");
  // }

  // async function getCurrentUserSubjectFromToken(token) {
  //   try {
  //     const subjectFromToken = await fetch(
  //       "http://localhost:8080/get-subject-from-token",
  //       {
  //         method: "POST",
  //         credentials: "include",
  //         body: token,
  //       }
  //     );

  //     return subjectFromToken.text();
  //   } catch (e) {
  //     console.log({ e });
  //   }
  // }

  // async function getCurrentUserFromSubject(subject) {
  //   let url = "";

  //   if (subject.includes("@")) {
  //     url = "http://localhost:8080/user-from-email?email=" + subject;
  //   } else {
  //     url = "http://localhost:8080/user-from-username?username=" + subject;
  //   }

  //   try {
  //     const userResponse = await fetch(url);
  //     const user = await userResponse.json();

  //     return user;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  async function getAllAuctions() {
    try {
      const auctionsResponse = await fetch("http://localhost:8080/auctions", {
        next: { revalidate: 1 },
      });
      const auctions = await auctionsResponse.json();

      return auctions;
    } catch (e) {
      console.log(e);
    }
  }

  // const token = getTokenFromCookie();

  // const subject = await getCurrentUserSubjectFromToken(token);

  // const user = await getCurrentUserFromSubject(subject);

  const auctions = await getAllAuctions();

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-rows-auto grid-cols-4 gap-x-14">
          {auctions ? (
            auctions.map((auction) => (
              <>
                <Link href={"/auction-details?id="+ auction.id}>
                  <CardAuction
                    key={auction.id}
                    isHomepage={true}
                    auction={auction}
                  />
                </Link>
              </>
            ))
          ) : (
            <div></div>
          )}
        </div>

        <div className="my-5 mt-10">
          <AuctionPagination />
        </div>
      </div>
    </>
  );
}
