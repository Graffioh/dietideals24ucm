"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DurationPicker from "../durationPicker";
import { TimePickerInput } from "@/components/timepicker/time-picker-input";
import { Button } from "@/components/ui/button";

import React from "react";
import { TimePicker } from "@/components/timepicker/time-picker";

export default function DescendingInsertAuctionInputs({
  onStartPriceChange,
  onDecrementAmountChange,
  onDecrementTimerChange,
  onDescendingMinimumPriceChange,
}) {
  
  const zeroDate = new Date();
  zeroDate.setHours(0,0,0,0)
  const [dateForTimer, setDateForTimer] = React.useState(zeroDate);
  
  function convertDateIntoTime() {
    const timer = dateForTimer.getHours() + ":" + dateForTimer.getMinutes() + ":" + dateForTimer.getSeconds();
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
        <Input
          type="number"
          placeholder="Start price"
          className="bg-white"
          onChange={(e) => {
            onStartPriceChange(e.target.value);
          }}
        ></Input>
      </div>

      {/* <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Expire time<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input
          type="time"
          placeholder="Expire time"
          className="bg-white"
          onChange={(e) => {onFixedTimeChange(e.target.value)}}
        ></Input>
      </div> */}

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
          onChange={(e) => {
            onDecrementAmountChange(e.target.value);
          }}
        ></Input>
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Decrement Timer<span className="text-red-500">*</span>
          </Label>
        </div>
        {/* <Input
          type="time"
          placeholder="Decrement timer"
          className="bg-white"
          onChange={(e) => {onDecrementTimerChange(e.target.value)}}
        ></Input> */}

        {/* <DurationPicker /> */}
        <div className="flex">
          <TimePicker date={dateForTimer} setDate={setDateForTimer} />
          <Button className="mt-5 ml-4" onClick={(e) => {e.preventDefault(); onDecrementTimerChange(convertDateIntoTime(dateForTimer));}}>Set</Button>
        </div>
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
          onChange={(e) => {
            onDescendingMinimumPriceChange(e.target.value);
          }}
        ></Input>
      </div>
    </>
  );
}
