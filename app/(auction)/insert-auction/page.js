"use client";

import { useState } from "react";
import { useRef } from "react";

import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";
import { Textarea } from "@/components/shadcn-ui/textarea";
import Compressor from "compressorjs";

import ComboboxCategories from "@/components/dietideals24-ui/comboboxCategories";
import ComboboxAuctionType from "@/components/dietideals24-ui/comboboxAuctionType.js";
import ComboboxQuality from "@/components/dietideals24-ui/comboboxQualities.js";

import { useUserContext } from "@/app/providers/userProvider";

import FixedTimeInsertAuctionInputs from "@/components/dietideals24-ui/fixedTimeInsertAuctionInputs";
import EnglishInsertAuctionInputs from "@/components/dietideals24-ui/englishInsertAuctionInputs";
import DescendingInsertAuctionInputs from "@/components/dietideals24-ui/descendingInsertAuctionInputs";

import moment from "moment";
import AddAuctionImageBox from "@/components/dietideals24-ui/addAuctionImageBox";
import { toast } from "sonner";
import config from "@/config";
import AuctionTypeInfoDialog from "@/components/dietideals24-ui/auctionTypeInfoDialog";

export default function InsertAuctionPage() {
  const { currentUser, currentUserIsLoading } = useUserContext();

  // Category combobox state
  const [category, setCategory] = useState("");

  function setAuctionCategoryFromCombobox(category) {
    setCategory(category);
  }

  // Auction combobox state
  const [auctionType, setAuctionType] = useState("");

  function setAuctionTypeFromCombobox(auctionType) {
    setAuctionType(auctionType);
  }

  // Quality combobox state
  const [quality, setQuality] = useState("");

  function setAuctionQualityFromCombobox(quality) {
    setQuality(quality);
  }

  const [startPrice, setStartPrice] = useState("");
  const [baseTimer, setBaseTimer] = useState("");

  function handleStartPrice(startPrice) {
    setStartPrice(startPrice);
  }

  function handleBaseTimer(baseTimer) {
    setBaseTimer(baseTimer);
  }

  // English auction inputs state
  // ***************************************
  const [riseThreshold, setRiseThreshold] = useState("");
  const [isOfferTimerValid, setIsOfferTimerValid] = useState(true);

  function handleRiseThreshold(riseThreshold) {
    setRiseThreshold(riseThreshold);
  }

  function validateEnglishAuctionInputs() {
    if (auctionType && auctionType !== "english") {
      return true;
    }

    const isTimerValid = baseTimer && baseTimer.length !== 0 ? true : false;

    if (!isTimerValid) {
      setIsOfferTimerValid(false);
      toast.warning("Please set the offer timer.");
      return false;
    } else {
      setIsOfferTimerValid(true);
    }

    const validState =
      category &&
      auctionType &&
      quality &&
      startPrice &&
      riseThreshold &&
      baseTimer;

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
    if (auctionType && auctionType !== "fixedtime") {
      return true;
    }
    const validState =
      category && auctionType && quality && expireDate && fixedTimeMinimumPrice;
    return validState;
  }
  // ***************************************

  // Descending auction inputs state
  // ***************************************
  const [decrementAmount, setDecrementAmount] = useState("");
  const [descendingMinimumPrice, setDescendingMinimumPrice] = useState("");
  const [isBaseDecrementTimerValid, setIsBaseDecrementTimerValid] =
    useState(true);

  function handleDecrementAmount(decrementAmount) {
    setDecrementAmount(decrementAmount);
  }

  function handleDescendingMinimumPrice(descendingMinimumPrice) {
    setDescendingMinimumPrice(descendingMinimumPrice);
  }

  function handleIsBaseDecrementTimerValid(descendingMinimumPrice) {
    setDescendingMinimumPrice(descendingMinimumPrice);
  }

  function validateDescendingAuctionInputs() {
    if (auctionType && auctionType !== "descending") {
      return true;
    }

    const isTimerValid = baseTimer && baseTimer.length !== 0 ? true : false;

    if (!isTimerValid) {
      setIsBaseDecrementTimerValid(false);
      toast.warning("Please set the decrement timer.");
    } else {
      setIsBaseDecrementTimerValid(true);
    }

    if (parseInt(decrementAmount) > parseInt(startPrice)) {
      toast.warning("Decrement amount can't be higher than Start price!");
      return false;
    }

    if (parseInt(descendingMinimumPrice) > parseInt(startPrice)) {
      toast.warning("End price can't be higher than Start price!");
      return false;
    }

    const validState =
      category &&
      auctionType &&
      quality &&
      startPrice &&
      decrementAmount &&
      isTimerValid &&
      descendingMinimumPrice;

    return validState;
  }
  // ***************************************

  const createAuctionButtonRef = useRef(null);
  const hiddenFileInput = useRef(null);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleHiddenFileInput = () => {
    hiddenFileInput.current.click();
  };

  const compressImage = async (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        success(compressedBlob) {
          const compressedFile = new File([compressedBlob], file.name, {
            type: file.type,
          });
          resolve(compressedFile);
        },
        error(error) {
          reject(error);
        },
      });
    });
  };

  const handleImageUpload = async (auctionId) => {
    const compressedFile = await compressImage(file);

    const formData = new FormData();
    formData.append("file", compressedFile);

    if (compressedFile && compressedFile.size < 3000000) {
      try {
        const response = await fetch(
          config.apiUrl + "/auctions/upload-img?auctionId=" + auctionId,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const imageUrl = await response.text();
          return imageUrl;
        } else {
          toast.error("Error uploading image");
          return null;
        }
      } catch (error) {
        toast.error("Error uploading image", error);
        return null;
      }
    }
  };

  async function onSubmit(event) {
    event.preventDefault();

    const inputs = event.currentTarget;
    const title = inputs.title.value;
    const description = inputs.description.value;

    // Check for special characters in title
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (specialChars.test(title)) {
      toast.warning("Special characters are not allowed in the title.");
      return;
    }

    const hasNumbers = /\d/;  // Regular expression to check for digits
    if (hasNumbers.test(title)) {
      toast.warning("Numbers are not allowed in the title.");
      return;
    }

    // Check description length
    if (description.length > 250) {
      toast.warning("Description cannot exceed 250 characters.");
      return;
    }

    // Validate other inputs
    const areFixedTimeInputsValid = validateFixedTimeAuctionInputs();
    const areEnglishInputsValid = validateEnglishAuctionInputs();
    const areDescendingInputsValid = validateDescendingAuctionInputs();

    if (!file) {
      toast.warning("Please select an image.");
      return;
    }

    if (file && file.size > 3000000) {
      toast.warning("Image size must be less than 3MB!");
      return;
    }

    if (
      !areEnglishInputsValid ||
      !areDescendingInputsValid ||
      !areFixedTimeInputsValid
    ) {
      toast.error("Please fill all the fields correctly before submitting!");
      return;
    }

    // Proceed with auction creation
    const currentOffer =
      auctionType === "english" || auctionType === "descending"
        ? startPrice
        : 0;

    const newAuctionIdFromDate = Date.now();

    const imageUrl = file
      ? await handleImageUpload(newAuctionIdFromDate)
      : "no-images";

    if (!imageUrl) {
      toast.error("Please upload a different image.");
      return;
    }

    const auctionFromInputs = {
      id: newAuctionIdFromDate,
      auctionDescription: description,
      auctionName: title,
      auctionQuality: quality,
      currentOffer: currentOffer,
      auctionType: auctionType,
      auctionCategory: category,
      idUserAccount: currentUser.id,
      auctionImages: imageUrl,
      offers: [],
      startPrice: startPrice,
      riseThreshold: riseThreshold,
      baseTimer: baseTimer
        ? moment(baseTimer, "HH:mm:ss").format("HH:mm:ss")
        : null,
      expireDate: expireDate,
      minimumAcceptablePrice: fixedTimeMinimumPrice,
      endPrice: descendingMinimumPrice,
      decrementAmount: decrementAmount,
      expireTime: expireTime
        ? moment(expireTime, "HH:mm:ss").format("HH:mm:ss")
        : null,
    };

    try {
      const creationResponse = await fetch(config.apiUrl + "/auctions", {
        method: "POST",
        body: JSON.stringify(auctionFromInputs),
        headers: { "Content-Type": "application/json" },
      });

      if (!creationResponse.ok) {
        toast.error("An error occurred during auction creation.", {
          position: "bottom-center",
        });

        return;
      }

      toast.success("The auction has been created.", {
        position: "bottom-center",
      });

      createAuctionButtonRef.current.style.opacity = "0.5";
      createAuctionButtonRef.current.disabled = true;

      setTimeout(() => {
        window.location.href = config.apiUrl.replace("/api", "") + "/home";
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
        <div className="flex flex-col md:flex-row items-center mt-12 justify-center">
          <div className="mr-12">
            <AddAuctionImageBox
              onFileChange={handleFileChange}
              onHiddenFileInputChange={handleHiddenFileInput}
              hiddenFileInput={hiddenFileInput}
              disabled={false}
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
              <div className="flex">
                <ComboboxAuctionType
                  onAuctionTypeChange={setAuctionTypeFromCombobox}
                ></ComboboxAuctionType>
                <AuctionTypeInfoDialog />
              </div>
              <ComboboxCategories
                onCategoryChange={setAuctionCategoryFromCombobox}
              ></ComboboxCategories>
              <ComboboxQuality
                onAuctionQualityChange={setAuctionQualityFromCombobox}
              ></ComboboxQuality>
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
                onDecrementTimerChange={handleBaseTimer}
                onDescendingMinimumPriceChange={handleDescendingMinimumPrice}
                onAuctionTimerValidChange={handleIsBaseDecrementTimerValid}
                isAuctionTimerValid={isBaseDecrementTimerValid}
              />
            )}
            {auctionType === "english" && (
              <EnglishInsertAuctionInputs
                onBaseStartAuctionChange={handleStartPrice}
                onRiseThresholdChange={handleRiseThreshold}
                onBaseOfferTimerChange={handleBaseTimer}
                isAuctionTimerValid={isOfferTimerValid}
              />
            )}
          </div>
        </div>

        <div className="flex justify-center items-center my-12">
          <Button ref={createAuctionButtonRef} className="p-7 text-lg">
            Create Auction
          </Button>
        </div>
      </form>
    </>
  );
}
