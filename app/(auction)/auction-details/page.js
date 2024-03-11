"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { useCookies } from "next-client-cookies";
import useSWR from "swr";
import DescendingAuctionDetailsInputs from "@/app/components/auctions/descendingAuctionDetailsInputs";
import EnglishAuctionDetailsInputs from "@/app/components/auctions/englishAuctionDetailsInputs";
import FixedTimeAuctionDetailsInputs from "@/app/components/auctions/fixedTimeAuctionDetailsInputs";
import PlaceOfferDialog from "@/app/components/placeOfferDialog";
import { cn } from "@/lib/utils";
import { useUserContext } from "@/app/providers/userProvider";
import LoadingSpinner from "@/app/components/loadingSpinner";
import AuctionTimer from "@/app/components/auctionTimer";

export default function AuctionDetailsPage({ searchParams }) {
  const authToken = useCookies().get("auth-token");

  const { currentUser } = useUserContext();

  const fetcher = (url) =>
    fetch(url, { next: { revalidate: 0 } }).then((res) => res.json());

  const {
    data: currentAuction,
    error: currentAuctionError,
    isLoading: currentAuctionIsLoading,
  } = useSWR(
    process.env.NEXT_PUBLIC_BASEURL + "/auctions/" + searchParams.id,
    fetcher,
    { refreshInterval: 100 }
  );

  const {
    data: highestOfferFromAuction,
    error: highestOfferFromAuctionError,
    isLoading: highestOfferFromAuctionIsLoading,
  } = useSWR(
    process.env.NEXT_PUBLIC_BASEURL +
      "/offers/highest-offer/" +
      searchParams.id,
    fetcher,
    { refreshInterval: 500 }
  );

  if (currentAuctionIsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const highestOfferUserId = highestOfferFromAuction
    ? highestOfferFromAuction.idUserAccount
    : currentAuction.idUserAccount;

  const timerValue =
    currentAuction.auctionType === "english"
      ? currentAuction.currentOfferTimer
      : currentAuction.auctionType === "descending"
      ? currentAuction.currentDecrementTimer
      : currentAuction.auctionType === "fixedtime"
      ? "69:69:69"
      : "00:00:00";

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
    currentAuction.baseOfferTimer
  );

  const descendingDeadline = new Date();
  const descendingDeadlineTimer = generateDeadline(
    descendingDeadline,
    currentAuction.baseDecrementTimer
  );

  return (
    <>
      <div className="flex flex-col md:flex-row mx-20 justify-between">
        <div className="flex flex-col md:ml-20 mt-4">
          <Label className="flex text-2xl mb-2">
            {currentAuction.auctionName}
          </Label>
          <Image
            alt="auction-image"
            className="rounded-lg mb-2.5 border-2 border-input"
            src="https://m.media-amazon.com/images/I/A1P5H1w-mnL._UF1000,1000_QL80_.jpg"
            width={410}
            height={180}
          />
          {/* IDEA TO SHOW OTHER AUCTION IMAGES*/}
          {/* <div className="flex">
            <Image
              alt="auction-image-1"
              className="rounded-lg mx-1"
              src="https://m.media-amazon.com/images/I/A1P5H1w-mnL._UF1000,1000_QL80_.jpg"
              width={130}
              height={80}
            />
            <Image
              alt="auction-image-2"
              className="rounded-lg mx-1"
              src="https://m.media-amazon.com/images/I/A1P5H1w-mnL._UF1000,1000_QL80_.jpg"
              width={130}
              height={80}
            />
            <Image
              alt="auction-image-3"
              className="rounded-lg mx-1"
              src="https://m.media-amazon.com/images/I/A1P5H1w-mnL._UF1000,1000_QL80_.jpg"
              width={130}
              height={80}
            />
          </div> */}
        </div>
        <div className="flex flex-col max-w-2xl my-8">
          <div className="px-10 bg-stone-200 rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.2),_0px_8px_24px_rgba(17,17,26,0.2),_0px_16px_56px_rgba(17,17,26,0.2)]">
            <div className="flex flex-col justify-center items-center">
              <Label className="flex text-base mb-4 bg-white rounded-b-lg pb-1 px-2 border border-input">
                {currentAuction.auctionType.toUpperCase()} Auction
              </Label>

              <Link href={"/public-profile?id=" + currentAuction.idUserAccount}>
                <Avatar className="h-32 w-32 hover:opacity-90">
                  <AvatarImage
                    src="https://i.scdn.co/image/ab676161000051744e975208a929cd58c552c55b"
                    alt="@avatar"
                  />
                  <AvatarFallback />
                </Avatar>
              </Link>
              <div className="flex flex-col md:flex-row w-full mt-7 justify-between mx-8">
                <div className="flex flex-col w-full md:mr-4">
                  <Label className="flex mb-2">
                    Current offer<div className="text-red-500"></div>
                  </Label>
                  <div className="flex">
                    <Link href={"/public-profile?id=" + highestOfferUserId}>
                      <Avatar className="h-8 w-8 mt-0.5 mr-2.5 hover:opacity-90">
                        <AvatarImage
                          src="https://i.scdn.co/image/ab676161000051744e975208a929cd58c552c55b"
                          alt="@avatar"
                        />
                        <AvatarFallback />
                      </Avatar>
                    </Link>
                    <Input
                      className="max-w-[10em] h-9 bg-white mb-4 md:mb-0"
                      type="text"
                      placeholder="Placeholder"
                      defaultValue={currentAuction.currentOffer}
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
              <div className="mt-8 mb-5">
                {authToken === "no-token" ? (
                  <Link
                    className={cn(
                      buttonVariants({
                        variant: "default",
                        size: "default",
                        className: "p-7 text-lg",
                      })
                    )}
                    href="/login"
                  >
                    Place offer
                  </Link>
                ) : currentUser &&
                  searchParams.auctionuserid != currentUser.id ? (
                  <PlaceOfferDialog auction={currentAuction} />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
