"use client";

import { Input } from "@/components/ui/input";
import { useAuctionFilter } from "@/app/providers/auctionFilterProvider";

export default function Searchbar() {
  const { setSearchInput, setFilteredAuctions } = useAuctionFilter();

  const handleInputChange = async (event) => {
    const searchInput = event.target.value;

    if (searchInput === "") {
      const auctionsResponse = await fetch(
        process.env.NEXT_PUBLIC_BASEURL + "/auctions"
      );
      const auctionsData = await auctionsResponse.json();
      setFilteredAuctions(auctionsData);
      setSearchInput(event.target.value);
    } else {
      const filteredAuctionsResponse = await fetch(
        process.env.NEXT_PUBLIC_BASEURL + "/auctions/name",
        { method: "POST", body: event.target.value, credentials: "include" }
      );
      const filteredAuctionsData = await filteredAuctionsResponse.json();
      setFilteredAuctions(filteredAuctionsData);
      setSearchInput(event.target.value);
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
