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
} from "@/components/shadcn-ui/alert-dialog";
import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { toast } from "sonner";
import { useUserContext } from "../../app/providers/userProvider";
import config from "@/config";
import { mutate } from "swr";

export default function PlaceOfferDialog({ auction, onCurrentOfferChange }) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const { currentUser } = useUserContext();

  const offerAmountRef = useRef(null);
  const placeOfferButtonRef = useRef(null);

  async function onSubmit(event) {
    event.preventDefault();

    const offerAmount = offerAmountRef
      ? offerAmountRef.current
        ? offerAmountRef.current.value
        : auction.currentOffer
      : auction.currentOffer;
    const offerFromInputs = {
      id: Date.now(),
      offerAmount:
        auction.auctionType === "descending"
          ? auction.currentOffer
          : offerAmount,
      idUserAccount: currentUser.id,
      idAuction: auction.id,
    };

    if (offerAmount <= 9999) {
      if (
        (auction.auctionType === "fixedtime" &&
          auction.currentOffer < offerAmount) ||
        auction.auctionType === "descending" ||
        (auction.auctionType === "english" &&
          auction.currentOffer + auction.riseThreshold <= offerAmount)
      ) {
        toast.success("Your offer has been placed correctly.");
        onCurrentOfferChange(offerAmount);

        mutate("/auctions/" + auction.id);
        mutate(config.apiUrl + "/offers/highest-offer/" + auction.id);

        await fetch(config.apiUrl + "/offers/insert", {
          method: "POST",
          body: JSON.stringify(offerFromInputs),
          headers: { "Content-Type": "application/json" },
        });

        await fetch(
          config.apiUrl +
            "/auctions/" +
            auction.id +
            "/current-offer?newCurrentOffer=" +
            offerAmount,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (auction.auctionType === "english") {
          await fetch(
            config.apiUrl +
              "/auctions/" +
              auction.id +
              "/current-offertimer?newTimerValue=" +
              auction.baseTimer,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        if (auction.auctionType === "descending") {
          fetch(config.apiUrl + "/auctions/" + auction.id + "/is-over", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
            })
            .catch((error) => {
              console.error("Failed to fetch: ", error);
            });

          // NOTIFICATIONS
          // (SELLER)
          const noti = {
            id: auction.id + auction.idUserAccount,
            auctionName: auction.auctionName,
            idAuction: auction.id,
            idUserAccount: auction.idUserAccount,
          };

          fetch(config.apiUrl + "/notifications/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(noti),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
            })
            .catch((error) => {
              console.error(
                "Error while creating notification: " + error.message
              );
            });

          // (BUYER)
          fetch(config.apiUrl + "/offers/" + auction.id, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }

              return response.json();
            })
            .then((offers) => {
              offers.map((offer) => {
                const noti = {
                  id: auction.id + auction.idUserAccount,
                  auctionName: auction.auctionName,
                  idAuction: auction.id,
                  idUserAccount: offer.idUserAccount,
                };

                fetch(config.apiUrl + "/notifications/create", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(noti),
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Network response was not ok");
                    }
                  })
                  .catch((error) => {
                    console.error(
                      "Error while creating notification: " + error.message
                    );
                  });
              });
            })
            .catch((error) => {
              console.error(
                "Error while fetching offers from auction id: " + error.message
              );
            });
        }

        setDialogOpen(false);
      } else if (
        auction.auctionType === "fixedtime" &&
        auction.currentOffer >= offerAmount
      ) {
        toast.warning(
          "You must place an offer greater than the max current offer!"
        );
      } else if (
        auction.auctionType === "english" &&
        auction.currentOffer + auction.riseThreshold >
          offerFromInputs.offerAmount
      ) {
        const minimumOffer = auction.currentOffer + auction.riseThreshold;

        toast.warning(
          "You must place an offer greater or equal than €" + minimumOffer + "!"
        );
      }
    } else {
      toast.warning("You must place an offer less than 9999!");
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
            onClick={
              auction.auctionType === "descending" ? onSubmit : openDialog
            }
            disabled={auction.isOver}
            ref={placeOfferButtonRef}
          >
            {auction.isOver ? "Auction is over" : "Place offer"}
          </Button>
        </AlertDialogTrigger>
        {isDialogOpen && (
          <AlertDialogContent className="w-64 flex flex-col items-center">
            <AlertDialogHeader>
              <AlertDialogTitle>Place an offer</AlertDialogTitle>
              {auction.auctionType === "fixedtime" ? (
                <AlertDialogDescription>
                  Current max offer: {auction.currentOffer}€
                </AlertDialogDescription>
              ) : (
                <AlertDialogDescription>
                  Minimum acceptable offer:{" "}
                  {auction.currentOffer + auction.riseThreshold}€
                </AlertDialogDescription>
              )}

              <div className="flex justify-center">
                <Input
                  ref={offerAmountRef}
                  type="number"
                  step="0.01"
                  min={auction.currentOffer + 1}
                  max="9999"
                  className="w-48"
                  required
                />
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
