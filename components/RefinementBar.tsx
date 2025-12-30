"use client";

import PriceFilter from "./PriceFilter";
import MileageFilter from "./MileageFilter";
import SortFilter from "./SortFilter";

export default function RefinementBar() {
  return (
    <div className="mt-3 mb-6 w-full">
      <div
        className="
          w-full
          p-4 sm:p-5
          rounded-2xl
          bg-luxury-surface/60
          border border-luxury-border
          shadow-sm
        "
      >
        {/* Main layout wrapper */}
        {/* <div
          className="
            flex flex-col
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        > */}

        <div
          className="
            flex flex-col gap-4
            md:flex-row md:items-center md:justify-between md:flex-nowrap
            lg:flex-row lg:items-center lg:justify-between
            "
        >

          {/* LEFT SIDE: Price + Mileage */}
          {/* <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:flex-wrap
              sm:gap-6
              flex-1
            "
          > */}

          <div
            className="
              flex flex-col gap-4
              sm:flex-row sm:gap-4
              md:flex-row md:gap-6 md:flex-nowrap
              flex-1
            "
          >

            <PriceFilter />
            <MileageFilter />
          </div>

          {/* RIGHT SIDE: Sort */}
          {/* <div
            className="
              w-full
              sm:w-auto
              flex
              justify-start
              sm:justify-end
              mt-2 sm:mt-0
            "
          > */}

          <div
            className="
              w-full md:w-auto
              flex justify-start md:justify-end
              mt-2 md:mt-0
              shrink-0
            "
          >

            <SortFilter />
          </div>
        </div>
      </div>
    </div>
  );
}




