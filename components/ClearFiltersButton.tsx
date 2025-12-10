"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ClearFiltersButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterKeys = [
    "fuelType",
    "transmission",
    "year",
    "seats",
    "category",
    "priceMin",
    "priceMax",
  ];

  const hasFilters = filterKeys.some((key) => searchParams.has(key));

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());

    filterKeys.forEach((key) => params.delete(key));
    params.delete("page");
    params.delete("limit");

    router.replace(`/?${params.toString()}`, { scroll: false });
  };

  if (!hasFilters) return null;

  return (
    <button
      onClick={handleClear}
      className="filter-clear-btn"
    >
      Clear filters
    </button>
  );
}

//********************************** */
// "use client";

// import { useRouter, useSearchParams } from "next/navigation";

// export default function ClearFiltersButton() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const hasFilters = searchParams.toString().length > 0;

//   const handleClear = () => {
//     const params = new URLSearchParams(searchParams.toString());

//     // Remove ONLY filters
//     params.delete("fuelType");
//     params.delete("transmission");
//     params.delete("year");
//     params.delete("seats");
//     params.delete("category");
//     params.delete("priceMin");
//     params.delete("priceMax");
//     params.delete("page");
//     params.delete("limit");

//     // DO NOT delete: make, model

//     //router.replace(`/?${params.toString()}`);
//     router.replace(`/?${params.toString()}`, { scroll: false });

//   };

//   if (!hasFilters) return null;

//   return (
//     <button
//       onClick={handleClear}
//       className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition"
//     >
//       Clear Filters
//     </button>
//   );
// }

