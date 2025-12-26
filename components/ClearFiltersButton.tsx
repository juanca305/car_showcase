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
    "branch",
    "condition",
    "sort",
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
    // <button
    //   onClick={handleClear}
    //   className="filter-clear-btn"
    // >
    //   Clear filters
    // </button>
    <button
      type="button"
      onClick={handleClear}
      className="clear-filters-btn"
    >
      <span className="clear-filters-pill" />
      Clear filters
    </button>
  );
}
