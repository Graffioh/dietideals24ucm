import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "./loadingSpinner";

const calculateTimeLeft = (deadline) => {
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
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(deadline));
  const [hasMounted, setHasMounted] = useState(false);
  const [auctionEnded, setAuctionEnded] = useState(false);

  useEffect(() => {

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(deadline);

      if (auction.auctionType !== "descending") {
        setTimeLeft(newTimeLeft);
      } else {
        fetch("http://localhost:8080/auction-from-id?id=" + auction.id)
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
            console.error("Fetch error: " + error.message);
          });
      }

      if (
        Object.keys(newTimeLeft).length === 0 &&
        !auctionEnded &&
        auction.auctionType !== "descending"
      ) {
        setAuctionEnded(true);
        clearInterval(timer);

        // set isOver attribute in DB to true
        fetch("http://localhost:8080/set-auction-isover?id=" + auction.id, {
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
      } else if (
        Object.keys(timeLeft).length === 0 &&
        !auctionEnded &&
        auction.auctionType === "descending" &&
        auction.currentOffer === auction.minimumPrice
      ) {
        setAuctionEnded(true);
        clearInterval(timer);
      }

    setHasMounted(true);
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline, auction.id, auction.auctionType, auction.currentOffer, auction.minimumPrice]);

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
      {Object.keys(timeLeft).length > 0 ? (
        auction.currentOffer !== auction.minimumPrice ? (
          auction.auctionType === "descending" ? (
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
      )}
    </div>
  );
}
