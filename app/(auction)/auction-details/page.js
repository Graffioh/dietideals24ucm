"use client";

import Link from "next/link";
import { Label } from "@/components/shadcn-ui/label";
import useSWR from "swr";
import { useUserContext } from "@/app/providers/userProvider";
import LoadingSpinner from "@/components/dietideals24-ui/loadingSpinner";
import config from "@/config";
import { useState, useEffect } from "react";
import AuctionDetailsImage from "@/components/dietideals24-ui/auctionDetailsImage";
import ProfilePic from "@/components/dietideals24-ui/profilePic";
import PlaceOfferButton from "@/components/dietideals24-ui/placeOfferButton";
import AuctionDetailsFields from "@/components/dietideals24-ui/auctionDetailsFields";
import { Button } from "@/components/shadcn-ui/button";

export default function AuctionDetailsPage({ searchParams }) {
  const { currentUser } = useUserContext();

  const fetcher = (url) =>
    fetch(url, { next: { revalidate: 0 } }).then((res) => res.json());

  const {
    data: currentAuction,
    error: currentAuctionError,
    isLoading: currentAuctionIsLoading,
  } = useSWR(config.apiUrl + "/auctions/" + searchParams.id, fetcher, {
    refreshInterval: 500,
  });

  const [currentOffer, setCurrentOffer] = useState(null);

  function handleCurrentOffer(newCurrentOffer) {
    setCurrentOffer(newCurrentOffer);
  }

  useEffect(() => {
    if (currentAuction) {
      setCurrentOffer(currentAuction.currentOffer);
    }
  }, [currentAuction]);

  const {
    data: userBySearchParams,
    error: userByIdError,
    isLoading: userByIdIsLoading,
  } = useSWR(config.apiUrl + "/users/" + searchParams.auctionuserid, fetcher);

  const auctionDetailsUser =
    searchParams.auctionuserid !== currentUser?.id
      ? userBySearchParams
      : currentUser;

  if (currentAuctionIsLoading || userByIdIsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const isAuctionOwner =
    currentUser && searchParams.auctionuserid == currentUser.id;

  return (
    <>
      <div className="flex flex-col md:flex-row mx-8 md:mx-20 justify-between 2xl:justify-center">
        <AuctionDetailsImage auction={currentAuction} />

        <div className="flex flex-col max-w-2xl my-8 2xl:ml-32">
          <div className="px-10 bg-stone-200 rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.2),_0px_8px_24px_rgba(17,17,26,0.2),_0px_16px_56px_rgba(17,17,26,0.2)]">
            <div className="flex flex-col justify-center items-center">
              <Label className="flex text-base mb-4 bg-white rounded-b-lg pb-1 px-2 border border-input">
                {currentAuction.auctionType.charAt(0).toUpperCase() +
                  currentAuction.auctionType.slice(1)}{" "}
                Auction
              </Label>

              <Link href={"/public-profile?id=" + auctionDetailsUser?.id}>
                <ProfilePic picUrl={auctionDetailsUser?.profilePicUrl} />
              </Link>

              <AuctionDetailsFields
                auction={currentAuction}
                currentOffer={currentOffer}
                auctionId={searchParams.id}
              />

              <PlaceOfferButton
                auction={currentAuction}
                isAuctionOwner={isAuctionOwner}
                handleCurrentOffer={handleCurrentOffer}
              />

              <div
                hidden={!isAuctionOwner || !currentAuction.isOver}
                className="mb-5"
              >
                <Button
                  className="bg-red-800"
                  onClick={() => {
                    fetch(config.apiUrl + "/auctions/" + currentAuction.id, {
                      method: "DELETE",
                    });
                    window.location.href = config.apiUrl.replace("/api", "") + "/home";
                  }}
                >
                  Delete auction
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
