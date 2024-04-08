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

  return (
    <>
      <div className="flex flex-col md:flex-row mx-8 md:mx-20 justify-between">
        <AuctionDetailsImage auction={currentAuction} />

        <div className="flex flex-col max-w-2xl my-8">
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
                isCurrentUser={
                  currentUser && searchParams.auctionuserid == currentUser.id
                }
                handleCurrentOffer={handleCurrentOffer}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
