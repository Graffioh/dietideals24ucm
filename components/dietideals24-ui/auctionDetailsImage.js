"use client";

import { Label } from "../shadcn-ui/label";
import Image from "next/image";

import LoadingSpinner from "./loadingSpinner";

import config from "@/config";
import useSWRImmutable from "swr";

export default function AuctionDetailsImage({ auction }) {
  const imgFetcher = (url) =>
    fetch(url)
      .then((res) => res.blob())
      .then((imgBlob) => URL.createObjectURL(imgBlob));

  const {
    data: auctionPicData,
    error: auctionPicDataError,
    isLoading: auctionPicDataIsLoading,
  } = useSWRImmutable(
    config.apiUrl + "/auctions/image?key=" + auction?.auctionImages,
    imgFetcher
  );

  if(auctionPicDataIsLoading) {
    return (
        <div className="flex h-screen items-center justify-center">
          <LoadingSpinner />
        </div>
      );
  }
  return (
    <div className="flex flex-col md:ml-20 mt-4 md:mr-10">
      <Label className="flex text-2xl mb-2">{auction.auctionName}</Label>
      <Image
        alt="auction-image"
        className="rounded-lg mb-2.5 border-2 border-input"
        src={
          auction.auctionImages !== "no-images"
            ? auctionPicData
            : "https://www.frosinonecalcio.com/wp-content/uploads/2021/09/default-placeholder.png"
        }
        width={410}
        height={180}
      />
      {/* IDEA TO SHOW OTHER AUCTION IMAGES*/}
      {/* <div className="flex">
            <Image
              alt="auction-image-1"
              className="rounded-lg mx-1"
              src="https://m.media-amazon.com/images/I/A1P5H1w-mnL._UF1000,1000_QL80_.jpg"
              width={130}
              height={80}
            />
            <Image
              alt="auction-image-2"
              className="rounded-lg mx-1"
              src="https://m.media-amazon.com/images/I/A1P5H1w-mnL._UF1000,1000_QL80_.jpg"
              width={130}
              height={80}
            />
            <Image
              alt="auction-image-3"
              className="rounded-lg mx-1"
              src="https://m.media-amazon.com/images/I/A1P5H1w-mnL._UF1000,1000_QL80_.jpg"
              width={130}
              height={80}
            />
          </div> */}
    </div>
  );
}
