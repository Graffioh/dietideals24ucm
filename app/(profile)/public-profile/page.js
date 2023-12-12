import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import CardAuction from "../../components/cardAuction";
import AuctionPagination from "../../components/auctionPagination";

export default function ProfilePage() {
  const matteo = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <div className="flex mt-16 ml-[15em] mr-[15em]">
        <div className="mt-2 mr-10">
          {/* <Button className="w-20 h-20">C</Button> */}
          <Avatar className="h-32 w-32">
            <AvatarImage src="https://github.com/shadcn.png" alt="@avatar" />
            <AvatarFallback>gojo</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-col w-full">
          <h1 className="font-bold text-5xl mb-4">USERNAME</h1>
          <Textarea className="" placeholder="BIO HERE" />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-stone-200 flex flex-col mt-10 mb-20 relative rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.15)]">
          <div className="flex flex-col absolute ml-8 mt-7">
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Option One</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Option Two</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="mr-10 ml-10 mb-10">
            <input
              className="flex ml-auto mt-4 border-2 border-gray-300 px-5 py-1.5 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Search..."
            ></input>
            <div className="grid grid-rows-2 md:grid-flow-col gap-5 px-7 pt-7">
              {matteo.map((number) => (
                <CardAuction key={number} isHomepage={false} />
              ))}
            </div>
          </div>
          <div className="mb-5 flex justify-center items-center">
            <AuctionPagination />
          </div>
        </div>
      </div>
    </>
  );
}
