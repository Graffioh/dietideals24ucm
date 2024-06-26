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

const qualities = [
  {
    value: "excellent",
    label: "Excellent",
  },
  {
    value: "good",
    label: "Good",
  },
  {
    value: "poor",
    label: "Poor",
  },
];

export default function ComboboxQuality({ onAuctionQualityChange }) {
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
            ? qualities.find((quality) => quality.value === value)?.label
            : "Select quality"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 bg-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white">
        <Command>
          <CommandInput placeholder="Select quality." />
          <CommandEmpty>No quality found</CommandEmpty>
          <CommandGroup>
            {qualities.map((quality) => (
              <CommandItem
                key={quality.value}
                value={quality.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  onAuctionQualityChange(currentValue.charAt(0).toUpperCase() + currentValue.slice(1));
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === quality.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {quality.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
