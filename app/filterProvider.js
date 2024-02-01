"use client"

import { createContext, useState, useContext } from 'react';

const FilterContext = createContext();


export const FilterProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');

  return (
    <FilterContext.Provider value={{ searchInput, setSearchInput, categoryInput, setCategoryInput}}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
      throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
  };