"use client";

import { Button } from "../shadcn-ui/button";
import { Input } from "../shadcn-ui/input";
import { useState } from "react";
import Image from "next/image";

export default function AddAuctionImageBox({
  onFileChange,
  onHiddenFileInputChange,
  hiddenFileInput,
  disabled,
}) {
  const [imageData, setImageData] = useState("");

  function handleImageData(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      setImageData(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          onHiddenFileInputChange();
        }}
        className={`w-52 h-52 mt-2 text-2xl bg-blue-950 ${
          disabled ? "opacity-75" : "opacity-100"
        } text-white rounded p-3 relative`}
        disabled={disabled}
      >
        {imageData ? (
          <Image
            src={imageData}
            alt="auction-image"
            fill
            style={{ objectFit: "contain" }}
          />
        ) : (
          "+"
        )}
      </Button>
      <Input
        disabled={disabled}
        onChange={(e) => {
          onFileChange(e);
          handleImageData(e);
        }}
        type="file"
        ref={hiddenFileInput}
        style={{ display: "none" }}
        accept="image/jpeg, image/png"
      />
    </div>
  );
}
