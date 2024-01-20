"use client";

import AuctionTimer from "./auctionTimer";

export default function CardAuction({ isHomepage, auction }) {
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
    auction.offerTimer
  );

  // const descendingDeadline = new Date();
  // const descendingDeadlineTimer = generateDeadline(
  //   descendingDeadline,
  //   auction.decrementTimer
  // );

  return (
    <>
      {isHomepage ? (
        <div className="">
          <button className="relative mt-10 bg-white w-64 h-80 flex justify-center rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.15)]">
            <div className="relative">
              <img
                className="mt-5 rounded-lg flex items-center"
                src="https://m.media-amazon.com/images/I/A1P5H1w-mnL._UF1000,1000_QL80_.jpg"
                width={230}
                height={140}
              />
            </div>

            <div className="absolute bottom-2 left-0 right-0 text-base flex flex-col">
              <div>{auction.auctionName}</div>

              <div className="flex justify-between">
                <div className="text-2xl ml-8">€ {auction.currentOffer}</div>
                {auction.auctionType === "fixedtime" && (
                  <div className="text-xl mr-8 mt-0.5 bg-stone-200 rounded px-2 w-[7em] h-8">
                    <AuctionTimer deadline={fixedTimeDeadlineTimer} />
                  </div>
                )}
                {auction.auctionType === "english" && (
                  <div className="text-xl mr-8 mt-0.5 bg-stone-200 rounded px-2">
                    <AuctionTimer deadline={englishDeadlineTimer} />
                  </div>
                )}
                {auction.auctionType === "descending" && (
                  // <div className="text-xl mr-8 mt-0.5 bg-stone-200 rounded px-2">
                  //   <AuctionTimer deadline={descendingDeadlineTimer} />
                  // </div>
                  <div></div>
                )}
                {/* <div className="text-xl mr-8 mt-0.5">00.00</div> */}
              </div>
            </div>
          </button>
        </div>
      ) : (
        // MOBILE
        <div className="">
          <button className="relative bg-white w-64 h-56 flex justify-center rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.15)]">
            <div className="relative">
              <img
                className="object-cover w-56 h-36 mt-5 rounded-lg flex items-center"
                src="https://m.media-amazon.com/images/I/A1P5H1w-mnL._UF1000,1000_QL80_.jpg"
              />
            </div>

            <div className="absolute bottom-1 left-0 right-0 text-base flex flex-col">
              <div>Il solo e unico GEOLIER</div>

              <div className="flex justify-between">
                <div className="text-2xl ml-8">€ 10,00</div>
                <div className="text-xl mr-8 mt-0.5">00.00.00</div>
              </div>
            </div>
          </button>
        </div>
      )}
    </>
  );
}
