import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function DescendingAuctionInputs() {
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
