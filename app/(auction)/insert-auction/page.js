"use client";

import { useState } from "react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";

import ComboboxCategories from "../../components/comboboxCategories";
import ComboboxAuctions from "../../components/comboboxAuctions.js";
import ComboboxQuality from "../../components/comboboxQualities.js";

import DatePicker from "../../components/datePicker.js";

function FixedTimeAuctionComponents() {
  const [date, setDate] = useState("");

  return (
    <>
      {/* // DA TRASFORMARE IN DATE PICKER */}
      {/* <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      /> */}

      <div className="flex flex-col">
        <Label className="mb-2">
          Expire date<span className="text-red-500">*</span>
        </Label>
        <DatePicker />
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Time<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input type="time" placeholder="Time" className="bg-white"></Input>
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Minimum threshold price<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input
          type="number"
          placeholder="Minimum threshold price"
          className="bg-white"
        ></Input>
      </div>
    </>
  );
}

function EnglishAuctionComponents() {
  return (
    <>
      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Start price<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input
          type="number"
          placeholder="Start price"
          className="bg-white"
        ></Input>
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Offer timer<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input
          type="time"
          placeholder="Offer timer"
          className="bg-white"
        ></Input>
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Rise threshold price<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input
          type="number"
          placeholder="Rise threshold price"
          className="bg-white"
        ></Input>
      </div>
    </>
  );
}

function DescendingAuctionComponents() {
  return (
    <>
      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Start price<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input
          type="number"
          placeholder="Start price"
          className="bg-white"
        ></Input>
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Expire time<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input
          type="time"
          placeholder="Expire time"
          className="bg-white"
        ></Input>
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Decrement amount<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input
          type="number"
          placeholder="Decrement amount"
          className="bg-white"
        ></Input>
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Decrement Timer<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input
          type="number"
          placeholder="Decrement timer"
          className="bg-white"
        ></Input>
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Secret minimum price<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input
          type="number"
          placeholder="Secret minimum price"
          className="bg-white"
        ></Input>
      </div>
    </>
  );
}

export default function InsertAuctionPage() {
  const [auction, setAuction] = useState("");

  const setAuctionFromCombobox = (auctionType) => {
    setAuction(auctionType);
  };

  const hiddenFileInput = useRef(null);

  const handleFileUploadClick = (e) => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center mt-12">
        <div className="mx-3 mb-6 md:m-6 md:mr-20 md:ml-48 grid md:grid-cols-2 gap-2">
          <div>
            <button
              onClick={handleFileUploadClick}
              className="w-52 h-52 mt-2 text-2xl bg-blue-950 text-white rounded p-3"
            >
              +
            </button>
            <input
              type="file"
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
          </div>
          <div>
            <button
              onClick={handleFileUploadClick}
              className="w-52 h-52 mt-2 text-2xl bg-blue-950 text-white rounded p-3"
            >
              +
            </button>
            <input
              type="file"
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
          </div>
          <div>
            <button
              onClick={handleFileUploadClick}
              className="w-52 h-52 mt-2 text-2xl bg-blue-950 text-white rounded p-3"
            >
              +
            </button>
            <input
              type="file"
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
          </div>
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
                type="text"
                placeholder="Title"
                className="bg-white"
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
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col space-y-6">
            <ComboboxCategories></ComboboxCategories>
            <ComboboxAuctions
              setAuctionFromCombobox={setAuctionFromCombobox}
            ></ComboboxAuctions>
            <ComboboxQuality></ComboboxQuality>
          </div>
        </div>

        <div className="flex flex-col space-y-6 md:ml-4 mt-4 mb-4">
          {auction === "fixed" && <FixedTimeAuctionComponents />}
          {auction === "descending" && <DescendingAuctionComponents />}
          {auction === "english" && <EnglishAuctionComponents />}
        </div>
      </div>

      <div className="flex justify-center items-center mb-4">
        <Button className="p-7 text-lg">Create Auction</Button>
      </div>
    </>
  );
}
