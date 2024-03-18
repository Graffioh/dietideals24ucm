import { Button } from "@/components/shadcn-ui/button";
import { Label } from "@/components/shadcn-ui/label";
import { Input } from "@/components/shadcn-ui/input";

export default function FixedTimeAuctionDetailsInputs({ currentAuction }) {
  return (
    <>
      <div className="absolute ml-5 mt-[10em]">
        <Label className="flex mb-2">
          Current offer<div className="text-red-500"></div>
        </Label>
        <Input
          className="max-w-[20em] h-9 bg-white"
          type="text"
          placeholder="Placeholder"
          defaultValue={currentAuction.currentOffer}
          readOnly
        />
      </div>
      <div className="absolute ml-[19em] mt-[10em]">
        <Label className="flex mb-2">
          Expire time<div className="text-red-500"></div>
        </Label>
        <Input
          className="max-w-[20em] h-9 bg-white"
          type="text"
          placeholder="Placeholder"
          defaultValue={currentAuction.isOver ? "Auction ended" : currentAuction.expireTime}
          readOnly
        />
      </div>
      <div className="absolute ml-[19em] mt-[15em]">
        <Label className="flex mb-2">
          Expire date<div className="text-red-500"></div>
        </Label>
        <Input
          className="max-w-[20em] h-9 bg-white"
          type="text"
          placeholder="Placeholder"
          defaultValue={currentAuction.expireDate}
          readOnly
        />
      </div>
    </>
  );
}
