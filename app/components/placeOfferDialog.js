"use client";
import { useState, useRef } from "react";
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
  const [isDialogOpen, setDialogOpen] = useState(false);

  const offerAmountRef = useRef(null);

  async function onSubmit(event) {
    event.preventDefault();

    const offerAmount = offerAmountRef.current.value;
    const offerFromInputs = {
      id: Date.now(),
      offerAmount: offerAmount,
      idUserAccount: auction.idUserAccount,
      idAuction: auction.id,
    };

    console.log(offerFromInputs);

    if (auction.currentOffer < offerAmount) {
      alert("La tua offerta é stata piazzata correttamente");
      await fetch("http://localhost:8080/insert-offer", {
        method: "POST",
        body: JSON.stringify(offerFromInputs),
        headers: { "Content-Type": "application/json" },
      });

      await fetch(
        "http://localhost:8080/set-auction-currentoffer?id=" +
          auction.id +
          "&newCurrentOffer=" +
          offerAmount,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(auction.currentOffer);

      setDialogOpen(false);
    } else {
      alert("Fai un offerta maggiore dell'offerta corrente");
    }
  }

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="default"
            className="p-7 text-lg"
            onClick={openDialog}
          >
            Place Offer
          </Button>
        </AlertDialogTrigger>
        {isDialogOpen && (
          <AlertDialogContent className="w-64 flex flex-col items-center">
            <AlertDialogHeader>
              <AlertDialogTitle>Place an offer</AlertDialogTitle>
              <AlertDialogDescription>
                Current max offer: {auction.currentOffer} €
              </AlertDialogDescription>
              <div className="flex justify-center">
                <Input ref={offerAmountRef} type="number" className="w-48" />
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeDialog}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onSubmit}>Place</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </>
  );
}
