"use client";

import { createContext, useState, useContext } from "react";

const AuctionFilterContext = createContext();

export const AuctionFilterProvider = ({ children }) => {
  // const [searchInput, setSearchInput] = useState("");
  // const [categoryInput, setCategoryInput] = useState("");
  const [filteredAuctions, setFilteredAuctions] = useState("");

  return (
    <AuctionFilterContext.Provider
      value={{
        // setSearchInput,
        // setCategoryInput,
        filteredAuctions,
        setFilteredAuctions,
      }}
    >
      {children}
    </AuctionFilterContext.Provider>
  );
};

export const useAuctionFilter = () => {
  const context = useContext(AuctionFilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};