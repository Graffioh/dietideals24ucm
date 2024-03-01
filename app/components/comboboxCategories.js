"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useAuctionFilter } from "../providers/auctionFilterProvider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const categories = [
  {
    value: "electronics",
    label: "Electronics",
  },
  {
    value: "appliances",
    label: "Appliances",
  },
  {
    value: "garden",
    label: "Garden",
  },
  {
    value: "stamps",
    label: "Stamps",
  },
]

export default function ComboboxCategories({ onCategoryChange }) { 
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const { setFilteredAuctions } = useAuctionFilter();

  async function handleInputChange(categoryInput) {
    if (categoryInput === "") {
      const auctionsResponse = await fetch(
        process.env.NEXT_PUBLIC_BASEURL + "/auctions"
      );

      const auctionsData = await auctionsResponse.json();
      setFilteredAuctions(auctionsData);
    } else {
      const filteredAuctionsResponse = await fetch(
        process.env.NEXT_PUBLIC_BASEURL + "/auctions/category",
        { method: "POST", body: categoryInput, credentials: "include" }
      );

      const filteredAuctionsData = await filteredAuctionsResponse.json();
      setFilteredAuctions(filteredAuctionsData);
    }
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen} className="bg-white">
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-white"
        >
          {value
            ? categories.find((category) => category.value === value)?.label
            : "Select category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 bg-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white">
        <Command>
          <CommandInput placeholder="Select category" />
          <CommandEmpty>No category found</CommandEmpty>
          <CommandGroup>
            {categories.map((category) => (
              <CommandItem
                key={category.value}
                value={category.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  const categoryWithCapitalLetter = currentValue.charAt(0).toUpperCase() + currentValue.slice(1);
                  onCategoryChange(categoryWithCapitalLetter);
                  handleInputChange(categoryWithCapitalLetter);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === category.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {category.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
