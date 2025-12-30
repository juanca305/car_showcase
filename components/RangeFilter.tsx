// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// type Props = {
//   label: string;
//   paramKeyMin: string;       // "mileageMin" | "priceMin" | ...
//   paramKeyMax: string;
//   min: number;
//   max: number;
//   step: number;
//   format?: (v: number) => string;  
// };

// export default function RangeFilter({
//   label,
//   paramKeyMin,
//   paramKeyMax,
//   min,
//   max,
//   step,
//   format = (v) => `${v}`,   // default fallback
// }: Props) {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [minValue, setMinValue] = useState(min);
//   const [maxValue, setMaxValue] = useState(max);

//   // Sync URL state
//   useEffect(() => {
//     const minParam = searchParams.get(paramKeyMin);
//     const maxParam = searchParams.get(paramKeyMax);

//     setMinValue(minParam ? Number(minParam) : min);
//     setMaxValue(maxParam ? Number(maxParam) : max);
//   }, [searchParams, paramKeyMin, paramKeyMax, min, max]);

//   const handleMinChange = (val: number) =>
//     setMinValue(Math.min(val, maxValue));

//   const handleMaxChange = (val: number) =>
//     setMaxValue(Math.max(val, minValue));

//   const applyFilter = () => {
//     const params = new URLSearchParams(window.location.search);

//     minValue > min ? params.set(paramKeyMin, String(minValue)) : params.delete(paramKeyMin);
//     maxValue < max ? params.set(paramKeyMax, String(maxValue)) : params.delete(paramKeyMax);

//     params.delete("page"); // reset pagination

//     router.push(`/?${params.toString()}`, { scroll: false });
//   };

//   return (
//     <div className="range-filter">
//       <div className="flex items-center justify-between mb-1">
//         <span className="range-label">{label}</span>
//         <span className="text-xs text-luxury-muted">
//           {minValue > min || maxValue < max
//             ? `${format(minValue)} – ${format(maxValue)}`
//             : "Any"}
//         </span>
//       </div>

//       <div className="range-slider mt-2 mb-1 relative">
//         <div className="slider-track">
//           <div
//             className="slider-track-fill"
//             style={{
//               left: `${(minValue / max) * 100}%`,
//               width: `${((maxValue - minValue) / max) * 100}%`,
//             }}
//           />
//         </div>

//         <input
//           type="range"
//           min={min}
//           max={max}
//           step={step}
//           value={minValue}
//           onChange={(e) => handleMinChange(Number(e.target.value))}
//           className="range-slider__range"
//         />

//         <input
//           type="range"
//           min={min}
//           max={max}
//           step={step}
//           value={maxValue}
//           onChange={(e) => handleMaxChange(Number(e.target.value))}
//           className="range-slider__range range-slider__range--upper"
//         />
//       </div>

//       <div className="range-footer flex justify-end">
//         <button type="button" onClick={applyFilter} className="range-apply-btn">
//           Apply
//         </button>
//       </div>
//     </div>
//   );
// }

/***************************************** */
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type RangeFilterProps = {
  label: string;        // e.g. "Mileage", "Price"
  paramKeyMin: string;  // e.g. "mileageMin", "priceMin"
  paramKeyMax: string;  // e.g. "mileageMax", "priceMax"
  min: number;          // numeric lower bound
  max: number;          // numeric upper bound
  step: number;         // slider step
  format?: (value: number) => string; // how to show the value
};

export default function RangeFilter({
  label,
  paramKeyMin,
  paramKeyMax,
  min,
  max,
  step,
  format = (v) => `${v}`,
}: RangeFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [minValue, setMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);

  // Sync local state with URL when searchParams changes
  useEffect(() => {
    const minParam = searchParams.get(paramKeyMin);
    const maxParam = searchParams.get(paramKeyMax);

    setMinValue(minParam ? Number(minParam) : min);
    setMaxValue(maxParam ? Number(maxParam) : max);
  }, [searchParams, paramKeyMin, paramKeyMax, min, max]);

  // Ensure minValue never goes beyond maxValue
  const handleMinChange = (value: number) => {
    const safeValue = Math.min(value, maxValue);
    setMinValue(safeValue);
  };

  // Ensure maxValue never goes below minValue
  const handleMaxChange = (value: number) => {
    const safeValue = Math.max(value, minValue);
    setMaxValue(safeValue);
  };

  // Apply -> update query params and reset page
  const applyFilter = () => {
    const params = new URLSearchParams(window.location.search);

    if (minValue > min) {
      params.set(paramKeyMin, String(minValue));
    } else {
      params.delete(paramKeyMin);
    }

    if (maxValue < max) {
      params.set(paramKeyMax, String(maxValue));
    } else {
      params.delete(paramKeyMax);
    }

    // reset pagination
    params.delete("page");

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="range-filter">
      {/* Label row */}
      <div className="flex items-center justify-between mb-1">
        <span className="range-label">{label}</span>
        <span className="text-xs text-luxury-muted">
          {minValue > min || maxValue < max
            ? `${format(minValue)} – ${format(maxValue)}`
            : "Any"}
        </span>
      </div>

      {/* Slider controls */}
      <div className="range-slider mt-2 mb-1 relative">
        {/* Visual track */}
        <div className="slider-track">
          <div
            className="slider-track-fill"
            style={{
              left: `${(minValue / max) * 100}%`,
              width: `${((maxValue - minValue) / max) * 100}%`,
            }}
          />
        </div>

        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="range-slider__range"
        />

        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="range-slider__range range-slider__range--upper"
        />
      </div>

      {/* Footer / Apply button */}
      <div className="range-footer flex justify-end">
        <button
          type="button"
          onClick={applyFilter}
          className="range-apply-btn"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
