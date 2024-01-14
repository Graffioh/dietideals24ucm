"use client";

import { useState } from "react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import ComboboxCategories from "@/app/components/comboboxCategories";
import ComboboxAuctions from "@/app/components/comboboxAuctions.js";
import ComboboxQuality from "@/app/components/comboboxQualities.js";

import FixedTimeInsertAuctionInputs from "@/app/components/auctions/fixedTimeInsertAuctionInputs";
import EnglishInsertAuctionInputs from "@/app/components/auctions/englishInsertAuctionInputs";
import DescendingInsertAuctionInputs from "@/app/components/auctions/descendingInsertAuctionInputs";

import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import AddAuctionImageBox from "@/app/components/addAuctionImageBox";

export default function InsertAuctionPage() {
  // Category combobox state
  const [category, setCategory] = useState("");

  // Auction combobox state
  const [auctionType, setAuctionType] = useState("");

  function setAuctionTypeFromCombobox(auctionType) {
    setAuctionType(auctionType);
  }

  // Quality combobox state
  const [quality, setQuality] = useState("");

  // English auction inputs state
  // ***************************************
  const [baseStartAuction, setBaseStartAuction] = useState("");
  const [raiseThreshold, setRaiseThreshold] = useState("");
  const [offerTimer, setOfferTimer] = useState("");

  function handleBaseStartAuction(baseStartAuction) {
    setBaseStartAuction(baseStartAuction);
  }

  function handleRaiseThreshold(raiseThreshold) {
    setRaiseThreshold(raiseThreshold);
  }

  function handleOfferTimer(offerTimer) {
    setOfferTimer(offerTimer);
  }
  // ***************************************

  // Fixed Time auction inputs state
  // ***************************************
  const [expireDate, setExpireDate] = useState("");
  // const [expireTime, setExpireTime] = useState("");
  const [fixedTimeMinimumPrice, setFixedTimeMinimumPrice] = useState("");

  function handleExpireDateChange(date) {
    setExpireDate(date);
  }

  function handleExpireTimeChange(time) {
    setExpireTime(time);
  }

  function handleFixedTimeMinimumPriceChange(price) {
    setFixedTimeMinimumPrice(price);
  }
  // ***************************************

  // Descending auction inputs state
  // ***************************************
  const [startPrice, setStartPrice] = useState("");
  const [decrementAmount, setDecrementAmount] = useState("");
  const [expireTime, setExpireTime] = useState("");
  const [timer, setTimer] = useState("");
  const [descendingMinimumPrice, setDescendingMinimumPrice] = useState("");

  function handleStartPrice(startPrice) {
    setStartPrice(startPrice);
  }

  function handleDecrementAmount(decrementAmount) {
    setDecrementAmount(decrementAmount);
  }

  function handleExpireTime(expireTime) {
    setExpireTime(expireTime);
  }

  function handleTimer(timer) {
    setTimer(timer);
  }

  function handleDescendingMinimumPrice(descendingMinimumPrice) {
    setDescendingMinimumPrice(descendingMinimumPrice);
  }
  // ***************************************

  const hiddenFileInput = useRef(null);

  const handleFileUploadClick = () => {
    hiddenFileInput.current.click();
  };

  async function onSubmit(event) {
    event.preventDefault();

    const inputs = event.currentTarget;
    const auctionFromInputs = {
      id: Date.now(),
      auctionDescription: inputs.description.value,
      auctionName: inputs.title.value,
      auctionQuality: "Good",
      currentOffer: 0,
      auctionType: auctionType,
      auctionCategory: "Electronics",
      idUserAccount: 888, // mettere currentUser.id
      auctionImages: "no-images", // mettere le foto prese dalla selezione
      offers: [],
      baseStartAuction: baseStartAuction,
      raiseThreshold: raiseThreshold,
      offerTimer: moment(offerTimer, "H:mm"),
      expireDate: expireDate,
      minimumPrice:
        auctionType == "fixedtime"
          ? fixedTimeMinimumPrice
          : descendingMinimumPrice,
      startPrice: startPrice,
      decrementAmount: decrementAmount,
      expireTime: moment(expireTime, "H:mm"),
      timer: moment(timer, "H:mm"),
    };

    const insertAuctionResponse = await fetch(
      "http://localhost:8080/insert-auction",
      {
        method: "POST",
        body: JSON.stringify(auctionFromInputs),
        headers: { "Content-Type": "application/json" },
      }
    );

    window.location.href = "/home";
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col md:flex-row items-center mt-12">
          <div className="mx-3 mb-6 md:m-6 md:mr-20 md:ml-48 grid md:grid-cols-2 gap-2">
            <AddAuctionImageBox
              handleFileUploadClick={handleFileUploadClick}
              hiddenFileInput={hiddenFileInput}
            />

            <AddAuctionImageBox
              handleFileUploadClick={handleFileUploadClick}
              hiddenFileInput={hiddenFileInput}
            />

            <AddAuctionImageBox
              handleFileUploadClick={handleFileUploadClick}
              hiddenFileInput={hiddenFileInput}
            />
          </div>

          <div className="flex flex-col mx-2">
            <div className="w-72 min-w-screen flex flex-col space-y-3">
              <div>
                <div className="flex mb-2">
                  <Label>
                    Title<span className="text-red-500">*</span>
                  </Label>
                </div>
                <Input
                  maxLength={20}
                  type="text"
                  placeholder="Title"
                  className="bg-white"
                  id="title"
                ></Input>
              </div>

              <div>
                <div className="mb-2">
                  <Label>
                    Description<span className="text-red-500">*</span>
                  </Label>
                </div>
                <Textarea
                  placeholder="Type your description here."
                  className="bg-white"
                  id="description"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col space-y-6">
              <ComboboxCategories></ComboboxCategories>
              <ComboboxAuctions
                onAuctionTypeChange={setAuctionTypeFromCombobox}
              ></ComboboxAuctions>
              <ComboboxQuality></ComboboxQuality>
            </div>
          </div>

          <div className="flex flex-col space-y-6 md:ml-4 mt-4 mb-4">
            {auctionType === "fixedtime" && (
              <FixedTimeInsertAuctionInputs
                onExpireDateChange={handleExpireDateChange}
                onExpireTimeChange={handleExpireTimeChange}
                onFixedTimeMinimumPriceChange={
                  handleFixedTimeMinimumPriceChange
                }
              />
            )}
            {auctionType === "descending" && (
              <DescendingInsertAuctionInputs
                onStartPriceChange={handleStartPrice}
                onDecrementAmountChange={handleDecrementAmount}
                onFixedTimeChange={handleExpireTime}
                onTimerChange={handleTimer}
                onDescendingMinimumPriceChange={handleDescendingMinimumPrice}
              />
            )}
            {auctionType === "english" && (
              <EnglishInsertAuctionInputs
                onBaseStartAuctionChange={handleBaseStartAuction}
                onRaiseThresholdChange={handleRaiseThreshold}
                onOfferTimerChange={handleOfferTimer}
              />
            )}
          </div>
        </div>

        <div className="flex justify-center items-center mb-4">
          <Button className="p-7 text-lg">Create Auction</Button>
        </div>
      </form>
    </>
  );
}
