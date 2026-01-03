// "use client";

// import PriceFilter from "./PriceFilter";
// import MileageFilter from "./MileageFilter";
// import SortFilter from "./SortFilter";
// import YearFilter from "./YearFilter";

// export default function RefinementBar() {
//   return (
//     <div className="mt-3 mb-6 w-full">
//       <div
//         className="
//           w-full
//           p-4 sm:p-5
//           rounded-2xl
//           bg-luxury-surface/60
//           border border-luxury-border
//           shadow-sm
//           mt-10
//           mb-10
//         "
//       >
//         {/* Main layout wrapper */}
//         <div
//           className="
//             flex flex-col gap-4
//             md:flex-row md:items-center md:justify-between md:flex-wrap
//             lg:flex-row lg:items-center lg:justify-between lg:flex-nowrap
//             "
//         >

//           {/* LEFT SIDE: Price + Mileage + Year */}

//           <div
//             className="
//               flex flex-col gap-4
//               md:gap-6 md:flex-wrap md:flex-row
//               lg:flex-nowrap lg:items-center lg:justify-between
//             "
//           >
//             <PriceFilter />
//             <MileageFilter />
//             <YearFilter />
//             {/* <YearFilter />
//             <YearFilter /> */}
            
//           </div>

//           {/* RIGHT SIDE: Sort */}
//           <div
//             className="
//               w-full md:w-auto
//               flex justify-start md:justify-end
//               mt-2 md:mt-0
//               shrink-0
//             "
//           >
//             <SortFilter />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

/*********************** */

//**** THIS IS THE BETTER APPROACH FOR NOW ***////// */
// "use client";

// import PriceFilter from "./PriceFilter";
// import MileageFilter from "./MileageFilter";
// import SortFilter from "./SortFilter";
// import YearFilter from "./YearFilter";

// export default function RefinementBar() {
//   return (
//     <div className="mt-3 mb-6 w-full">
//       <div className="
//         w-full p-5 rounded-2xl 
//         bg-luxury-surface/60 border border-luxury-border shadow-sm
//         mt-10 mb-10
//       ">

//         {/* =============================== 
//             Filters Container — Main Logic 
//         ================================ */}
//         <div className="
//           grid 
//           grid-cols-1 gap-5                /* Mobile: 1 per row */
//           sm:grid-cols-2 sm:gap-6           /* Tablet: 2 per row (clean + elegant) */
//           lg:flex lg:flex-row lg:flex-wrap  /* Desktop switches to row layout */
//           lg:items-center lg:justify-between
//         ">

//           {/* Filters become grid items automatically */}
//           <PriceFilter />
//           <MileageFilter />
//           <YearFilter />
//           <YearFilter />
//           <YearFilter />
//           <YearFilter />
//           {/* <YearFilter /> */}

//           {/* Sort becomes just another block in the grid on tablet */}
//           <div className="sm:col-span-1 lg:ml-auto min-w-[200px]">
//             <SortFilter />
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


/************************************ */

///*****THIS IS THE BEST VERSION !!!************ */
// "use client";

// import { useState } from "react";
// import PriceFilter from "./PriceFilter";
// import MileageFilter from "./MileageFilter";
// import YearFilter from "./YearFilter";
// import SortFilter from "./SortFilter";

// export default function RefinementBar() {
//   const [open, setOpen] = useState(false);

//   return (
//     /* *** If a dropdown goes behind content instead of disappearing,
//     think stacking order between sibling sections, not z-index of the dropdown.*** */

//     <div className="mt-6 mb-10 w-full relative z-30">
//       <div className="w-full p-5 rounded-2xl bg-luxury-surface/60 border border-luxury-border shadow-lg shadow-black/20 backdrop-blur-sm">

//         {/* =========================================================
//            TABLET HEADER — Filters Toggle + Sort (MD ONLY)
//         ========================================================= */}
//         <div className="hidden md:flex lg:hidden justify-between items-center mb-2">
//           <button
//             onClick={() => setOpen(!open)}
//             className="
//               px-5 py-2 rounded-xl 
//               bg-luxury-surface/40 border border-luxury-border 
//               text-sm font-semibold text-luxury-text 
//               hover:bg-luxury-surface/60 hover:border-luxury-accent 
//               transition-all duration-200
//               shadow-sm hover:shadow-md
//             "
//           >
//             {open ? "Hide Filters" : "More Filters"}
//           </button>

//           <div className="w-fit">
//             <SortFilter />
//           </div>
//         </div>


//         {/* =========================================================
//            TABLET DROPDOWN AREA (Animated Collapse)
//         ========================================================= */}
//         <div
//           className={`
//             hidden md:block lg:hidden overflow-hidden 
//             transition-all duration-400 ease-out
//             ${open ? "max-h-[650px] mt-4 opacity-100" : "max-h-0 opacity-0"}
//           `}
//         >
//           <div className="
//             grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 
//             rounded-xl bg-luxury-surface/30 border border-luxury-border/60
//           ">
//             <PriceFilter />
//             <MileageFilter />
//             <YearFilter />
//           </div>
//         </div>


//         {/* =========================================================
//            DESKTOP — Always Visible Inline Layout (LG+)
//         ========================================================= */}
//         <div className="hidden lg:flex justify-between items-center gap-6">

//           {/* Filter row */}
//           <div className="flex items-center gap-5 flex-wrap max-w-[75%]">
//             <PriceFilter />
//             <MileageFilter />
//             <YearFilter />
//           </div>

//           {/* Sort stays right aligned */}
//           <div className="min-w-[180px]">
//             <SortFilter />
//           </div>
//         </div>


