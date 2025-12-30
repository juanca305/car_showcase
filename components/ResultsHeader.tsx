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
        gap-6
        mb-6
        mt-8
      "
    >
      {/* Left: results count */}
      <div className="flex items-center gap-3">
        <p className="text-lg font-bold text-luxury-muted">
          Showing{" "} <span className="font-semibold text-luxury-text">{total}</span>{" "}
          vehicles
        </p>
      </div>

      <div className="flex justify-start">
        <ClearFiltersButton />
      </div>
    </div>
  );
}
