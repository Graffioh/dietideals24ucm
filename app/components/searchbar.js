"use client";

import { Input } from "@/components/ui/input";
import { useAuctionFilter } from "@/app/providers/auctionFilterProvider";
import config from "@/config";

export default function Searchbar() {
  const { setFilteredAuctions } = useAuctionFilter();

  const handleInputChange = async (event) => {
    const searchInput = event.target.value;

    if (searchInput === "") {
      const auctionsResponse = await fetch(
        config.apiUrl + "/auctions"
      );
      const auctionsData = await auctionsResponse.json();
      setFilteredAuctions(auctionsData);
      // setSearchInput(event.target.value);
    } else {
      const filteredAuctionsResponse = await fetch(
        config.apiUrl + "/auctions/name",
        { method: "POST", body: event.target.value, credentials: "include" }
      );
      const filteredAuctionsData = await filteredAuctionsResponse.json();
      setFilteredAuctions(filteredAuctionsData);
      // setSearchInput(event.target.value);
    }
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
