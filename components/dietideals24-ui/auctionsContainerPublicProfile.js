"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import AuctionPagination from "./auctionPagination";
import CardAuction from "./cardAuction";
import LoadingSpinner from "./loadingSpinner";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn-ui/radio-group";
import { Label } from "@/components/shadcn-ui/label";
import useSWR from "swr";
import { useUserContext } from "../../app/providers/userProvider";
import config from "@/config";

export default function AuctionsContainerPublicProfile({
  publicProfileUserId,
}) {
  const [isSellingSelected, setIsSellingSelected] = useState(true);

  // Retrieve last page number from localStorage when the page is reloaded
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPageIndex, setMaxPageIndex] = useState("");

  const fetcher = (url) =>
    fetch(url, { next: { revalidate: 1 } }).then((res) => res.json());

  const {
    data: publicProfileUserData,
    error: publicProfileUserError,
    isLoading: publicProfileUserIsLoading,
  } = useSWR(
    publicProfileUserId
      ? config.apiUrl + "/users/" + publicProfileUserId
      : null,
    fetcher
  );

  const {
    data: paginatedSellingAuctions,
    error: paginatedSellingAuctionsError,
    isLoading: paginatedSellingAuctionsIsLoading,
  } = useSWR(
    publicProfileUserData && publicProfileUserData.id
      ? config.apiUrl +
          "/auctions/paginated/user/" +
          publicProfileUserData.id +
          "?page=" +
          pageIndex
      : null,
    fetcher
  );

  const paginatedSellingAuctionsLength = paginatedSellingAuctions
    ? paginatedSellingAuctions.length
    : 0;

  if (paginatedSellingAuctionsError) {
    console.error(
      "Error while fetching paginated auctions: " +
        paginatedSellingAuctionsError
    );
  }

  const {
    data: paginatedBuyingAuctions,
    error: paginatedBuyingAuctionsError,
    isLoading: paginatedBuyingAuctionsIsLoading,
  } = useSWR(
    publicProfileUserData && publicProfileUserData.id
      ? config.apiUrl +
          "/auctions/paginated/from-offers/" +
          publicProfileUserData.id +
          "?page=" +
          pageIndex
      : null,
    fetcher
  );

  const paginatedBuyingAuctionsLength = paginatedBuyingAuctions
    ? paginatedBuyingAuctions.length
    : 0;

  if (paginatedBuyingAuctionsError) {
    console.error(
      "Error while fetching paginated auctions: " + paginatedBuyingAuctionsError
    );
  }

  const fetcherCount = (url) =>
    fetch(url, { next: { revalidate: 1 } }).then((res) => res.text());

  const {
    data: sellingAuctionsCount,
    error: sellingAuctionsCountError,
    isLoading: sellingAuctionsCountIsLoading,
  } = useSWR(
    publicProfileUserData && publicProfileUserData.id
      ? config.apiUrl +
          "/auctions/count/user/" +
          publicProfileUserData.id
      : null,
    fetcherCount
  );

  const {
    data: buyingAuctionsCount,
    error: buyingAuctionsCountError,
    isLoading: buyingAuctionsCountIsLoading,
  } = useSWR(
    publicProfileUserData && publicProfileUserData.id
      ? config.apiUrl +
          "/auctions/count/from-offers/user/" +
          publicProfileUserData.id
      : null,
    fetcherCount
  );


  useEffect(() => {
    if (paginatedSellingAuctions && sellingAuctionsCount && isSellingSelected) {
      setMaxPageIndex(Math.ceil(sellingAuctionsCount / 8));
    }

    if (paginatedBuyingAuctions && buyingAuctionsCount && !isSellingSelected) {
      setMaxPageIndex(Math.ceil(buyingAuctionsCount / 8));
    }
  }, [
    paginatedSellingAuctions,
    sellingAuctionsCount,
    paginatedBuyingAuctions,
    buyingAuctionsCount,
    isSellingSelected
  ]);

  function handlePreviousPageChange() {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    }
  }

  function handleNextPageChange() {
    if (
      (paginatedSellingAuctionsLength === 8 &&
        isSellingSelected &&
        sellingAuctionsCount > 8) ||
      (paginatedBuyingAuctionsLength === 8 &&
        !isSellingSelected &&
        buyingAuctionsCount > 8)
    ) {
      setPageIndex(pageIndex + 1);
    }
  }

  if (
    paginatedSellingAuctionsIsLoading ||
    paginatedBuyingAuctionsIsLoading ||
    publicProfileUserIsLoading
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col bg-stone-200 mt-10 mb-20 md:mx-32 mx-4 rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.15)]">
        <div className="mt-6 ml-11">
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-one"
                id="option-one"
                onClick={() => {
                  setIsSellingSelected(true);
                  setPageIndex(1);
                }}
              />
              <Label htmlFor="option-one">Selling</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-two"
                id="option-two"
                onClick={() => {
                  setIsSellingSelected(false);
                  setPageIndex(1);
                }}
              />
              <Label htmlFor="option-two">Buying</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex ml-auto mt-4 px-5 py-1.5 rounded-md focus:outline-none focus:border-blue-500">
          {" "}
        </div>
        <div className="grid md:overflow-hidden overflow-x-auto overscroll-y-none overflow-y-hidden md:grid-rows-2 md:grid-cols-4 2xl:grid-cols-6 grid-flow-col md:gap-10 gap-5 md:mx-12 mx-4">
          {isSellingSelected ? (
            paginatedSellingAuctions && paginatedSellingAuctions.length > 0 ? (
              paginatedSellingAuctions.map((auction) => (
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
              ))
            ) : (
              <div className="">No selling auctions yet.</div>
            )
          ) : paginatedBuyingAuctions && paginatedBuyingAuctions.length > 0 ? (
            paginatedBuyingAuctions.map((auction) => (
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
            ))
          ) : (
            <div>No buying auctions yet.</div>
          )}
        </div>
        <div className="my-5 flex justify-center items-center">
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
