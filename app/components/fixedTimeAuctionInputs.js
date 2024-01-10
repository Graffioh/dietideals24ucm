import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import DatePicker from "./datePicker";

export default function FixedTimeAuctionInputs({
  onExpireDateChange,
  onExpireTimeChange,
  onFixedTimeMinimumPriceChange,
}) {
  const [date, setDate] = useState("");

  return (
    <>
      {/* Date from date picker + time = expire date */}
      <div className="flex flex-col">
        <Label className="mb-2">
          Expire date<span className="text-red-500">*</span>
        </Label>
        <DatePicker handleDate={onExpireDateChange} />
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Expire time<span className="text-red-500">*</span>
          </Label>
        </div>
        <Input
          type="time"
          placeholder="Time"
          className="bg-white"
          onChange={(e) => onExpireTimeChange(e.target.value)}
        ></Input>
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
          onChange={(e) => onFixedTimeMinimumPriceChange(e.target.value)}
        ></Input>
      </div>
    </>
  );
}
