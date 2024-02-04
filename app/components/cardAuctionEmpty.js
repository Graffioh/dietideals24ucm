"use client";

import AuctionTimer from "./auctionTimer";

export default function CardAuctionEmpty({ isHomepage }) {
  return (
    <>
      {isHomepage ? (
        <div className="">
          <button className="relative mt-10 bg-white w-64 h-80 flex justify-center rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.15)]">
            <div className="relative">
            </div>
          </button>
        </div>
      ) : (
        // MOBILE
        <div className="">
          <button className="relative bg-white w-64 h-56 flex justify-center rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.15)]">
            <div className="relative">
              {/* <img
                className="object-cover w-56 h-36 mt-5 rounded-lg flex items-center"
                src="https://m.media-amazon.com/images/I/A1P5H1w-mnL._UF1000,1000_QL80_.jpg"
              /> */}
            </div>

            <div className="absolute bottom-1 left-0 right-0 text-base flex flex-col">
            </div>
          </button>
        </div>
      )}
    </>
  );
}
