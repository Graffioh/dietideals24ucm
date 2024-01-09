
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function EnglishAuctionInputs() {
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
                Offer timer<span className="text-red-500">*</span>
              </Label>
            </div>
            <Input
              type="time"
              placeholder="Offer timer"
              className="bg-white"
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
            ></Input>
          </div>
        </>
      );
}
