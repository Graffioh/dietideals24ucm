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

    if (
      auction.auctionType != "descending" &&
      auction.currentOffer < offerAmount
    ) {
      alert("La tua offerta é stata piazzata correttamente");
      await fetch(process.env.NEXT_PUBLIC_BASEURL + "/insert-offer", {
        method: "POST",
        body: JSON.stringify(offerFromInputs),
        headers: { "Content-Type": "application/json" },
      });

      await fetch(
        process.env.NEXT_PUBLIC_BASEURL +
          "/auctions/" +
          auction.id +
          "/current-offer?newCurrentOffer=" +
          offerAmount,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      setDialogOpen(false);
    } else if (
      auction.auctionType != "descending" &&
      auction.currentOffer >= offerAmount
    ) {
      alert("Fai un offerta maggiore dell'offerta corrente");
    }
  }

  async function onSubmitDescending(event) {
    event.preventDefault();

    const offerFromInputs = {
      id: Date.now(),
      offerAmount: auction.currentOffer,
      idUserAccount: auction.idUserAccount,
      idAuction: auction.id,
    };

    if (auction.auctionType == "descending") {
      alert("La tua offerta é stata piazzata correttamente");
      await fetch(process.env.NEXT_PUBLIC_BASEURL + "/insert-offer", {
        method: "POST",
        body: JSON.stringify(offerFromInputs),
        headers: { "Content-Type": "application/json" },
      });
    }

    if (auction.auctionType == "descending") {
      fetch(
        process.env.NEXT_PUBLIC_BASEURL +
          "/auctions/" +
          auction.id +
          "/is-over",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
        })
        .then(() => {
          console.log("Auction has ended");
        })
        .catch((error) => {
          console.error("Failed to fetch: ", error);
        });
    }
  }

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  if (auction.auctionType != "descending") {
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
  } else if (auction.auctionType == "descending") {
    return (
      <>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="default"
              className="p-7 text-lg"
              onClick={onSubmitDescending}
            >
              Place Offer
            </Button>
          </AlertDialogTrigger>
        </AlertDialog>
      </>
    );
  }
}
