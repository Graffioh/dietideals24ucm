import Link from "next/link";

import { cookies } from "next/headers";
import AuctionContainer from "@/app/components/auctionContainer";
import AuctionPagination from "../../components/auctionPagination";
import CardAuction from "../../components/cardAuction";

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
