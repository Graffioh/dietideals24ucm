import React from "react";
import { Label } from "@/components/shadcn-ui/label";
import { Input } from "@/components/shadcn-ui/input";
import { Button } from "@/components/shadcn-ui/button";
import { TimePicker } from "@/components/timepicker/time-picker";

export default function EnglishInsertAuctionInputs({
  onBaseStartAuctionChange,
  onRaiseThresholdChange,
  onBaseOfferTimerChange,
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
        <Input
          type="number"
          step="0.01"
          placeholder="Start price"
          className="bg-white"
          onChange={(e) => {
            onBaseStartAuctionChange(e.target.value);
          }}
        ></Input>
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Offer timer<span className="text-red-500">*</span>
          </Label>
        </div>
        <div className="flex">
          <TimePicker date={dateForTimer} setDate={setDateForTimer} />
          <Button
            className="mt-5 ml-4"
            onClick={(e) => {
              e.preventDefault();
              onBaseOfferTimerChange(convertDateIntoTime(dateForTimer));
            }}
          >
            Set
          </Button>
        </div>
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Rise threshold price<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input
          type="number"
          step="0.01"
          placeholder="Rise threshold price"
          className="bg-white"
          onChange={(e) => {
            onRaiseThresholdChange(e.target.value);
          }}
        ></Input>
      </div>
    </>
  );
}
