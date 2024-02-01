"use client";

import { Input } from "@/components/ui/input";
import { useFilter } from "@/app/filterProvider";

export default function Searchbar() {
  const { setSearchInput } = useFilter();
  const handleInputChange = (event) => {
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
