"use client";

import { Input } from "@/components/ui/input";
import { useAuctionFilter } from "@/app/providers/auctionFilterProvider";

export default function Searchbar() {
  const { setSearchInput, setFilteredAuctions } = useAuctionFilter();

  const handleInputChange = async (event) => {
    const searchInput = event.target.value;
    const filteredAuctionsResponse = await fetch(
      searchInput === ""
        ? "http://localhost:8080/auctions"
        : "http://localhost:8080/auction-from-name?name=" + event.target.value
    );
    const filteredAuctionsData = await filteredAuctionsResponse.json();

    setFilteredAuctions(filteredAuctionsData);
    setSearchInput(event.target.value);
  };

  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px] bg-white"
        onChange={handleInputChange}
      />
    </div>
  );
}
