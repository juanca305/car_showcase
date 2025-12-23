"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    setMinPrice(searchParams.get("priceMin") || "");
    setMaxPrice(searchParams.get("priceMax") || "");
  }, [searchParams]);

  const applyPriceFilter = () => {
    const params = new URLSearchParams(window.location.search);

    minPrice ? params.set("priceMin", minPrice) : params.delete("priceMin");
    maxPrice ? params.set("priceMax", maxPrice) : params.delete("priceMax");

    params.delete("page");

    router.push(`/?${params.toString()}`, { scroll: false });
  };


  return (
    // 🔹 NEW: price wrapper (pill container)
    // <div className="price-filter-wrapper">
    <div className="
      price-filter-wrapper
      sm:rounded-xl
      sm:border
      sm:border-luxury-border
      sm:bg-luxury-surface/40
      sm:px-3
      sm:py-2
    ">

      {/* Label */}
      <span className="price-label whitespace-nowrap">
        Price
      </span>

      {/* Controls */}
      <div className="price-controls">
        <div className="price-input relative">
          {/* <input
            type="text"
            placeholder="Min"
            className="filter-input"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          /> */}
          <span className="price-currency">$</span>
          <input
            type="number"
            placeholder="Min"
            className="filter-input pl-12"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyPriceFilter();
            }}
          />

        </div>

        <div className="price-input relative">
          {/* <input
            type="text"
            placeholder="Max"
            className="filter-input"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          /> */}
          <span className="price-currency">$</span>
          <input
            type="number"
            placeholder="Max"
            className="filter-input pl-14"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyPriceFilter();
            }}
          />
        </div>

        <button
          onClick={applyPriceFilter}
          className="filter-apply-btn whitespace-nowrap"
        >
          Apply
        </button>
      </div>

    </div>
  );
}







