"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PlaceOfferDialog({ auction }) {
  // query to create offer here
  // ...

  // if english auction, whenever an offer is placed correctly, reset the timer
  async function handleEnglishAuctionOfferTimer() {
    try {
      await fetch(
        process.env.NEXT_PUBLIC_BASEURL +
          "/auctions/" +
          auction.id +
          "/current-offertimer?newTimerValue=" +
          auction.baseOfferTimer,
        { method: "PUT", headers: { "Content-Type": "application/json" } }
      );
    } catch (e) {
      console.error("Error while updating current offer timer (english): " + e);
    }
  }

  // if descending auction, whenever an offer is placed correctly, end the auction
  // ...

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" className="p-7 text-lg">
          Place Offer
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-64 flex flex-col items-center">
        <AlertDialogHeader>
          <AlertDialogTitle>Place an offer</AlertDialogTitle>
          <AlertDialogDescription>
            Current max offer: ...
          </AlertDialogDescription>
          <div className="flex justify-center">
            <Input type="number" className="w-48" />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={
              auction.auctionType === "english"
                ? handleEnglishAuctionOfferTimer
                : null
            }
          >
            Place
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
