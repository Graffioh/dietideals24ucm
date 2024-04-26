import React from "react";
import { Label } from "@/components/shadcn-ui/label";
import { Input } from "@/components/shadcn-ui/input";
import { Button } from "@/components/shadcn-ui/button";
import { TimePicker } from "@/components/timepicker/time-picker";
import PriceInput from "./priceInput";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function EnglishInsertAuctionInputs({
  onBaseStartAuctionChange,
  onRiseThresholdChange,
  onBaseOfferTimerChange,
  isAuctionTimerValid,
}) {
  const zeroDate = new Date();
  zeroDate.setHours(0, 0, 0, 0);
  const [dateForTimer, setDateForTimer] = React.useState(zeroDate);

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
          onFunctionChange={onBaseStartAuctionChange}
        />
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Offer timer<span className="text-red-500">*</span>
          </Label>
        </div>
        <div className="flex">
          <TimePicker date={dateForTimer} setDate={setDateForTimer} onTimerChange={onBaseOfferTimerChange}/>
        </div>
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Rise threshold price<span className="text-red-500">*</span>
          </Label>
        </div>
        <PriceInput
          placeholderTxt={"Rise threshold price"}
          onFunctionChange={onRiseThresholdChange}
        />
      </div>
    </>
  );
}
