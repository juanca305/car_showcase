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

  // return (
  //   // <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
  //   // <div className="filter-group">
  //   <div className="filter-group flex flex-wrap items-center gap-3">
  //     {/* Label */}
  //     <span className="price-label">
  //       Price
  //     </span>
  //     {/* Min Price */}
  //     <div className="w-[100px]">
  //       <input
  //         type="text"
  //         placeholder="Min"
  //         className="filter-input"
  //         value={minPrice}
  //         onChange={(e) => setMinPrice(e.target.value)}
  //       />
  //     </div>

  //     {/* Max Price */}
  //     <div className="w-[100px]">
  //       <input
  //         type="text"
  //         placeholder="Max"
  //         className="filter-input"
  //         value={maxPrice}
  //         onChange={(e) => setMaxPrice(e.target.value)}
  //       />
  //     </div>

  //     {/* Apply Button */}
  //     <button
  //       onClick={applyPriceFilter}
  //       className="filter-apply-btn"
  //     >
  //       Apply
  //     </button>
  //   </div>
  // );

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">

      {/* Label */}
      <span className="price-label whitespace-nowrap">
        Price
      </span>

      {/* Controls */}
      {/* <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap"> */}
      {/* <div className="flex items-center gap-2"> */}
      <div className="flex items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
        <div className="w-[84px] sm:w-[96px]">
          <input
            type="text"
            placeholder="Min"
            className="filter-input"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="w-[84px] sm:w-[96px]">
          <input
            type="text"
            placeholder="Max"
            className="filter-input"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <button
          onClick={applyPriceFilter}
          className="filter-apply-btn whitespace-nowrap ml-2"
        >
          Apply
        </button>
      </div>

    </div>
  );

}






