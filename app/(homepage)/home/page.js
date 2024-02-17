"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import AuctionPagination from "../../components/auctionPagination";
import CardAuction from "../../components/cardAuction";
import LoadingSpinner from "@/app/components/loadingSpinner";
import useSWR from "swr";

export default function Home() {
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPageIndex, setMaxPageIndex] = useState("");

  const fetcher = (url) =>
    fetch(url, { next: { revalidate: 1 } }).then((res) => res.json());

  const {
    data: paginatedAuctions,
    error: paginatedAuctionsError,
    isLoading: paginatedAuctionsIsLoading,
  } = useSWR(
    process.env.NEXT_PUBLIC_BASEURL + "/auctions/paginated?page=" + pageIndex,
    fetcher
  );

  if (paginatedAuctionsError) {
    console.error(
      "Error while fetching paginated auctions: " + paginatedAuctionsError
    );
  }
  
  useEffect(() => {
    if(paginatedAuctions) {
      setMaxPageIndex(Math.ceil(paginatedAuctions.length / 20) + 1);
    }
  }, [paginatedAuctions])

  function handlePreviousPageChange() {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    }
  }

  function handleNextPageChange() {
    if (paginatedAuctions.length === 20) {
      setPageIndex(pageIndex + 1);
      setMaxPageIndex(Math.ceil(paginatedAuctions.length / 20))
    }
  }

  if (paginatedAuctionsIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="grid md:grid-rows-auto md:grid-cols-4 grid-cols-1 md:gap-x-14">
          {paginatedAuctions ? (
            paginatedAuctions.map((auction) => (
              <>
                <Link
                  href={
                    "/auction-details?id=" +
                    auction.id +
                    "&auctionuserid=" +
                    auction.idUserAccount
                  }
                >
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
          <AuctionPagination
            onPreviousPageChange={handlePreviousPageChange}
            onNextPageChange={handleNextPageChange}
            pageNumber={pageIndex}
            maxPageNumber={maxPageIndex}
          />
        </div>
      </div>
    </>
  );
}
