import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "./loadingSpinner";
import config from "@/config";

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
  // const [hasMounted, setHasMounted] = useState(false);
  const [auctionEnded, setAuctionEnded] = useState(false);

  useEffect(() => {
    if (!auction.isOver) {
      const timer = setInterval(() => {
        // SET TIMER
        switch (auction.auctionType) {
          case "fixedtime":
            setTimeLeft(calculateTimeLeftBasedOnDate(deadline));
            break;

          case "english":
            fetch(config.apiUrl + "/auctions/" + auction.id)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
              })
              .then((auction) => {
                setTimeLeft(auction.currentTimer);
              })
              .catch((error) => {
                console.error(
                  "Error while fetching auctions (english): " + error.message
                );
              });
            break;

          case "descending":
            fetch(config.apiUrl + "/auctions/" + auction.id)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
              })
              .then((auction) => {
                setTimeLeft(auction.currentTimer);
              })
              .catch((error) => {
                console.error(
                  "Error while fetching auctions (descending): " + error.message
                );
              });
            break;
        }

        // SET END
        if (
          Object.keys(timeLeft).length === 0 &&
          !auctionEnded &&
          !auction.isOver
        ) {
          switch (auction.auctionType) {
            case "fixedtime":
              setAuctionEnded(true);
              clearInterval(timer);

              // set isOver attribute in DB to true
              fetch(
                config.apiUrl +
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

              // NOTIFICATIONS
              // (SELLER)
              const fixedTimeNoti = {
                id: auction.id + auction.idUserAccount,
                auctionName: auction.auctionName,
                idAuction: auction.id,
                idUserAccount: auction.idUserAccount,
              };

              fetch(config.apiUrl + "/notifications/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fixedTimeNoti),
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
                    const fixedTimeNoti = {
                      id: auction.id + auction.idUserAccount,
                      auctionName: auction.auctionName,
                      idAuction: auction.id,
                      idUserAccount: offer.idUserAccount,
                    };

                    fetch(
                      config.apiUrl + "/notifications/create",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(fixedTimeNoti),
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
                  });
                })
                .catch((error) => {
                  console.error(
                    "Error while fetching offers from auction id: " +
                      error.message
                  );
                });
              break;

            case "english":
              if (auction.currentTimer === "00:00:00") {
                setAuctionEnded(true);
                clearInterval(timer);

                // set isOver attribute in DB to true
                fetch(
                  config.apiUrl +
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
                      "Error while setting is over (fixedtime): " +
                        error.message
                    );
                  });

                // NOTIFICATIONS
                // (SELLER)
                const englishNoti = {
                  id: auction.id + auction.idUserAccount,
                  auctionName: auction.auctionName,
                  idAuction: auction.id,
                  idUserAccount: auction.idUserAccount,
                };

                fetch(
                  config.apiUrl + "/notifications/create",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(englishNoti),
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

                // (BUYER)
                fetch(
                  config.apiUrl + "/offers/" + auction.id,
                  {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                  }
                )
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Network response was not ok");
                    }

                    return response.json();
                  })
                  .then((offers) => {
                    console.log("Offers from auction id fetched successfully!");

                    offers.map((offer) => {
                      const englishNoti = {
                        id: auction.id + auction.idUserAccount,
                        auctionName: auction.auctionName,
                        idAuction: auction.id,
                        idUserAccount: offer.idUserAccount,
                      };

                      fetch(
                        config.apiUrl +
                          "/notifications/create",
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(englishNoti),
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
                            "Error while creating notification: " +
                              error.message
                          );
                        });
                    });
                  })
                  .catch((error) => {
                    console.error(
                      "Error while fetching offers from auction id: " +
                        error.message
                    );
                  });
              }
              break;

            case "descending":
              if (auction.currentOffer === auction.endPrice) {
                setAuctionEnded(true);
                clearInterval(timer);

                fetch(
                  config.apiUrl +
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
                      "Error while setting is over (fixedtime): " +
                        error.message
                    );
                  });

                const descendingNoti = {
                  id: auction.id + auction.idUserAccount,
                  auctionName: auction.auctionName,
                  idUserAccount: auction.idUserAccount,
                  idAuction: auction.id,
                };

                fetch(
                  config.apiUrl + "/notifications/create",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(descendingNoti),
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

        // setHasMounted(true);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [deadline, auction, auctionEnded, timeLeft]);

  // !hasMounted maybe useless
  if (
    typeof timeLeft === "object" &&
    auction.auctionType !== "fixedtime" &&
    !auction.isOver
  ) {
    return (
      <div className="flex justify-center mt-1">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
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
