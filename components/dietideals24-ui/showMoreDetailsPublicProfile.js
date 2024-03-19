"use client";

import {
  DotsHorizontalIcon,
  GlobeIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

export default function ShowMoreDetailsPublicProfile({ publicProfileUser }) {
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  return (
    <>
      <div
        className={`p-2 md:mt-2  ${
          showMoreDetails ? "bg-stone-200 rounded-full w-9" : ""
        }`}
      >
        <DotsHorizontalIcon
          onClick={() => {
            setShowMoreDetails(!showMoreDetails);
          }}
          hidden={
            !publicProfileUser.telephoneNumber && !publicProfileUser.website
          }
          width={20}
          height={20}
        />
      </div>

      <div className="mt-2 text-stone-600" hidden={!showMoreDetails}>
        <div className="flex items-center">
          <ChatBubbleIcon width={20} height={20} className="mr-2"/> {publicProfileUser.telephoneNumber}
        </div>
      </div>

      <div className="mt-2 text-stone-600" hidden={!showMoreDetails}>
        <div className="flex items-center">
          <GlobeIcon width={20} height={20} className="mr-2"/> {publicProfileUser.website}
        </div>
      </div>
    </>
  );
}
