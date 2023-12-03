"use client"; // Only to test category filter

import { useState } from "react";  // Only to test category filter
import Link from "next/link";

import ComboboxCategories from "../components/comboboxCategories";

export default function Home() {
  // Only to test category filter
  const auctions = [
    { id: 1, name: "Auction1", category: "girl" },
    { id: 2, name: "Auction2", category: "girl" },
    { id: 3, name: "Auction3", category: "boy" },
    { id: 420, name: "Auction420", category: "boy" },
    { id: 666, name: "Auction666", category: "they/them" },
  ];

  const [category, setCategory] = useState("");  // Only to test category filter

  const setCategoryFromCombobox = (category) => {  // Only to test category filter
    setCategory(category);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Link href="/login" className="italic">
          Go to login →
        </Link>

        <Link href="/get-started" className="italic">
          Go to get started →
        </Link>

        <Link href="/insert-auction" className="italic">
          Go to insert auction (general)→
        </Link>

        <Link href="/private-profile" className="italic">
          Go to private profile →
        </Link>

        <Link href="/create-account" className="italic">
          Go to create account →
        </Link>
      </div>

      <div className="flex justify-center font-extrabold text-2xl">
        HOME content
      </div>
      
      <ComboboxCategories setCategoryFromCombobox={setCategoryFromCombobox} />

      <div>
        {auctions.map((auction) =>
          auction.category === category ? (
            <div key={auction.id}>{auction.name}</div>
          ) : null
        )}
      </div>
    </>
  );
}
