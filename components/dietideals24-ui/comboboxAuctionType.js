"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn-ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/shadcn-ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover";

const auctions = [
  {
    value: "fixedtime",
    label: "Fixed time Auction",
  },
  {
    value: "english",
    label: "English Auction",
  },
  {
    value: "descending",
    label: "Descending Auction",
  },
];

export default function ComboboxAuctionType({ onAuctionTypeChange }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-white"
        >
          {value
            ? auctions.find((auction) => auction.value === value)?.label
            : "Select auction type"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 bg-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white">
        <Command>
          <CommandGroup>
            {auctions.map((auction) => (
              <CommandItem
                key={auction.value}
                value={auction.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  onAuctionTypeChange(currentValue);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === auction.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {auction.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
