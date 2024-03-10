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

  if (currentAuctionIsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row mx-20 justify-between">
        <div className="flex flex-col md:ml-20 mt-8">
          <Label className="flex text-2xl">{currentAuction.auctionName}</Label>
          <Image
            alt="auction-image"
            className="rounded-lg w-96 h-128 mb-20"
            src="https://m.media-amazon.com/images/I/A1P5H1w-mnL._UF1000,1000_QL80_.jpg"
            width={230}
            height={180}
          />
        </div>

        <div className="flex flex-col max-w-2xl my-8">
          <div className="py-5 px-10 bg-stone-200 rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.2),_0px_8px_24px_rgba(17,17,26,0.2),_0px_16px_56px_rgba(17,17,26,0.2)]">
            <div className="flex flex-col justify-center items-center mt-6">
              <Link href={"/public-profile?id=" + currentAuction.idUserAccount}>
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@avatar"
                  />
                  <AvatarFallback />
                </Avatar>
              </Link>
              <div className="flex w-full mt-8 justify-between mx-8">
                <div className="flex flex-col">
                  <Label className="flex mb-2">
                    Current offer<div className="text-red-500"></div>
                  </Label>
                  <Input
                    className="max-w-[20em] h-9 bg-white"
                    type="text"
                    placeholder="Placeholder"
                    defaultValue={currentAuction.currentOffer}
                    readOnly
                  />
                </div>

                <div className="flex flex-col">
                  <Label className="flex mb-2">
                    Decrement timer<div className="text-red-500"></div>
                  </Label>
                  <Input
                    className="max-w-[20em] h-9 bg-white"
                    type="text"
                    placeholder="Placeholder"
                    defaultValue={currentAuction.currentDecrementTimer}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex w-full mt-8 justify-between">
                <div className="flex flex-col">
                  <Label className="flex mb-2">
                    Category<div className="text-red-500"></div>
                  </Label>
                  <Input
                    className="max-w-[20em] h-9 bg-white"
                    type="text"
                    placeholder="Placeholder"
                    defaultValue={currentAuction.auctionCategory}
                    readOnly
                  />
                </div>

                <div className="flex flex-col">
                  <Label className="flex mb-2">
                    Quality<div className="text-red-500"></div>
                  </Label>
                  <Input
                    className="max-w-[20em] h-9 bg-white"
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
              <div className="mt-8">
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
