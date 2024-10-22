"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AuctionTimer from "./auctionTimer";
import LoadingSpinner from "./loadingSpinner";
import config from "@/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

export default function CardAuction({ isHomepage, isMobile, auction }) {
  function generateDeadline(deadline, time) {
    const deadlineTime = time ? time.split(":") : "";
    const hours = parseInt(deadlineTime[0]);
    const minutes = parseInt(deadlineTime[1]);
    const seconds = parseInt(deadlineTime[2]);
    deadline.setHours(hours, minutes, seconds);

    return deadline;
  }

  const fixedTimeDeadline = new Date(auction.expireDate);
  const fixedTimeDeadlineTimer = generateDeadline(
    fixedTimeDeadline,
    auction.expireTime
  );

  const englishDeadline = new Date();
  const englishDeadlineTimer = generateDeadline(
    englishDeadline,
    auction.baseTimer
  );

  const descendingDeadline = new Date();
  const descendingDeadlineTimer = generateDeadline(
    descendingDeadline,
    auction.baseTimer
  );

  const [currentOffer, setCurrentOffer] = useState("");

  useEffect(() => {
    if (!auction.isOver) {
      const interval = setInterval(() => {
        fetchCurrentOffer(auction.id).then((fetchedData) => {
          setCurrentOffer(fetchedData);
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [auction.isOver, auction.id]);

  async function fetchCurrentOffer(auctionid) {
    const currentUpdatedAuction = await fetch(
      config.apiUrl + "/auctions/" + auctionid
    );

    const updatedAuction = await currentUpdatedAuction.json();

    return updatedAuction.currentOffer;
  }

  const imgFetcher = (url) =>
    fetch(url)
      .then((res) => res.blob())
      .then((imgBlob) => URL.createObjectURL(imgBlob));

  const {
    data: auctionPicData,
    error: auctionPicDataError,
    isLoading: auctionPicDataIsLoading,
  } = useSWRImmutable(
    config.apiUrl + "/auctions/image?key=" + auction.auctionImages,
    imgFetcher
  );

  return (
    <>
      {isHomepage && !isMobile ? (
        <div className="">
          <button className="relative mt-10 bg-white w-64 h-80 flex justify-center rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.15)]">
            <div>
              <Image
                alt="card-image"
                className="mt-4 pb-[5.5em] px-3 rounded-lg flex items-center object-cover"
                src={
                  auction.auctionImages !== "no-images"
                    ? auctionPicData
                    : "https://www.frosinonecalcio.com/wp-content/uploads/2021/09/default-placeholder.png"
                }
                fill
              />
            </div>

            <div className="absolute bottom-2 left-0 right-0 text-base flex flex-col">
              <div className="flex justify-center items-center">
                {auction.auctionName}
              </div>

              <div className="flex justify-center">
                {currentOffer ? (
                  <div className="text-2xl mr-4">€{currentOffer}</div>
                ) : (
                  <div></div>
                  // <LoadingSpinner />
                )}

                <div className="text-xl mt-0.5 bg-stone-200 rounded w-[7.5em] h-8 pt-0.5">
                  <AuctionTimer
                    deadline={
                      auction.auctionType === "english"
                        ? englishDeadlineTimer
                        : auction.auctionType === "descending"
                        ? descendingDeadlineTimer
                        : fixedTimeDeadlineTimer
                    }
                    auction={auction}
                  />
                </div>
              </div>
            </div>
          </button>
        </div>
      ) : (
        <div className="flex">
          <button
            className={`px-2 relative bg-white ${
              isMobile
                ? "w-44 h-64 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.15)]"
                : "w-64 h-56"
            } flex justify-center rounded-lg`}
          >
            <div className="flex flex-col">
              <Image
                alt="card-image"
                className={`object-cover ${
                  isMobile ? "w-[11.5em] h-36" : "w-56 h-36"
                }  mt-4 flex items-center`}
                src={
                  auction.auctionImages !== "no-images"
                    ? auctionPicData
                    : "https://www.frosinonecalcio.com/wp-content/uploads/2021/09/default-placeholder.png"
                }
                width={230}
                height={140}
              />

              <div className="text-base flex flex-col">
                <div>{auction.auctionName}</div>

                <div
                  className={`flex ${
                    isMobile
                      ? "flex-col justify-center"
                      : "flex-row justify-between"
                  } `}
                >
                  <div className="text-2xl">€{auction.currentOffer}</div>
                  {auction.auctionType === "fixedtime" && (
                    <div
                      className={`text-xl mt-0.5 ${
                        isMobile ? "" : "px-2 w-[7.5em]"
                      } bg-stone-200 rounded h-8 pt-0.5`}
                    >
                      <AuctionTimer
                        deadline={fixedTimeDeadlineTimer}
                        auction={auction}
                      />
                    </div>
                  )}
                  {auction.auctionType === "english" && (
                    <div
                      className={`text-xl mt-0.5 ${
                        isMobile ? "" : "px-2 w-[7.5em]"
                      } bg-stone-200 rounded h-8 pt-0.5`}
                    >
                      <AuctionTimer
                        deadline={englishDeadlineTimer}
                        auction={auction}
                      />
                    </div>
                  )}
                  {auction.auctionType === "descending" && (
                    <div
                      className={`text-xl mt-0.5 ${
                        isMobile ? "" : "px-2 w-[7.5em]"
                      } bg-stone-200 rounded h-8 pt-0.5`}
                    >
                      <AuctionTimer
                        deadline={descendingDeadlineTimer}
                        auction={auction}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </button>
        </div>
      )}
    </>
  );
}
