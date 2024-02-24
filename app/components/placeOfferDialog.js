'use client'
import { useRef } from 'react';
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
  // Create a reference to the offerAmount input
  const offerAmountRef = useRef(null);

  async function onSubmit(event) {
    event.preventDefault();

    // Get the value from the offerAmount input using the reference
    const offerAmount = offerAmountRef.current.value;

    const offerFromInputs = {
      id: Date.now(),
      offerAmount: offerAmount,
      idUserAccount: auction.idUserAccount,
      idAuction: auction.id
    };

    console.log(offerFromInputs);

    const insertOfferResponse = await fetch(
      "http://localhost:8080/insert-offer",
      {
        method: "POST",
        body: JSON.stringify(offerFromInputs),
        headers: { "Content-Type": "application/json" },
      }
    );

    
    // window.location.href = "/home";
  }

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
            {/* Attach the reference to the input */}
            <Input ref={offerAmountRef} type="number" className="w-48" />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Place</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
