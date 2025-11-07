"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ClearFiltersButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasFilters = searchParams.toString().length > 0;

  const handleClear = () => {
    router.push("/"); // reset to base route without filters
  };

  if (!hasFilters) return null; // hide button if no filters active

  return (
    <button
      onClick={handleClear}
      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition"
    >
      Clear Filters
    </button>
  );
}
