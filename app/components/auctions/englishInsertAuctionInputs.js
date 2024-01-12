import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function EnglishInsertAuctionInputs({
  onBaseStartAuctionChange,
  onRaiseThresholdChange,
  onOfferTimerChange,
}) {
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
          onChange={(e) => {onBaseStartAuctionChange(e.target.value)}}
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
          onChange={(e) => {onOfferTimerChange(e.target.value)}}
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
          onChange={(e) => {onRaiseThresholdChange(e.target.value)}}
        ></Input>
      </div>
    </>
  );
}
