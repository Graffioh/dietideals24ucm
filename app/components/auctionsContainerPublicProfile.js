"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import AuctionPagination from "./auctionPagination";
import CardAuction from "./cardAuction";
import LoadingSpinner from "./loadingSpinner";
import useSWR from "swr";

export default function AuctionsContainerPublicProfile() {
  // Retrieve last page number from localStorage when the page is reloaded
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPageIndex, setMaxPageIndex] = useState("");

  const fetcher = (url) =>
    fetch(url, { next: { revalidate: 1 } }).then((res) => res.json());

  const {
    data: paginatedAuctions,
    error: paginatedAuctionsError,
    isLoading: paginatedAuctionsIsLoading,
  } = useSWR(
    process.env.NEXT_PUBLIC_BASEURL + "/auctions/paginated/user/" + userid + "?page=" + pageIndex,
    fetcher
  );

  const paginatedAuctionsLength = paginatedAuctions
    ? paginatedAuctions.length
    : 0;

  if (paginatedAuctionsError) {
    console.error(
      "Error while fetching paginated auctions: " + paginatedAuctionsError
    );
  }

  useEffect(() => {
    if (paginatedAuctions) {
      setMaxPageIndex(Math.ceil(paginatedAuctionsLength / 20) + 1);
    }
  }, [paginatedAuctions]);

  function handlePreviousPageChange() {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    }
  }

  function handleNextPageChange() {
    if (paginatedAuctionsLength === 20) {
      setPageIndex(pageIndex + 1);
      setMaxPageIndex(Math.ceil(paginatedAuctionsLength / 20));
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
     <div className="grid md:overflow-hidden overflow-x-auto md:grid-rows-2 md:grid-cols-4 grid-flow-col md:gap-10 gap-5 md:mx-12 mx-4">
          {auctionsFromUser.map((auction) => (
            <Link
              href={
                "/auction-details?id=" +
                auction.id +
                "&auctionuserid=" +
                auction.idUserAccount
              }
              key={auction.id}
              className="w-64"
            >
              <CardAuction
                key={auction.id}
                isHomepage={false}
                auction={auction}
              />
            </Link>
          ))}
        </div>
        <div className="my-5 flex justify-center items-center">
          <AuctionPagination />
        </div>
    </>
  );
}
