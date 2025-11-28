// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function PriceFilter() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [min, setMin] = useState("");
//   const [max, setMax] = useState("");

//   // Sync with URL when it changes
//   useEffect(() => {
//     setMin(searchParams.get("priceMin") || "");
//     setMax(searchParams.get("priceMax") || "");
//   }, [searchParams]);

//   const applyPriceFilter = () => {
//     const params = new URLSearchParams(window.location.search);

//     if (min) params.set("priceMin", min);
//     else params.delete("priceMin");

//     if (max) params.set("priceMax", max);
//     else params.delete("priceMax");

//     router.push(`/?${params.toString()}`);
//   };

//   return (
//     <div className="flex gap-2 items-center">
//       <input
//         type="number"
//         placeholder="Min Price"
//         className="searchbar__input"
//         value={min}
//         onChange={(e) => setMin(e.target.value)}
//       />

//       <input
//         type="number"
//         placeholder="Max Price"
//         className="searchbar__input"
//         value={max}
//         onChange={(e) => setMax(e.target.value)}
//       />

//       <button onClick={applyPriceFilter} className="btn-blue">
//         Apply
//       </button>
//     </div>
//   );
// }

/**************************** */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- Controlled state ---
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // --- Sync with URL when it changes ---
  useEffect(() => {
    setMinPrice(searchParams.get("priceMin") || "");
    setMaxPrice(searchParams.get("priceMax") || "");
  }, [searchParams]);

  // --- Apply filter button ---
  const applyPriceFilter = () => {
    const params = new URLSearchParams(window.location.search);

    if (minPrice) params.set("priceMin", minPrice);
    else params.delete("priceMin");

    if (maxPrice) params.set("priceMax", maxPrice);
    else params.delete("priceMax");

    //router.push(`/?${params.toString()}`);

    router.push(`/?${params.toString()}`, { scroll: false });

  };

  return (
    <div className="flex gap-2 items-center">
      {/* Min Price */}
      <div className="custom-filter__btn w-[100px]">
        <input
          type="number"
          placeholder="Min"
          className="w-full bg-transparent outline-none text-black placeholder-gray-500"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>

      {/* Max Price */}
      <div className="custom-filter__btn w-[100px]">
        <input
          type="number"
          placeholder="Max"
          className="w-full bg-transparent outline-none text-black placeholder-gray-500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Apply Button */}
      <button
        onClick={applyPriceFilter}
        className="btn-blue h-[42px] px-4 py-2 text-sm rounded-lg"
      >
        Apply
      </button>
    </div>
  );
}



