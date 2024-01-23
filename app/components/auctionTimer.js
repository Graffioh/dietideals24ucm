import React, { useEffect, useState } from "react";
import useSWR from "swr";

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

export default function AuctionTimer({ deadline, id }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(deadline));
  const [hasMounted, setHasMounted] = useState(false);
  const [auctionEnded, setAuctionEnded] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(deadline);
      setTimeLeft(newTimeLeft);

      if (Object.keys(newTimeLeft).length === 0 && !auctionEnded) {
        setAuctionEnded(true);
        clearInterval(timer);

        // set isOver attribute in DB to true
        fetch("http://localhost:8080/auction-isover?id=" + id, {
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
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  if (!hasMounted) {
    return null;
  }

  return (
    <div>
      {Object.keys(timeLeft).length > 0 ? (
        `${formatTimeLeft(timeLeft)}`
      ) : (
        <div className="text-red-500 text-lg font-medium">Auction ended</div>
      )}
    </div>
  );
}
