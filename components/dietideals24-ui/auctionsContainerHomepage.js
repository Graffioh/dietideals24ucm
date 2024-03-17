"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import AuctionPagination from "./auctionPagination";
import CardAuction from "./cardAuction";
import LoadingSpinner from "./loadingSpinner";
import useSWR from "swr";
import { useAuctionFilter } from "../../app/providers/auctionFilterProvider";
import config from "@/config";

export default function AuctionsContainerHomepage() {
  const { filteredAuctions } = useAuctionFilter();

  // Retrieve last page number from localStorage when the page is reloaded
  const [pageIndex, setPageIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const storedPageIndex = localStorage.getItem("pageIndex");
      return storedPageIndex ? parseInt(storedPageIndex, 10) : 1;
    }
    return 1;
  });
  const [maxPageIndex, setMaxPageIndex] = useState("");

  const fetcher = (url) =>
    fetch(url, { next: { revalidate: 1 } }).then((res) => res.json());

  const {
    data: paginatedAuctions,
    error: paginatedAuctionsError,
    isLoading: paginatedAuctionsIsLoading,
  } = useSWR(config.apiUrl + "/auctions/paginated?page=" + pageIndex, fetcher);

  const paginatedAuctionsLength = paginatedAuctions
    ? paginatedAuctions.length
    : 0;

  if (paginatedAuctionsError) {
    console.error(
      "Error while fetching paginated auctions: " + paginatedAuctionsError
    );
  }

  const fetcherCount = (url) =>
    fetch(url, { next: { revalidate: 1 } }).then((res) => res.text());

  const {
    data: auctionsCount,
    error: auctionsCountError,
    isLoading: auctionsCountIsLoading,
  } = useSWR(config.apiUrl + "/auctions/count", fetcherCount);

  useEffect(() => {
    if (paginatedAuctions) {
      setMaxPageIndex(Math.ceil(auctionsCount / 20));
    }

    localStorage.setItem("pageIndex", pageIndex);
  }, [pageIndex, paginatedAuctions, auctionsCount]);

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

  const [showDelayedMessage, setShowDelayedMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDelayedMessage(true);
    }, 2500); // Change the delay time (in milliseconds) as needed

    return () => clearTimeout(timer); // Clean up the timeout on component unmount
  }, []);

  if (paginatedAuctionsIsLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <LoadingSpinner />
        {showDelayedMessage && (
          <div className="text-sm text-stone-800">
            server spinning up due to cold start, may take a while...
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="grid md:grid-rows-auto md:grid-cols-4 grid-cols-1 md:gap-x-14">
          {filteredAuctions ? (
            filteredAuctions.map((filteredAuction) => (
              <>
                <Link
                  href={
                    "/auction-details?id=" +
                    filteredAuction.id +
                    "&auctionuserid=" +
                    filteredAuction.idUserAccount
                  }
                  key={filteredAuction.id}
                >
                  <CardAuction isHomepage={true} auction={filteredAuction} />
                </Link>
              </>
            ))
          ) : paginatedAuctions ? (
            paginatedAuctions.map((auction) => (
              <Link
                href={
                  "/auction-details?id=" +
                  auction.id +
                  "&auctionuserid=" +
                  auction.idUserAccount
                }
                key={auction.id}
              >
                <CardAuction isHomepage={true} auction={auction} />
              </Link>
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
