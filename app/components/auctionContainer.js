"use client";

import { Button } from "@/components/ui/button";
import { useAuctionFilter } from "../providers/auctionFilterProvider";
import useSWR from "swr";
import Link from "next/link";
import CardAuction from "./cardAuction";
import AuctionPagination from "./auctionPagination";

const fetcher = (url) =>
  fetch(url, { next: { revalidate: 0 } }).then((res) => res.json());

export default function AuctionContainer() {
  const { filteredAuctions } = useAuctionFilter();

  const {
    data: auctions,
    error,
    isLoading,
  } = useSWR("http://localhost:8080/auctions", fetcher);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-rows-auto grid-cols-4 gap-x-14">
          {filteredAuctions ? (
            filteredAuctions.map((auction) => (
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
          ) : auctions ? (
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
