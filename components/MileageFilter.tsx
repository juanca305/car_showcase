// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// const MIN_BOUND = 0;
// const MAX_BOUND = 200000;
// const STEP = 5000;

// export default function MileageFilter() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [minMileage, setMinMileage] = useState<number>(MIN_BOUND);
//   const [maxMileage, setMaxMileage] = useState<number>(MAX_BOUND);

//   // 1️⃣ Sync from URL on mount / URL change
//   useEffect(() => {
//     const minParam = searchParams.get("mileageMin");
//     const maxParam = searchParams.get("mileageMax");

//     setMinMileage(minParam ? Number(minParam) : MIN_BOUND);
//     setMaxMileage(maxParam ? Number(maxParam) : MAX_BOUND);
//   }, [searchParams]);

//   // 2️⃣ Move min thumb (never beyond max)
//   const handleMinChange = (value: number) => {
//     const safeValue = Math.min(value, maxMileage);
//     setMinMileage(safeValue);
//   };

//   // 3️⃣ Move max thumb (never below min)
//   const handleMaxChange = (value: number) => {
//     const safeValue = Math.max(value, minMileage);
//     setMaxMileage(safeValue);
//   };

//   // 4️⃣ Apply -> update URL and trigger fetch
//   const applyMileageFilter = () => {
//     const params = new URLSearchParams(window.location.search);

//     if (minMileage > MIN_BOUND) {
//       params.set("mileageMin", String(minMileage));
//     } else {
//       params.delete("mileageMin");
//     }

//     if (maxMileage < MAX_BOUND) {
//       params.set("mileageMax", String(maxMileage));
//     } else {
//       params.delete("mileageMax");
//     }

//     // reset pagination when filters change
//     params.delete("page");

//     router.push(`/?${params.toString()}`, { scroll: false });
//   };

//   // Helper: show "20k" instead of "20000"
//   const formatK = (value: number) => `${Math.round(value / 1000)}k`;

//   return (
//     <div className="mileage-filter">

//       {/* Label row */}
//       <div className="flex items-center justify-between mb-1">
//         <span className="mileage-label">Mileage</span>
//         <span className="mileage-value text-xs text-luxury-muted">
//           {minMileage > MIN_BOUND || maxMileage < MAX_BOUND
//             ? `${formatK(minMileage)} – ${formatK(maxMileage)}`
//             : "Any"}
//         </span>
//       </div>


//       {/* Slider controls */}
//       <div className="mileage-slider mt-2 mb-1 relative">

//         {/* Visual track */}
//         <div className="slider-track">
//           <div
//             className="slider-track-fill"
//             style={{
//               left: `${(minMileage / MAX_BOUND) * 100}%`,
//               width: `${((maxMileage - minMileage) / MAX_BOUND) * 100}%`,
//             }}
//           />
//         </div>

//         {/* Min slider */}
//         <input
//           type="range"
//           min={MIN_BOUND}
//           max={MAX_BOUND}
//           step={STEP}
//           value={minMileage}
//           onChange={(e) => handleMinChange(Number(e.target.value))}
//           className="mileage-slider__range"
//         />

//         {/* Max slider */}
//         <input
//           type="range"
//           min={MIN_BOUND}
//           max={MAX_BOUND}
//           step={STEP}
//           value={maxMileage}
//           onChange={(e) => handleMaxChange(Number(e.target.value))}
//           className="mileage-slider__range mileage-slider__range--upper"
//         />
//       </div>

//       {/* Numeric display + Apply button */}
//       <div className="mileage-footer flex justify-end gap-0">
//         <button
//           type="button"
//           onClick={applyMileageFilter}
//           className="mileage-apply-btn"
//         >
//           Apply
//         </button>
//       </div>
//     </div>
//   );
// }

/***************************************** */

"use client";

import RangeFilter from "./RangeFilter";

const MIN_MILEAGE = 0;
const MAX_MILEAGE = 200000;
const STEP = 5000;

const formatMileage = (value: number) => `${Math.round(value / 1000)}k`;

export default function MileageFilter() {
  return (
    <RangeFilter
      label="Mileage"
      paramKeyMin="mileageMin"
      paramKeyMax="mileageMax"
      min={MIN_MILEAGE}
      max={MAX_MILEAGE}
      step={STEP}
      format={formatMileage}
    />
  );
}

