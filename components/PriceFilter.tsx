// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// const MIN_PRICE = 0;
// const MAX_PRICE = 100000;   // adjust later if needed
// const STEP = 1000;          // increments of 1K

// export default function PriceFilter() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [minPrice, setMinPrice] = useState<number>(MIN_PRICE);
//   const [maxPrice, setMaxPrice] = useState<number>(MAX_PRICE);

//   // Sync with URL when page loads or params change
//   useEffect(() => {
//     const minParam = searchParams.get("priceMin");
//     const maxParam = searchParams.get("priceMax");

//     setMinPrice(minParam ? Number(minParam) : MIN_PRICE);
//     setMaxPrice(maxParam ? Number(maxParam) : MAX_PRICE);
//   }, [searchParams]);

//   const handleMinChange = (value: number) => {
//     const safeValue = Math.min(value, maxPrice);
//     setMinPrice(safeValue);
//   };

//   const handleMaxChange = (value: number) => {
//     const safeValue = Math.max(value, minPrice);
//     setMaxPrice(safeValue);
//   };

//   const applyPriceFilter = () => {
//     const params = new URLSearchParams(window.location.search);

//     if (minPrice > MIN_PRICE) params.set("priceMin", String(minPrice));
//     else params.delete("priceMin");

//     if (maxPrice < MAX_PRICE) params.set("priceMax", String(maxPrice));
//     else params.delete("priceMax");

//     params.delete("page"); // pagination reset

//     router.push(`/?${params.toString()}`, { scroll: false });
//   };

//   // Format helper → "$20k"
//   const formatK = (v: number) => `$${Math.round(v / 1000)}k`;

//   return (
//     <div className="mileage-filter">
//       {/* same styling container so they match one another */}

//       <div className="flex items-center justify-between mb-1">
//         <span className="mileage-label">Price</span>
//         <span className="mileage-value text-xs text-luxury-muted">
//           {minPrice > MIN_PRICE || maxPrice < MAX_PRICE
//             ? `${formatK(minPrice)} – ${formatK(maxPrice)}`
//             : "Any"}
//         </span>
//       </div>

//       <div className="mileage-slider mt-2 mb-1 ">
//         <div className="slider-track">
//           <div
//             className="slider-track-fill"
//             style={{
//               left: `${(minPrice / MAX_PRICE) * 100}%`,
//               width: `${((maxPrice - minPrice) / MAX_PRICE) * 100}%`,
//             }}
//           />
//         </div>
//         <input
//           type="range"
//           min={MIN_PRICE}
//           max={MAX_PRICE}
//           step={STEP}
//           value={minPrice}
//           onChange={(e) => handleMinChange(Number(e.target.value))}
//           className="mileage-slider__range"
//         />

//         <input
//           type="range"
//           min={MIN_PRICE}
//           max={MAX_PRICE}
//           step={STEP}
//           value={maxPrice}
//           onChange={(e) => handleMaxChange(Number(e.target.value))}
//           className="mileage-slider__range mileage-slider__range--upper"
//         />
//       </div>

//       <div className="mileage-footer flex justify-end gap-0">
//         <button
//           type="button"
//           onClick={applyPriceFilter}
//           className="mileage-apply-btn"
//         >
//           Apply
//         </button>
//       </div>
//     </div>
//   );
// }
/************************************************* */
"use client";

import RangeFilter from "./RangeFilter";

const MIN_PRICE = 0;
const MAX_PRICE = 100000;
const STEP = 1000;

const formatPrice = (value: number) => `$${Math.round(value / 1000)}k`;

export default function PriceFilter() {
  return (
    <RangeFilter
      label="Price"
      paramKeyMin="priceMin"
      paramKeyMax="priceMax"
      min={MIN_PRICE}
      max={MAX_PRICE}
      step={STEP}
      format={formatPrice}
    />
  );
}















