"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import ComboboxCategories from "../../components/comboboxCategories"
import ComboboxAuctions from "../../components/comboboxAuctions.js"
import ComboboxQuality from "../../components/comboboxQualities.js"

export default function InsertAuctionPage() {
  return (
    <>
      <div className="flex justify-center mt-12">
        <div className="m-6 grid grid-cols-2 gap-2 w-96 max-w-screen h-96 max-h-screen">
          <button className="mt-2 bg-indigo-950 text-white rounded p-3">
            +
          </button>
          <button className="mt-2 bg-indigo-950 text-white rounded p-3">
            +
          </button>
          <button className="mt-2 bg-indigo-950 text-white rounded p-3">
            + 
          </button>
        </div>

        <div className="mt-8 flex flex-col space-y-6">
          <div>
            <Label>Title*</Label>
            <Input type="text" placeholder="Title" className=""></Input>
          </div>

          <div>
            <Label>Description*</Label>
            <Input type="text" placeholder="Description" className=""></Input>
          </div>

          <ComboboxCategories></ComboboxCategories>
          <ComboboxAuctions></ComboboxAuctions>
          <ComboboxQuality></ComboboxQuality>

          <Button className="">Create Auction</Button>
        </div>
      </div>
    </>
  );
}
