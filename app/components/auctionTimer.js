import React, { useEffect, useState } from "react";

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
  parts.push(`${timeLeft.seconds}s`);
  return parts.join(" ");
};

export default function AuctionTimer({ deadline }) {
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

        // sendAuctionEndRequest();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  if (!hasMounted) {
    return null;
  }

  return (
    <div>
      {Object.keys(timeLeft).length > 0
        ? `${formatTimeLeft(timeLeft)}`
        : "Auction ended"}
    </div>
  );
}
