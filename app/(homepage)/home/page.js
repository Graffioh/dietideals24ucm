import Link from "next/link";

import AuctionContainer from "@/app/components/auctionContainer";

export default async function Home() {
  // async function getAllAuctions() {
  //   try {
  //     const auctionsResponse = await fetch("http://localhost:8080/auctions", {
  //       next: { revalidate: 0 },
  //     });
  //     const auctions = await auctionsResponse.json();

  //     return auctions;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // const auctions = await getAllAuctions();

  return (
    <>
      <AuctionContainer />
    </>
  );
}
