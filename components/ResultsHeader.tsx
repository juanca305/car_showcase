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
        mb-2
        mt-16
      "
    >
      {/* Left: results count */}
      <div className="flex items-center gap-3">

        <p className="results-text--badge results-animate">
          Showing <span className="results-number--strong">{total}</span> vehicles
        </p>
      </div>

      <div className="flex justify-start">
        <ClearFiltersButton />
      </div>
    </div>
  );
}
