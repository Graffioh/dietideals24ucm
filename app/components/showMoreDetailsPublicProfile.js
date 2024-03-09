"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function ShowMoreDetailsPublicProfile({ publicProfileUser }) {
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  return (
    <>
      <DotsHorizontalIcon
        onClick={() => {
          setShowMoreDetails(!showMoreDetails);
        }}
        hidden={
          !publicProfileUser.telephoneNumber || !publicProfileUser.website
        }
        width={20}
        height={20}
        className={`md:mt-2 ${showMoreDetails ? "bg-stone-200 rounded" : ""}`}
      />

        <div className="mt-2 text-stone-600" hidden={!showMoreDetails} >
          Mobile number: {publicProfileUser.telephoneNumber}
        </div>

        <div className="mt-2 text-stone-600" hidden={!showMoreDetails} >
          Website: {publicProfileUser.website}
        </div>
    </>
  );
}
