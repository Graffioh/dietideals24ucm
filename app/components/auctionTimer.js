import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "./loadingSpinner";

const calculateTimeLeftBasedOnDate = (deadline) => {
  const difference = +new Date(deadline) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const formatTimeLeft = (timeLeft) => {
  const parts = [];
  if (timeLeft.days > 0) parts.push(`${timeLeft.days}d`);
  if (timeLeft.hours > 0) parts.push(`${timeLeft.hours}h`);
  if (timeLeft.minutes > 0) parts.push(`${timeLeft.minutes}m`);
  if (timeLeft.days <= 0) parts.push(`${timeLeft.seconds}s`);
  return parts.join(" ");
};

export default function AuctionTimer({ deadline, auction }) {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeftBasedOnDate(deadline)
  );
  const [hasMounted, setHasMounted] = useState(false);
  const [auctionEnded, setAuctionEnded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      // SET TIMER
      switch (auction.auctionType) {
        case "fixedtime":
          setTimeLeft(calculateTimeLeftBasedOnDate(deadline));
          break;

        case "english":
          fetch(process.env.NEXT_PUBLIC_BASEURL + "/auctions/" + auction.id)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then((auction) => {
              setTimeLeft(auction.currentOfferTimer);
            })
            .catch((error) => {
              console.error(
                "Error while fetching auctions (english): " + error.message
              );
            });
          break;

        case "descending":
          fetch(process.env.NEXT_PUBLIC_BASEURL + "/auctions/" + auction.id)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then((auction) => {
              setTimeLeft(auction.currentDecrementTimer);
            })
            .catch((error) => {
              console.error(
                "Error while fetching auctions (descending): " + error.message
              );
            });
          break;
      }

      // SET END
      if (Object.keys(timeLeft).length === 0 && !auctionEnded && !auction.isOver) {
        switch (auction.auctionType) {
          case "fixedtime":
            setAuctionEnded(true);
            clearInterval(timer);

            // set isOver attribute in DB to true
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
                console.error(
                  "Error while setting is over (fixedtime): " + error.message
                );
              });

            const noti = {
              id: auction.id + auction.idUserAccount,
              auctionName: auction.auctionName,
              idOffer: 0,
              idAuction: auction.id,
              idUserAccount: auction.idUserAccount,
            };

            fetch(process.env.NEXT_PUBLIC_BASEURL + "/notifications/create", {
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
            break;

          case "english":
            // wait for place offer functionality
            break;

          case "descending":
            if (auction.currentOffer === auction.minimumPrice) {
              setAuctionEnded(true);
              clearInterval(timer);

              console.log(auction.id + "| currentOffer = " + auction.currentOffer + " | minimumPrice = " + auction.minimumPrice)

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
                  console.error(
                    "Error while setting is over (fixedtime): " + error.message
                  );
                });

              const noti = {
                id: auction.id + auction.idUserAccount,
                auctionName: auction.auctionName,
                idUserAccount: auction.idUserAccount,
                idAuction: auction.id,
              };

              fetch(
                process.env.NEXT_PUBLIC_BASEURL +
                  "/notifications/create/" +
                  auction.id,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: noti,
                }
              )
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
            }
            break;
        }
      }

      setHasMounted(true);
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline, auction]);

  if (typeof timeLeft === "object" && auction.auctionType !== "fixedtime") {
    return (
      <div className="flex justify-center mt-1">
        <LoadingSpinner />
      </div>
    );
  }

  // not necessary but it's for consistency with other laoding timers
  if (!hasMounted) {
    return (
      <div className="flex justify-center mt-1">
        <LoadingSpinner />
      </div>
    );
  }

  // mamma mia che immondizia che ho fatto qua
  return (
    <div>
      {/* {Object.keys(timeLeft).length > 0 ? (
        auction.currentOffer !== auction.minimumPrice ? (
          auction.auctionType !== "fixedtime" ? (
            `${timeLeft}`
          ) : (
            `${formatTimeLeft(timeLeft)}`
          )
        ) : (
          <div className="text-red-500 text-lg font-medium">Auction ended</div>
        )
      ) : auction.isOver ? (
        <div className="text-red-500 text-lg font-medium">Auction ended</div>
      ) : (
        <div className="text-red-500 text-lg font-medium"></div>
      )} */}

      {auctionEnded || Object.keys(timeLeft).length === 0 || auction.isOver ? (
        <div className="text-red-500 text-lg font-medium">Auction ended</div>
      ) : auction.auctionType === "fixedtime" ? (
        `${formatTimeLeft(timeLeft)}`
      ) : (
        `${timeLeft}`
      )}
    </div>
  );
}
