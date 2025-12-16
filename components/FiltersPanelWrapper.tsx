"use client";

import { useState } from "react";
import FiltersMobileButton from "./FiltersMobileButton";
import CategoryFilter from "./CategoryFilter";
import SeatsFilter from "./SeatsFilter";
import FuelFilter from "./FuelFilter";
import TransmissionFilter from "./TransmissionFilter";
import YearFilter from "./YearFilter";
import PriceFilter from "./PriceFilter";
import BranchFilter from "./BranchFilter";

export default function FiltersPanelWrapper() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Mobile Button */}
        <FiltersMobileButton setOpen={setOpen} />
      
      {/* Desktop Filters */}
      <div className="home__filter-container hidden sm:flex ">
        <BranchFilter />
        <CategoryFilter />
        <SeatsFilter />
        <FuelFilter />
        <TransmissionFilter />
        <YearFilter />
        <PriceFilter />
      </div>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="
          fixed inset-0 z-50 
          bg-black/40 backdrop-blur-sm 
          flex justify-end
        ">
          <div className="
            w-full max-w-[340px] h-full 
            bg-luxury-surface
            border-l border-luxury-border
            p-6
            flex flex-col
            relative z-[100]
          ">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-luxury-text">
                Filters
              </h2>
              <button
                className="text-luxury-muted text-2xl"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>

            {/* Mobil Filters */}
            <div className="flex flex-col gap-5 relative">
              <BranchFilter />
              <CategoryFilter />
              <SeatsFilter />
              <FuelFilter />
              <TransmissionFilter />
              <YearFilter />
              <PriceFilter />
            </div>

            {/* Apply Button At Bottom */}
            <div className="mt-8">
              <button
                onClick={() => setOpen(false)}
                className="
                  w-full py-3 rounded-xl 
                  bg-luxury-accent text-white font-medium
                "
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
