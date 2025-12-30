// 'use client';

// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import CustomFilter from "@/components/CustomFilter";
// import { yearsOfProduction } from "@/constants";

// export default function YearFilter() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [year, setYear] = useState<string>("");

//   // Initialize state from URL on mount
//   useEffect(() => {
//     setYear(searchParams?.get("year") || "");
//   }, [searchParams]);

//   // Update state and URL when user selects a new value
//   const handleChange = (value: string) => {
//     setYear(value); // update UI immediately
//     const params = new URLSearchParams(window.location.search);

//     if (value) params.set("year", value);
//     else params.delete("year"); // remove filter if empty

//     //router.push(`/?${params.toString()}`);

//     // ❌ scroll: true (default) makes page jump
//     // ✅ scroll: false prevents it
//     router.push(`/?${params.toString()}`, { scroll: false });
//   };

//   return (
//     <CustomFilter
//       title="year"
//       value={year}
//       options={[
//         { title: "Year", value: "" },
//         ...yearsOfProduction, // use your predefined list of years
//       ]}
//       handleChange={handleChange}
//     />
//   );
// }
/******************************************** */
"use client";

import RangeFilter from "./RangeFilter";  // adjust path if needed

const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1990;


export default function YearFilter() {
  return (
    <RangeFilter
      label="Year"
      paramKeyMin="yearMin"
      paramKeyMax="yearMax"
      min={MIN_YEAR}
      max={CURRENT_YEAR}
      step={1}
      format={(v) => v.toString()}
    />
  );
}

