"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useAuctionFilter } from "../../app/providers/auctionFilterProvider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/shadcn-ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/shadcn-ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover"
import config from "@/config"

const categories = [
  {
    value: "",
    label: "All categories"
  },
  {
    value: "appliances",
    label: "Appliances"
  },
  {
    value: "beauty",
    label: "Beauty"
  },
  {
    value: "books",
    label: "Books"
  },
  {
    value: "boats",
    label: "Boats"
  },
  {
    value: "cars",
    label: "Cars"
  },
  {
    value: "motorcycles",
    label: "Motorcycles"
  },
  {
    value: "bikes",
    label: "Bikes"
  },
  {
    value: "vehicles",
    label: "Vehicles"
  },
  {
    value: "clothing",
    label: "Clothing"
  },
  {
    value: "accessories",
    label: "Accessories"
  },
  {
    value: "collectibles",
    label: "Collectibles"
  },
  {
    value: "coins",
    label: "Coins"
  },
  {
    value: "comics",
    label: "Comics"
  },
  {
    value: "computers",
    label: "Computers"
  },
  {
    value: "electronics",
    label: "Electronics"
  },
  {
    value: "gardening",
    label: "Gardening"
  },
  {
    value: "home",
    label: "Home"
  },
  {
    value: "infancy",
    label: "Infancy"
  },
  {
    value: "lighting",
    label: "Lighting"
  },
  {
    value: "movies",
    label: "Movies"
  },
  {
    value: "dvds",
    label: "DVDs"
  },
  {
    value: "music",
    label: "Music"
  },
  {
    value: "cds",
    label: "CDs"
  },
  {
    value: "vynils",
    label: "Vynils"
  },
  {
    value: "photography",
    label: "Photography"
  },
  {
    value: "video",
    label: "Video"
  },
  {
    value: "sport",
    label: "Sport"
  },
  {
    value: "stamps",
    label: "Stamps"
  },
  {
    value: "tickets",
    label: "Tickets"
  },
  {
    value: "toys",
    label: "Toys"
  },
  {
    value: "travel",
    label: "Travel"
  },
  {
    value: "videogame",
    label: "Videogame"
  },
  {
    value: "watches",
    label: "Watches"
  },
  {
    value: "jewelry",
    label: "Jewelry"
  }
];

export default function ComboboxCategories({ onCategoryChange }) { 
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const { setFilteredAuctions } = useAuctionFilter();

  async function handleInputChange(categoryInput) {
    if (categoryInput === "") {
      const auctionsResponse = await fetch(
        config.apiUrl + "/auctions"
      );

      const auctionsData = await auctionsResponse.json();
      setFilteredAuctions(auctionsData);
      onCategoryChange("All categories");
    } else {
      const filteredAuctionsResponse = await fetch(
        config.apiUrl + "/auctions/category",
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
