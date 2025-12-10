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

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
      {/* Min Price */}
      <div className="w-[100px]">
        <input
          type="text"
          placeholder="Min"
          className="filter-input"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>

      {/* Max Price */}
      <div className="w-[100px]">
        <input
          type="text"
          placeholder="Max"
          className="filter-input"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Apply Button */}
      <button
        onClick={applyPriceFilter}
        className="filter-apply-btn"
      >
        Apply
      </button>
    </div>
  );
}






