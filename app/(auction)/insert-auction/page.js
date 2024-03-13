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

import { useUserContext } from "@/app/providers/userProvider";

import FixedTimeInsertAuctionInputs from "@/app/components/auctions/fixedTimeInsertAuctionInputs";
import EnglishInsertAuctionInputs from "@/app/components/auctions/englishInsertAuctionInputs";
import DescendingInsertAuctionInputs from "@/app/components/auctions/descendingInsertAuctionInputs";

import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import AddAuctionImageBox from "@/app/components/addAuctionImageBox";
import { toast } from "sonner";

export default function InsertAuctionPage() {
  const { currentUser, currentUserIsLoading } = useUserContext();

  // Category combobox state
  const [category, setCategory] = useState("Category 1");

  // Auction combobox state
  const [auctionType, setAuctionType] = useState("");

  function setAuctionTypeFromCombobox(auctionType) {
    setAuctionType(auctionType);
  }

  // Quality combobox state
  const [quality, setQuality] = useState("Good");

  // English auction inputs state
  // ***************************************
  const [baseStartAuction, setBaseStartAuction] = useState("");
  const [raiseThreshold, setRaiseThreshold] = useState("");
  const [baseOfferTimer, setBaseOfferTimer] = useState("");

  function handleBaseStartAuction(baseStartAuction) {
    setBaseStartAuction(baseStartAuction);
  }

  function handleRaiseThreshold(raiseThreshold) {
    setRaiseThreshold(raiseThreshold);
  }

  function handleBaseOfferTimer(baseOfferTimer) {
    setBaseOfferTimer(baseOfferTimer);
  }

  function validateEnglishAuctionInputs() {
    const validState =
      category &&
      auctionType &&
      quality &&
      baseStartAuction &&
      raiseThreshold &&
      baseOfferTimer;

    return validState;
  }
  // ***************************************

  // Fixed Time auction inputs state
  // ***************************************
  const [expireDate, setExpireDate] = useState("");
  const [expireTime, setExpireTime] = useState("");
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

  function validateFixedTimeAuctionInputs() {
    const validState =
      category && auctionType && quality && expireDate && fixedTimeMinimumPrice;
    return validState;
  }
  // ***************************************

  // Descending auction inputs state
  // ***************************************
  const [startPrice, setStartPrice] = useState("");
  const [decrementAmount, setDecrementAmount] = useState("");
  const [baseDecrementTimer, setDecrementTimer] = useState("");
  const [descendingMinimumPrice, setDescendingMinimumPrice] = useState("");

  function handleStartPrice(startPrice) {
    setStartPrice(startPrice);
  }

  function handleDecrementAmount(decrementAmount) {
    setDecrementAmount(decrementAmount);
  }

  function handleDecrementTimer(timer) {
    setDecrementTimer(timer);
  }

  function handleDescendingMinimumPrice(descendingMinimumPrice) {
    setDescendingMinimumPrice(descendingMinimumPrice);
  }

  function validateDescendingAuctionInputs() {
    const validState =
      category &&
      auctionType &&
      quality &&
      startPrice &&
      decrementAmount &&
      baseDecrementTimer &&
      descendingMinimumPrice;
    return validState;
  }
  // ***************************************

  const createAuctionButtonRef = useRef(null);
  const hiddenFileInput = useRef(null);

  const handleFileUploadClick = () => {
    hiddenFileInput.current.click();
  };

  async function onSubmit(event) {
    event.preventDefault();

    const areFixedTimeInputsValid = validateFixedTimeAuctionInputs();
    const areEnglishInputsValid = validateEnglishAuctionInputs();
    const areDescendingInputsValid = validateDescendingAuctionInputs();

    if (
      !areEnglishInputsValid &&
      !areDescendingInputsValid &&
      !areFixedTimeInputsValid
    ) {
      toast.error("Please fill all the fields before submitting!");
      return;
    }

    const inputs = event.currentTarget;

    // trash
    const currentOffer =
      auctionType === "english"
        ? baseStartAuction
        : auctionType === "descending"
        ? startPrice
        : 0;

    const auctionFromInputs = {
      id: Date.now(),
      auctionDescription: inputs.description.value,
      auctionName: inputs.title.value,
      auctionQuality: "Good",
      currentOffer: currentOffer,
      auctionType: auctionType,
      auctionCategory: "Electronics",
      idUserAccount: currentUser.id,
      auctionImages: "no-images", // mettere le foto prese dalla selezione
      offers: [],
      baseStartAuction: baseStartAuction,
      raiseThreshold: raiseThreshold,
      baseOfferTimer: baseOfferTimer
        ? moment(baseOfferTimer, "HH:mm:ss").format("HH:mm:ss")
        : null,
      expireDate: expireDate,
      minimumPrice:
        auctionType == "fixedtime"
          ? fixedTimeMinimumPrice
          : descendingMinimumPrice,
      startPrice: startPrice,
      decrementAmount: decrementAmount,
      expireTime: expireTime
        ? moment(expireTime, "HH:mm:ss").format("HH:mm:ss")
        : null,
      baseDecrementTimer: baseDecrementTimer
        ? moment(baseDecrementTimer, "HH:mm:ss").format("HH:mm:ss")
        : null,
    };

    try {
      await fetch(process.env.NEXT_PUBLIC_BASEURL + "/auctions", {
        method: "POST",
        body: JSON.stringify(auctionFromInputs),
        headers: { "Content-Type": "application/json" },
      });

      toast.success("The auction has been created.", {
        position: "bottom-center",
      });

      createAuctionButtonRef.current.style.opacity = "0.5";
      createAuctionButtonRef.current.disabled = true;

      setTimeout(() => {
        window.location.href = process.env.NEXT_PUBLIC_BASEURL.replace("/api", "") + "/home";
      }, 1000);
    } catch (e) {
      toast.error("The auction has not been created, a problem occurred.", {
        position: "bottom-center",
      });

      console.error("Error while creating auction: " + e);
    }
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
                  className="resize-none bg-white"
                  id="description"
                  maxLength={250}
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
                onDecrementTimerChange={handleDecrementTimer}
                onDescendingMinimumPriceChange={handleDescendingMinimumPrice}
              />
            )}
            {auctionType === "english" && (
              <EnglishInsertAuctionInputs
                onBaseStartAuctionChange={handleBaseStartAuction}
                onRaiseThresholdChange={handleRaiseThreshold}
                onBaseOfferTimerChange={handleBaseOfferTimer}
              />
            )}
          </div>
        </div>

        <div className="flex justify-center items-center mb-4">
          <Button ref={createAuctionButtonRef} className="p-7 text-lg">
            Create Auction
          </Button>
        </div>
      </form>
    </>
  );
}
