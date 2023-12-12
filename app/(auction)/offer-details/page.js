import facebookIcon from "../../../images/facebook-logo.svg";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function OfferDetailsPage() {
  return (
    <>
      {/* <Image
        src={facebookIcon}
        alt="My SVG"
        width={23}
        height={23}
        className="absolute"
      />  */}
      <div className="absolute ml-[10em] mt-14">
        <div className="flex flex-col">
          <Label className="flex text-2xl">NOME NEGRACCIO</Label>
          {/* chiaretta bellissimissima qui va l'immagine, da qua...*/}
          <div className="bg-blue-500">
            <button className="mt-[27em] ml-80 ">ciao</button>
          </div>
          {/* ...fino a qua */}
        </div>
      </div>
      <div className="flex flex-col max-w-2xl mt-10 ml-auto mr-20">
        <div className="flex flex-col bg-stone-200 rounded-xl mb-60 ml-20 mr-20 shadow-[0px_4px_16px_rgba(17,17,26,0.2),_0px_8px_24px_rgba(17,17,26,0.2),_0px_16px_56px_rgba(17,17,26,0.2)]">
          <div className="absolute ml-[10.5em] mt-[30em]">
            <Button className="p-7 text-lg">Create Auction</Button>
          </div>
          <div className="absolute ml-5 mt-[8em]">
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
          <div className="absolute ml-[19em] mt-[8em]">
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
          <div className="absolute ml-5 mt-[13em]">
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
          <div className="absolute ml-[19em] mt-[13em]">
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
            {/* chiaretta bellissimissima qui va l'avatar, da qua... */}
            <button className="bg-blue-500 font-bold text-5xl rounded-full mt-10 mb-[10em]">
              69
            </button>
            {/* ...fimo a qua */}
            <div className="absolute mt-[18em]">
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
