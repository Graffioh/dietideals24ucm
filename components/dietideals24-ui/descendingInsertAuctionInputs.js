"use client";

import { Label } from "@/components/shadcn-ui/label";
import { Input } from "@/components/shadcn-ui/input";
import { Button } from "@/components/shadcn-ui/button";
import { toast } from "sonner";

import React, { useEffect, useState } from "react";
import { TimePicker } from "@/components/timepicker/time-picker";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import PriceInput from "./priceInput";

export default function DescendingInsertAuctionInputs({
  onStartPriceChange,
  onDecrementAmountChange,
  onDecrementTimerChange,
  onDescendingMinimumPriceChange,
  onAuctionTimerValidChange,
  isAuctionTimerValid,
}) {
  const zeroDate = new Date();
  zeroDate.setHours(0, 0, 0, 0);
  const [dateForTimer, setDateForTimer] = React.useState(zeroDate);

  function convertDateIntoTime() {
    const timer =
      dateForTimer.getHours() +
      ":" +
      dateForTimer.getMinutes() +
      ":" +
      dateForTimer.getSeconds();
    return timer;
  }

  return (
    <>
      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Start price<span className="text-red-500">*</span>
          </Label>
        </div>
        <PriceInput
          placeholderTxt={"Start price"}
          onFunctionChange={onStartPriceChange}
        />
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Decrement amount<span className="text-red-500">*</span>
          </Label>
        </div>
        <PriceInput
          placeholderTxt={"Decrement amount"}
          onFunctionChange={onDecrementAmountChange}
        />
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Decrement Timer<span className="text-red-500">*</span>
          </Label>
        </div>
        <div className="flex">
          <TimePicker date={dateForTimer} setDate={setDateForTimer} onTimerChange={onDecrementTimerChange} />
        </div>
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            End price<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input
          type="number"
          step="0.01"
          placeholder="End price"
          className="bg-white"
          onChange={(e) => {
            const price = e.target.value;
            onDescendingMinimumPriceChange(price);
          }}
        ></Input>
      </div>
    </>
  );
}
