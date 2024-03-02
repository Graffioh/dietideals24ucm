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
    value: "",
    label: "All categories",
  },
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
  {
    value: "beautyAndHealth",
    label: "Beauty and Health",
  },
  {
    value: "booksAndMagazines",
    label: "Books and Magazines",
  },
  {
    value: "boatingAndBoats",
    label: "Boating and Boats",
  },
  {
    value: "carsMotorcyclesAndOtherVehicles",
    label: "Cars, Motorcycles, and Other Vehicles",
  },
  {
    value: "clothingAndAccessories",
    label: "Clothing and Accessories",
  },
  {
    value: "collectibles",
    label: "Collectibles",
  },
  {
    value: "coinsAndBanknotes",
    label: "Coins and Banknotes",
  },
  {
    value: "comics",
    label: "Comics",
  },
  {
    value: "computers",
    label: "Computers",
  },
  {
    value: "homeFurnitureAndDIY",
    label: "Home Furniture and DIY",
  },
  {
    value: "infancy",
    label: "Infancy",
  },
  {
    value: "lighting",
    label: "Lighting",
  },
  {
    value: "moviesAndDVDs",
    label: "Movies and DVDs",
  },
  {
    value: "musicCDsAndVinyl",
    label: "Music CDs and Vinyl",
  },
  {
    value: "photographyAndVideo",
    label: "Photography and Video",
  },
  {
    value: "sportsAndLeisure",
    label: "Sports and Leisure",
  },
  {
    value: "ticketsAndEvents",
    label: "Tickets and Events",
  },
  {
    value: "toys",
    label: "Toys",
  },
  {
    value: "travelAccessories",
    label: "Travel Accessories",
  },
  {
    value: "videoGamesAndConsoles",
    label: "Video Games and Consoles",
  },
  {
    value: "watchesAndJewelry",
    label: "Watches and Jewelry",
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
      onCategoryChange("All categories");
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
