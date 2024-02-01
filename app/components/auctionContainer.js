"use client";

import { Button } from "@/components/ui/button";
import { useFilter } from "../filterProvider";
import useSWR from "swr";
import Link from "next/link";
import CardAuction from "./cardAuction";
import AuctionPagination from "./auctionPagination";
import { useState } from "react";

export default function AuctionContainer() {

  const { searchInput } = useFilter();
  const [auctions, setAuctions] = useState([]);

  async function filterAuctionsViaSearchInput(searchInput) {
    const auctionsResponse = await fetch(
      searchInput === ""
        ? "http://localhost:8080/auctions"
        : "http://localhost:8080/auction-from-name?name=" + searchInput
    );
    const auctions = await auctionsResponse.json();
    setAuctions(auctions);
  }

  return (
    <>
      <Button
        onClick={async () => {
          await filterAuctionsViaSearchInput(searchInput);
        }}
      >
        Search here
      </Button>
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-rows-auto grid-cols-4 gap-x-14">
          {auctions ? (
            auctions.map((auction) => (
              <>
                <Link href={"/auction-details?id=" + auction.id}>
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
