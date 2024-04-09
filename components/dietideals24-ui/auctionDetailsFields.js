"use client";

import { Label } from "@/components/shadcn-ui/label";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn-ui/avatar";
import { Input } from "@/components/shadcn-ui/input";
import AuctionTimer from "@/components/dietideals24-ui/auctionTimer";
import { Textarea } from "@/components/shadcn-ui/textarea";
import useSWR from "swr";
import config from "@/config";

export default function AuctionDetailsFields({
  auction,
  currentOffer,
  auctionId,
}) {
  function generateDeadline(deadline, time) {
    const deadlineTime = time ? time.split(":") : "";
    const hours = parseInt(deadlineTime[0]);
    const minutes = parseInt(deadlineTime[1]);
    const seconds = parseInt(deadlineTime[2]);
    deadline.setHours(hours, minutes, seconds);

    return deadline;
  }

  const fixedTimeDeadline = new Date(auction.expireDate);
  const fixedTimeDeadlineTimer = generateDeadline(
    fixedTimeDeadline,
    auction.expireTime
  );

  const englishDeadline = new Date();
  const englishDeadlineTimer = generateDeadline(
    englishDeadline,
    auction.baseTimer
  );

  const descendingDeadline = new Date();
  const descendingDeadlineTimer = generateDeadline(
    descendingDeadline,
    auction.baseTimer
  );

  const fetcher = (url) =>
    fetch(url, { next: { revalidate: 0 } }).then((res) => res.json());

  const {
    data: highestOfferFromAuction,
    error: highestOfferFromAuctionError,
    isLoading: highestOfferFromAuctionIsLoading,
  } = useSWR(config.apiUrl + "/offers/highest-offer/" + auctionId, fetcher, {
    refreshInterval: 500,
  });

  const {
    data: highestOfferUserData,
    error: highestOfferUserError,
    isLoading: highestOfferUserIsLoading,
  } = useSWR(
    config.apiUrl + "/users/" + highestOfferFromAuction?.idUserAccount,
    fetcher
  );

  const highestOfferUserId = highestOfferFromAuction
    ? highestOfferFromAuction.idUserAccount
    : auction.idUserAccount;

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

  return (
    <>
      <div className="flex flex-col md:flex-row w-full mt-7 justify-between mx-8">
        <div className="flex flex-col w-full md:mr-4">
          <Label className="flex mb-2">
            Current offer<div className="text-red-500"></div>
          </Label>
          <div className="flex">
            <Link href={"/public-profile?id=" + highestOfferUserId}>
              <Avatar className="h-8 w-8 mt-0.5 mr-2.5 hover:opacity-90">
                <AvatarImage src={profilePicHighestOffererData} alt="@avatar" />
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
          <div className="text-base bg-white py-1 h-9 px-3 rounded border border-input">
            <AuctionTimer
              deadline={
                auction.auctionType === "english"
                  ? englishDeadlineTimer
                  : auction.auctionType === "descending"
                  ? descendingDeadlineTimer
                  : fixedTimeDeadlineTimer
              }
              auction={auction}
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
            defaultValue={auction.auctionCategory}
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
            defaultValue={auction.auctionQuality}
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
            defaultValue={auction.auctionDescription}
            readOnly
          />
        </div>
      </div>
    </>
  );
}
