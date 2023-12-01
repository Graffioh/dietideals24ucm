"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import ComboboxCategories from "../../components/comboboxCategories";
import ComboboxAuctions from "../../components/comboboxAuctions.js";
import ComboboxQuality from "../../components/comboboxQualities.js";

export default function InsertAuctionPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center mt-12">
        <div className="mx-3 mb-6 md:m-6 md:mr-20 md:ml-48 grid md:grid-cols-2 gap-2">
          <button className="w-52 h-52 mt-2 text-2xl bg-indigo-950 text-white rounded p-3">
            +
          </button>
          <button className="w-52 h-52 mt-2 text-2xl bg-indigo-950 text-white rounded p-3">
            +
          </button>
          <button className="w-52 h-52 mt-2 text-2xl bg-indigo-950 text-white rounded p-3">
            +
          </button>
        </div>

        <div className="flex flex-col mx-2">
          <div className="w-72 min-w-screen md:mt-8 flex flex-col space-y-6">
            <div>
              <div className="flex mb-2">
                <Label>
                  Title<span className="text-red-500">*</span>
                </Label>
              </div>
              <Input type="text" placeholder="Title" className=""></Input>
            </div>

            <div>
              <div className="mb-2">
                <Label>
                  Description<span className="text-red-500">*</span>
                </Label>
              </div>
              <Textarea placeholder="Type your description here." />
            </div>
          </div>

          <div className="mt-8 flex flex-col space-y-6">
            <ComboboxCategories></ComboboxCategories>
            <ComboboxAuctions></ComboboxAuctions>
            <ComboboxQuality></ComboboxQuality>

            <Button className="p-7 text-lg">Create Auction</Button>
          </div>
        </div>
      </div>
    </>
  );
}
