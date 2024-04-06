"use client";

import Link from "next/link";

import PlaceOfferDialog from "./placeOfferDialog";

export default function PlaceOfferButton({
  auction,
  authToken,
  currentUser,
  searchParamsUserId,
  handleCurrentOffer,
}) {
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
      ) : currentUser && searchParamsUserId != currentUser.id ? (
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
