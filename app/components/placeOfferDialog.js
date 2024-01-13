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

export default function PlaceOfferDialog({ auctionId }) {
  // query to create offer here

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
          <AlertDialogAction>Place</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
