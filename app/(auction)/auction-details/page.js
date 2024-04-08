"use client";

import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";
import { Textarea } from "@/components/shadcn-ui/textarea";
import { Button, buttonVariants } from "@/components/shadcn-ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn-ui/avatar";
import Link from "next/link";
import useSWR from "swr";
import PlaceOfferDialog from "@/components/dietideals24-ui/placeOfferDialog";
import { cn } from "@/lib/utils";
import { useUserContext } from "@/app/providers/userProvider";
import LoadingSpinner from "@/components/dietideals24-ui/loadingSpinner";
import AuctionTimer from "@/components/dietideals24-ui/auctionTimer";
import config from "@/config";
import useSWRImmutable from "swr/immutable";
import { useState, useEffect } from "react";
import AuctionDetailsImage from "@/components/dietideals24-ui/auctionDetailsImage";
import ProfilePic from "@/components/dietideals24-ui/profilePic";
import PlaceOfferButton from "@/components/dietideals24-ui/placeOfferButton";

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
    data: highestOfferFromAuction,
    error: highestOfferFromAuctionError,
    isLoading: highestOfferFromAuctionIsLoading,
  } = useSWR(
    config.apiUrl + "/offers/highest-offer/" + searchParams.id,
    fetcher,
    { refreshInterval: 500 }
  );

  const {
    data: userBySearchParams,
    error: userByIdError,
    isLoading: userByIdIsLoading,
  } = useSWR(config.apiUrl + "/users/" + searchParams.auctionuserid, fetcher);

  const {
    data: highestOfferUserData,
    error: highestOfferUserError,
    isLoading: highestOfferUserIsLoading,
  } = useSWR(
    config.apiUrl + "/users/" + highestOfferFromAuction?.idUserAccount,
    fetcher
  );

  const auctionDetailsUser =
    searchParams.auctionuserid !== currentUser?.id
      ? userBySearchParams
      : currentUser;

  const imgFetcher = (url) =>
    fetch(url)
      .then((res) => res.blob())
      .then((imgBlob) => URL.createObjectURL(imgBlob));

  const {
    data: profilePicHighestOffererData,
    error: profilePicHighestOffererDataError,
    isLoading: profilePicHighestOffererDataIsLoading,
  } = useSWR(
    config.apiUrl + "/users/image?key=" + highestOfferUserData?.profilePicUrl,
    imgFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 86400000, // 24 hours
      shouldRetryOnError: false,
    }
  );

  if (currentAuctionIsLoading || userByIdIsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const highestOfferUserId = highestOfferFromAuction
    ? highestOfferFromAuction.idUserAccount
    : currentAuction.idUserAccount;

  function generateDeadline(deadline, time) {
    const deadlineTime = time ? time.split(":") : "";
    const hours = parseInt(deadlineTime[0]);
    const minutes = parseInt(deadlineTime[1]);
    const seconds = parseInt(deadlineTime[2]);
    deadline.setHours(hours, minutes, seconds);

    return deadline;
  }

  const fixedTimeDeadline = new Date(currentAuction.expireDate);
  const fixedTimeDeadlineTimer = generateDeadline(
    fixedTimeDeadline,
    currentAuction.expireTime
  );

  const englishDeadline = new Date();
  const englishDeadlineTimer = generateDeadline(
    englishDeadline,
    currentAuction.baseTimer
  );

  const descendingDeadline = new Date();
  const descendingDeadlineTimer = generateDeadline(
    descendingDeadline,
    currentAuction.baseTimer
  );
  
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

              <ProfilePic
                userId={currentAuction.idUserAccount}
                picUrl={auctionDetailsUser?.profilePicUrl}
              />

              <div className="flex flex-col md:flex-row w-full mt-7 justify-between mx-8">
                <div className="flex flex-col w-full md:mr-4">
                  <Label className="flex mb-2">
                    Current offer<div className="text-red-500"></div>
                  </Label>
                  <div className="flex">
                    <Link href={"/public-profile?id=" + highestOfferUserId}>
                      <Avatar className="h-8 w-8 mt-0.5 mr-2.5 hover:opacity-90">
                        <AvatarImage
                          src={profilePicHighestOffererData}
                          alt="@avatar"
                        />
                        <AvatarFallback />
                      </Avatar>
                    </Link>
                    <Input
                      className="h-9 bg-white mb-4 md:mb-0"
                      type="text"
                      placeholder="No offer yet"
                      defaultValue={currentOffer}
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full md:ml-4">
                  <Label className="flex mb-2">
                    Timer<div className="text-red-500"></div>
                  </Label>
                  {/* <Input
                    className="max-w-[20em] h-9 bg-white"
                    type="text"
                    placeholder="Placeholder"
                    defaultValue={timerValue}
                    readOnly
                  /> */}
                  <div className="text-base bg-white py-1 h-9 px-3 rounded border border-input">
                    <AuctionTimer
                      deadline={
                        currentAuction.auctionType === "english"
                          ? englishDeadlineTimer
                          : currentAuction.auctionType === "descending"
                          ? descendingDeadlineTimer
                          : fixedTimeDeadlineTimer
                      }
                      auction={currentAuction}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row w-full mt-4 md:mt-8 justify-between">
                <div className="flex flex-col w-full md:mr-4">
                  <Label className="flex mb-2">
                    Category<div className="text-red-500"></div>
                  </Label>
                  <Input
                    className="h-9 bg-white mb-4 md:mb-0"
                    type="text"
                    placeholder="Placeholder"
                    defaultValue={currentAuction.auctionCategory}
                    readOnly
                  />
                </div>

                <div className="flex flex-col w-full md:ml-4">
                  <Label className="flex mb-2">
                    Quality<div className="text-red-500"></div>
                  </Label>
                  <Input
                    className="h-9 bg-white"
                    type="text"
                    placeholder="Placeholder"
                    defaultValue={currentAuction.auctionQuality}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex w-full mt-8 justify-center">
                <div className="flex flex-col w-full">
                  <Label className="flex mb-2">Description</Label>
                  <Textarea
                    className="resize-none bg-white h-32"
                    placeholder="Type your description here."
                    defaultValue={currentAuction.auctionDescription}
                    readOnly
                  />
                </div>
              </div>
              <PlaceOfferButton
                auction={currentAuction}
                isCurrentUser={currentUser && searchParams.auctionuserid == currentUser.id}
                handleCurrentOffer={handleCurrentOffer}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
