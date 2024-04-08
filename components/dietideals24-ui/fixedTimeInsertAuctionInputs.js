import { useState } from "react";

import { Label } from "@/components/shadcn-ui/label";
import { Input } from "@/components/shadcn-ui/input";

import DatePicker from "./datePicker";
import PriceInput from "./priceInput";

export default function FixedTimeInsertAuctionInputs({
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
        <DatePicker
          handleParentDate={onExpireDateChange}
          defaultDate={""}
          isBirthDate={false}
          isReadOnly={false}
        />
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
          onChange={(e) => {
            onExpireTimeChange(e.target.value);
          }}
        ></Input>
      </div>

      <div>
        <div className="w-72 min-w-screen flex mb-2">
          <Label>
            Reserve price<span className="text-red-500">*</span>
          </Label>
        </div>
        <PriceInput
          placeholderTxt={"Reserve price"}
          onFunctionChange={onFixedTimeMinimumPriceChange}
        />
      </div>
    </>
  );
}
