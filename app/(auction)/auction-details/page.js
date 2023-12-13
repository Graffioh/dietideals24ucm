import facebookIcon from "../../../images/facebook-logo.svg";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function AuctionDetailsPage() {
  return (
    <>
      <div className="absolute ml-[10em] mt-14">
        <div className="flex flex-col">
          <Label className="flex text-2xl">NAME</Label>
          <div className="">
            <img
                className="object-cover w-96 h-128 mt-5 rounded-lg flex items-center"
                src="https://m.media-amazon.com/images/I/A1P5H1w-mnL._UF1000,1000_QL80_.jpg"
              />
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-2xl mt-10 ml-auto mr-20">
        <div className="flex flex-col bg-stone-200 rounded-xl mb-60 ml-20 mr-20 shadow-[0px_4px_16px_rgba(17,17,26,0.2),_0px_8px_24px_rgba(17,17,26,0.2),_0px_16px_56px_rgba(17,17,26,0.2)]">
          <div className="absolute ml-[10.5em] mt-[32em]">
            <Button className="p-7 text-lg">Create Auction</Button>
          </div>
          <div className="absolute ml-5 mt-[10em]">
            <Label className="flex mb-2">
              Current offer<div className="text-red-500"></div>
            </Label>
            <Input
              className="max-w-[20em] h-9 bg-white"
              type="text"
              id="current-offer"
              placeholder="Placeholder"
            />
          </div>
          <div className="absolute ml-[19em] mt-[10em]">
            <Label className="flex mb-2">
              Expire time<div className="text-red-500"></div>
            </Label>
            <Input
              className="max-w-[20em] h-9 bg-white"
              type="text"
              id="expire-time"
              placeholder="Placeholder"
            />
          </div>
          <div className="absolute ml-5 mt-[15em]">
            <Label className="flex mb-2">
              Decrement amount<div className="text-red-500"></div>
            </Label>
            <Input
              className="max-w-[20em] h-9 bg-white"
              type="text"
              id="Decrement-amount"
              placeholder="Placeholder"
            />
          </div>
          <div className="absolute ml-[19em] mt-[15em]">
            <Label className="flex mb-2">
              Decrement timer<div className="text-red-500"></div>
            </Label>
            <Input
              className="max-w-[20em] h-9 bg-white"
              type="text"
              id="decrement-timer"
              placeholder="Placeholder"
            />
          </div>
          <div className="flex justify-center">
            <div className="font-bold text-5xl rounded-full mt-5 mb-[10em]">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@avatar"
                />
                <AvatarFallback>gojo</AvatarFallback>
              </Avatar>
            </div>
            <div className="absolute mt-[20em]">
              <Label className="flex mb-2">Description</Label>
              <Textarea
                className="w-screen max-w-[30em] bg-white h-32"
                placeholder="Type your description here."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
