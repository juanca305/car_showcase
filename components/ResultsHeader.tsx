"use client";

//import SortFilter from "@/components/SortFilter";
import ClearFiltersButton from "./ClearFiltersButton";

interface ResultsHeaderProps {
  total: number;
}

export default function ResultsHeader({ total }: ResultsHeaderProps) {
  return (
    <div
      className="
        flex
        flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between
        gap-3
        mb-6
        mt-8
      "
    >
      {/* Left: results count */}
      <p className="text-lg font-bold text-luxury-muted">
        Showing{" "} <span className="font-semibold text-luxury-text">{total}</span>{" "}
        vehicles
      </p>

      {/* Right: sorting */}
      {/* <div className="w-full sm:w-auto">
        <SortFilter />
      </div> */}

      <div className="flex justify-start sm:justify-end">
        <ClearFiltersButton />
      </div>
    </div>
  );
}