//         {/* =========================================================
//            MOBILE — Stack naturally with perfect spacing
//         ========================================================= */}
//         <div className="md:hidden flex flex-col gap-4 mt-4">
//           <SortFilter />
//           <PriceFilter />
//           <MileageFilter />
//           <YearFilter />
//         </div>
//       </div>
//     </div>
//   );
// }
/*********************** */
"use client";

///***** THIS APPROACH SEEMS TO BE THE PERFECT ******** */

import { useState } from "react";
import PriceFilter from "./PriceFilter";
import MileageFilter from "./MileageFilter";
import YearFilter from "./YearFilter";
import SortFilter from "./SortFilter";

export default function RefinementBar() {
  const [open, setOpen] = useState(false);

  return (
    // NOTE: `relative z-30` is required so dropdowns overlap content below.
    // This fixes stacking-context issues caused by backdrop-blur + layout order.
    // Removing it will make dropdowns render BEHIND the next section.

    <div className="mt-6 mb-10 w-full relative z-30">
      <div className="w-full p-5 rounded-2xl bg-luxury-surface/60 border border-luxury-border shadow-lg shadow-black/20 backdrop-blur-sm">

        {/* =========================================================
           MOBILE + TABLET HEADER — Filters Toggle + Sort
           (hidden on desktop)
        ========================================================= */}
        <div className="flex md:flex lg:hidden justify-between items-center mb-2">
          <div className="max-w-max">
          <button
            onClick={() => setOpen(!open)}
            // className="
            //   px-5
            //   h-[48px]
            //   rounded-xl 
            //   bg-luxury-surface/40 border border-luxury-border 
            //   text-sm font-semibold text-luxury-text 
            //   hover:bg-luxury-surface/60 hover:border-luxury-accent 
            //   transition-all duration-200
            //   shadow-sm hover:shadow-md
            //   flex items-center
            // "
            className="refinement-btn_2 w-fit px-5 font-semibold"
          >
            {open ? "Hide Filters" : "More Filters"}
          </button>
          </div>

          <div className="min-w-[180px]">
            <SortFilter />
          </div>
        </div>

        {/* =========================================================
           MOBILE + TABLET DROPDOWN AREA (Animated Collapse)
        ========================================================= */}
        <div
          className={`
            block md:block lg:hidden overflow-hidden
            transition-all duration-400 ease-out
            ${open ? "max-h-[650px] mt-4 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="
            grid grid-cols-1 sm:grid-cols-2 gap-5 p-4
            rounded-xl bg-luxury-surface/30 border border-luxury-border/60
          ">
            <PriceFilter />
            <MileageFilter />
            <YearFilter />
          </div>
        </div>

        {/* =========================================================
           DESKTOP — Always Visible Inline Layout (LG+)
        ========================================================= */}
        <div className="hidden lg:flex justify-between items-center gap-6">

          {/* Filter row */}
          <div className="flex items-center gap-5 flex-wrap max-w-[75%]">
            <PriceFilter />
            <MileageFilter />
            <YearFilter />
          </div>

          {/* Sort stays right aligned */}
          <div className="min-w-[180px]">
            <SortFilter />
          </div>
        </div>

      </div>
    </div>
  );
}


/********************* */

// "use client";

// import { useState } from "react";
// import PriceFilter from "./PriceFilter";
// import MileageFilter from "./MileageFilter";
// import YearFilter from "./YearFilter";
// import SortFilter from "./SortFilter";

// export default function RefinementBar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="mt-6 mb-10 w-full">
//       <div className="w-full p-5 rounded-2xl bg-luxury-surface/60 border border-luxury-border shadow-lg shadow-black/20 backdrop-blur-sm">

//         {/* =========================================================
//            MOBILE & TABLET HEADER — Button + Sort (SM & MD)
//            (hidden on desktop)
//         ========================================================= */}
//         <div className="flex md:flex lg:hidden justify-between items-center mb-2">
          
//           {/* Same style button for mobile & tablet */}
//           <button
//             onClick={() => setOpen(!open)}
//             className="
//               px-5 py-2 rounded-xl 
//               bg-luxury-surface/40 border border-luxury-border 
//               text-sm font-semibold text-luxury-text 
//               hover:bg-luxury-surface/60 hover:border-luxury-accent 
//               transition-all duration-200
//               shadow-sm hover:shadow-md
//             "
//           >
//             {open ? "Hide Filters" : "More Filters"}

//           </button>
//             <SortFilter /> 
//         </div>


//         {/* =========================================================
//            MOBILE & TABLET DROPDOWN AREA (SM + MD only)
//            Animated like your tablet version
//         ========================================================= */}
//         <div
//           className={`
//             block md:block lg:hidden overflow-visible
//             transition-all duration-400 ease-out
//             ${open ? "max-h-[650px] mt-4 opacity-100" : "max-h-0 opacity-0"}
//           `}
//         >
//           <div className="
//             grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 
//             rounded-xl bg-luxury-surface/30 border border-luxury-border/60
//           ">
//             <PriceFilter />
//             <MileageFilter />
//             <YearFilter />
//           </div>
//         </div>


//         {/* =========================================================
//            DESKTOP — Always Visible Inline (unchanged)
//         ========================================================= */}
//         <div className="hidden lg:flex justify-between items-center gap-6 mt-4">

//           <div className="flex items-center gap-5 flex-wrap max-w-[75%]">
//             <PriceFilter />
//             <MileageFilter />
//             <YearFilter />
//           </div>
//             <SortFilter />
//         </div>
//       </div>
//     </div>
//   );
// }










