"use client";

import { createContext, useState, useContext } from "react";

const AuctionFilterContext = createContext();

export const AuctionFilterProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  return (
    <AuctionFilterContext.Provider
      value={{ searchInput, setSearchInput, categoryInput, setCategoryInput }}
    >
      {children}
    </AuctionFilterContext.Provider>
  );
};

export const useAuctionFilter = () => {
  const context = useContext(AuctionFilterContext);
  if (context === undefined) {
    throw new Error("useAuctionFilter must be used within a FilterProvider");
  }
  return context;
};
