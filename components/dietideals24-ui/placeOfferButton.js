"use client";

import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../shadcn-ui/button";

import PlaceOfferDialog from "./placeOfferDialog";

export default function PlaceOfferButton({
  auction,
  isAuctionOwner,
  handleCurrentOffer,
}) {
  const authToken = useCookies().get("auth-token");
  return (
    <div className="mt-8 mb-5">
      {!authToken || authToken === "no-token" ? (
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
      ) : !isAuctionOwner ? (
        <PlaceOfferDialog
          auction={auction}
          onCurrentOfferChange={handleCurrentOffer}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}
