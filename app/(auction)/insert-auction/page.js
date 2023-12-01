"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";

import ComboboxCategories from "../../components/comboboxCategories";
import ComboboxAuctions from "../../components/comboboxAuctions.js";
import ComboboxQuality from "../../components/comboboxQualities.js";

function FixedTimeAuctionComponents() {
  const [date, setDate] = useState("");

  return (
    <div className="flex flex-col space-y-6 ml-4">
      {/* // DA TRASFORMARE IN DATE PICKER */}
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />

      <div>
        <div className="flex mb-2">
          <Label>
            Time<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input type="text" placeholder="Time" className=""></Input>
      </div>

      <div>
        <div className="flex mb-2">
          <Label>
            Minimum threshold price<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input type="text" placeholder="Minimum threshold price" className=""></Input>
      </div>
    </div>
  );
}

function DescendingAuctionComponents() {
  return (
    <div className="flex flex-col space-y-6 ml-4">
      <div>
        <div className="flex mb-2">
          <Label>
            Start price<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input type="text" placeholder="Start price" className=""></Input>
      </div>

      <div>
        <div className="flex mb-2">
          <Label>
            Expire time<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input type="text" placeholder="Expire time" className=""></Input>
      </div>

      <div>
        <div className="flex mb-2">
          <Label>
            Decrement amount<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input type="text" placeholder="Decrement amount" className=""></Input>
      </div>

      <div>
        <div className="flex mb-2">
          <Label>
            Decrement Timer<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input type="text" placeholder="Decrement timer" className=""></Input>
      </div>

      <div>
        <div className="flex mb-2">
          <Label>
            Secret minimum price<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input type="text" placeholder="Title" className=""></Input>
      </div>
    </div>
  );
}

function EnglishAuctionComponents() {
  return (
    <div className="flex flex-col space-y-6 ml-4">
      <div>
        <div className="flex mb-2">
          <Label>
            Start price<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input type="text" placeholder="Start price" className=""></Input>
      </div>

      <div>
        <div className="flex mb-2">
          <Label>
            Offer timer<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input type="text" placeholder="Offer timer" className=""></Input>
      </div>

      <div>
        <div className="flex mb-2">
          <Label>
            Rise threshold price<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input type="text" placeholder="Rise threshold price" className=""></Input>
      </div>
    </div>
  );
}

export default function InsertAuctionPage() {
  const [auction, setAuction] = useState("");

  const setAuctionFromCombobox = (auctionType) => {
    setAuction(auctionType);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center mt-12">
        <div className="mx-3 mb-6 md:m-6 md:mr-20 md:ml-48 grid md:grid-cols-2 gap-2">
          <button className="w-52 h-52 mt-2 text-2xl bg-indigo-950 text-white rounded p-3">
            +
          </button>
          <button className="w-52 h-52 mt-2 text-2xl bg-indigo-950 text-white rounded p-3">
            +
          </button>
          <button className="w-52 h-52 mt-2 text-2xl bg-indigo-950 text-white rounded p-3">
            +
          </button>
        </div>

        <div className="flex flex-col mx-2">
          <div className="w-72 min-w-screen md:mt-8 flex flex-col space-y-3">
            <div>
              <div className="flex mb-2">
                <Label>
                  Title<span className="text-red-500">*</span>
                </Label>
              </div>
              <Input type="text" placeholder="Title" className=""></Input>
            </div>

            <div>
              <div className="mb-2">
                <Label>
                  Description<span className="text-red-500">*</span>
                </Label>
              </div>
              <Textarea placeholder="Type your description here." />
            </div>
          </div>

          <div className="mt-8 flex flex-col space-y-6">
            <ComboboxCategories></ComboboxCategories>
            <ComboboxAuctions
              setAuctionFromCombobox={setAuctionFromCombobox}
            ></ComboboxAuctions>
            <ComboboxQuality></ComboboxQuality>

            <Button className="p-7 text-lg">Create Auction</Button>
          </div>
        </div>

        {auction === "fixed" && <FixedTimeAuctionComponents />}
        {auction === "descending" && <DescendingAuctionComponents />}
        {auction === "english" && <EnglishAuctionComponents />}
      </div>
    </>
  );
}
