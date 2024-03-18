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

export default function PlaceOfferDialog({ auction }) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const { currentUser } = useUserContext();

  const offerAmountRef = useRef(null);
  const placeOfferButtonRef = useRef(null);

  async function onSubmit(event) {
    event.preventDefault();

    const offerAmount = offerAmountRef
      ? offerAmountRef.current
        ? offerAmountRef.current.value
        : -1
      : -1;
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
          auction.currentOffer + auction.raiseThreshold <= offerAmount)
      ) {
        toast.success("Your offer has been placed correctly.");

        placeOfferButtonRef.current.style.opacity = "0.5";
        placeOfferButtonRef.current.disabled = true;
        placeOfferButtonRef.current.innerText = "Refresh the page";

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
            .then(() => {
              console.log("Auction has ended");
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
            .then(() => {
              console.log(
                "Notifications for auction ended created successfully"
              );
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
              console.log("Offers from auction id fetched successfully!");

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
                  .then(() => {
                    console.log(
                      "Notifications for auction ended created successfully"
                    );
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
        toast.error(
          "You must place an offer greater than the max current offer!"
        );
      } else if (
        auction.auctionType === "english" &&
        auction.currentOffer + auction.raiseThreshold >
          offerFromInputs.offerAmount
      ) {
        const minimumOffer = auction.currentOffer + auction.raiseThreshold;

        toast.error(
          "You must place an offer greater or equal than €" + minimumOffer + "!"
        );
      }
    } else {
      toast.error("You must place an offer less than 9999!");
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
                  {auction.currentOffer + auction.raiseThreshold}€
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
