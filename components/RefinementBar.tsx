// "use client";

// import PriceFilter from "./PriceFilter";
// import SortFilter from "./SortFilter";

// export default function RefinementBar() {
//   return (
//     <div
//       className="
//         w-full
//         mt-4 
//         mb-5
//         sm:p-5 
//         sm:rounded-2xl 
//         sm:border 
//         sm:border-luxury-border 
//         sm:bg-luxury-surface/60 
//         sm:shadow-sm
//         p-3
//       "
//     >
//       <div
//         className="
//           flex flex-col 
//           gap-4
//           sm:flex-row 
//           sm:justify-between 
//           sm:items-center
//         "
//       >
//         {/* PRICE (Mobile full width, desktop left) */}
//         <div className="w-full sm:w-auto">
//           <PriceFilter />
//         </div>

//         {/* SORT (Mobile centered full width, desktop right) */}
//         <div className="w-full sm:w-auto flex sm:justify-end justify-center">
//           <SortFilter />
//         </div>
//       </div>
//     </div>
//   );
// }
/******************************************** */

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// import PriceFilter from "./PriceFilter";
// import SortFilter from "./SortFilter";

// export default function RefinementBar() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Mobile-only price state
//   const [openPriceModal, setOpenPriceModal] = useState(false);
//   const [minPriceMobile, setMinPriceMobile] = useState("");
//   const [maxPriceMobile, setMaxPriceMobile] = useState("");

//   // Keep mobile inputs in sync with URL
//   useEffect(() => {
//     setMinPriceMobile(searchParams.get("priceMin") || "");
//     setMaxPriceMobile(searchParams.get("priceMax") || "");
//   }, [searchParams]);

//   const applyMobilePriceFilter = () => {
//     const params = new URLSearchParams(window.location.search);

//     minPriceMobile
//       ? params.set("priceMin", minPriceMobile)
//       : params.delete("priceMin");

//     maxPriceMobile
//       ? params.set("priceMax", maxPriceMobile)
//       : params.delete("priceMax");

//     params.delete("page");

//     router.push(`/?${params.toString()}`, { scroll: false });
//     setOpenPriceModal(false);
//   };

//   return (
//     <>
//       <div
//         className="
//           mt-3 mb-6
//           w-full
//         "
//       >
//         {/* MOBILE LAYOUT */}
//         <div className="flex flex-col gap-3 sm:hidden">
//           <div className="flex gap-3">

//             {/* Price button → opens modal */}
//             {/* <button
//               onClick={() => setOpenPriceModal(true)}
//               className="
//                 flex-1
//                 px-4 py-2
//                 rounded-xl
//                 bg-luxury-surface
//                 border border-luxury-border
//                 text-luxury-text
//                 text-sm font-medium
//                 text-left
//               "
//             >
//               {minPriceMobile || maxPriceMobile
//                 ? `Price: ${
//                     minPriceMobile ? `$${minPriceMobile}` : ""
//                   }${minPriceMobile && maxPriceMobile ? " – " : ""}${
//                     maxPriceMobile ? `$${maxPriceMobile}` : ""
//                   }`
//                 : "Price filter"}
//             </button> */}

//             {/* <button
//               onClick={() => setOpenPriceModal(true)}
//               className="
//                 flex-1
//                 px-4 h-[48px]
//                 rounded-xl
//                 bg-luxury-surface
//                 border border-luxury-border
//                 text-luxury-text
//                 text-sm font-medium
//                 flex items-center
//                 whitespace-nowrap
//                 overflow-hidden text-ellipsis
//               "
//                         >
//               {minPriceMobile || maxPriceMobile
//                 ? `Price: ${minPriceMobile ? `$${Math.round(+minPriceMobile / 1000)}k` : ""
//                 }${minPriceMobile && maxPriceMobile ? "–" : ""}${maxPriceMobile ? `$${Math.round(+maxPriceMobile / 1000)}k` : ""
//                 }`
//                 : "Price filter"}
//             </button> */}

//             <button
//               onClick={() => setOpenPriceModal(true)}
//               className="
//                 w-full sm:w-auto
//                 h-[48px] px-4
//                 rounded-xl
//                 bg-luxury-surface
//                 border border-luxury-border
//                 text-luxury-text font-medium text-sm
//                 flex items-center justify-between
//                 whitespace-nowrap overflow-hidden text-ellipsis
//               "
//               >
//               {minPriceMobile || maxPriceMobile
//                 ? `Price: ${minPriceMobile ? `$${Math.round(+minPriceMobile / 1000)}k` : ""
//                 }${minPriceMobile && maxPriceMobile ? "–" : ""}${maxPriceMobile ? `$${Math.round(+maxPriceMobile / 1000)}k` : ""
//                 }`
//                 : "Price Range"}
//             </button>

//             {/* Sort occupies rest of row */}
//             <div className="flex-1 min-w-[160px]">
//               <SortFilter />
//             </div>
//           </div>
//         </div>

//         {/* DESKTOP / TABLET LAYOUT */}
//         <div
//           className="
//             hidden sm:flex
//             mt-3
//             w-full
//             p-4 sm:p-5
//             rounded-2xl
//             bg-luxury-surface/60
//             border border-luxury-border
//             shadow-sm
//             items-center
//             justify-between
//             gap-4
//           "
//         >
//           <div className="flex flex-wrap gap-3 items-center">
//             <PriceFilter />
//           </div>

//           <div className="flex gap-3 items-center ml-auto">
//             <SortFilter />
//           </div>
//         </div>
//       </div>

//       {/* MOBILE PRICE MODAL */}
//       {openPriceModal && (
//         <div
//           className="
//             fixed inset-0 z-50
//             bg-black/40 backdrop-blur-sm
//             flex items-center justify-center
//             sm:hidden
//           "
//         >
//           <div
//             className="
//               w-full max-w-sm mx-4
//               rounded-2xl
//               bg-luxury-surface
//               border border-luxury-border
//               p-5 pb-6
//             "
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-base font-semibold text-luxury-text">
//                 Price Range
//               </h2>
//               <button
//                 onClick={() => setOpenPriceModal(false)}
//                 className="text-xl text-luxury-muted"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="flex flex-col gap-3">
//               <input
//                 type="number"
//                 placeholder="Min price"
//                 className="filter-input"
//                 value={minPriceMobile}
//                 onChange={(e) => setMinPriceMobile(e.target.value)}
//                 min={0}
//               />
//               <input
//                 type="number"
//                 placeholder="Max price"
//                 className="filter-input"
//                 value={maxPriceMobile}
//                 onChange={(e) => setMaxPriceMobile(e.target.value)}
//                 min={0}
//               />
//             </div>

//             <button
//               onClick={applyMobilePriceFilter}
//               className="
//                 mt-5 w-full h-[48px]
//                 rounded-xl
//                 bg-luxury-accent
//                 text-black font-semibold
//               "
//             >
//               Apply
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
//*********************************** */

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import PriceFilter from "./PriceFilter";
import SortFilter from "./SortFilter";

export default function RefinementBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mobile-only price state
  const [openPriceModal, setOpenPriceModal] = useState(false);
  const [minPriceMobile, setMinPriceMobile] = useState("");
  const [maxPriceMobile, setMaxPriceMobile] = useState("");

  // Keep mobile inputs in sync with URL
  useEffect(() => {
    setMinPriceMobile(searchParams.get("priceMin") || "");
    setMaxPriceMobile(searchParams.get("priceMax") || "");
  }, [searchParams]);

  const applyMobilePriceFilter = () => {
    const params = new URLSearchParams(window.location.search);

    minPriceMobile
      ? params.set("priceMin", minPriceMobile)
      : params.delete("priceMin");

    maxPriceMobile
      ? params.set("priceMax", maxPriceMobile)
      : params.delete("priceMax");

    params.delete("page");

    router.push(`/?${params.toString()}`, { scroll: false });
    setOpenPriceModal(false);
  };

  return (
    <>
      <div className="mt-3 mb-6 w-full">
        {/* MOBILE LAYOUT */}
        <div className="flex flex-col gap-3 sm:hidden">
          {/* Row 1 – Price chip */}
          <button
            onClick={() => setOpenPriceModal(true)}
            className="filter-shell"
          >
            {minPriceMobile || maxPriceMobile
              ? `Price: ${
                  minPriceMobile ? `$${Math.round(+minPriceMobile / 1000)}k` : ""
                }${minPriceMobile && maxPriceMobile ? "–" : ""}${
                  maxPriceMobile ? `$${Math.round(+maxPriceMobile / 1000)}k` : ""
                }`
              : "Price Range"}
          </button>

          {/* Row 2 – Sort */}
          <div className="w-full">
            <SortFilter />
          </div>
        </div>

        {/* DESKTOP / TABLET LAYOUT */}
        <div
          className="
            hidden sm:flex
            mt-3
            w-full
            p-4 sm:p-5
            rounded-2xl
            bg-luxury-surface/60
            border border-luxury-border
            shadow-sm
            items-center
            justify-between
            gap-4
          "
        >
          <div className="flex flex-wrap gap-3 items-center">
            <PriceFilter />
          </div>

          <div className="flex gap-3 items-center ml-auto">
            <SortFilter />
          </div>
        </div>
      </div>

      {/* MOBILE PRICE MODAL */}
      {openPriceModal && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/40 backdrop-blur-sm
            flex items-center justify-center
            sm:hidden
          "
        >
          <div
            className="
              w-full max-w-sm mx-4
              rounded-2xl
              bg-luxury-surface
              border border-luxury-border
              p-5 pb-6
            "
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold text-luxury-text">
                Price Range
              </h2>
              <button
                onClick={() => setOpenPriceModal(false)}
                className="text-xl text-luxury-muted"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <input
                type="number"
                placeholder="Min price"
                className="filter-input"
                value={minPriceMobile}
                onChange={(e) => setMinPriceMobile(e.target.value)}
                min={0}
              />
              <input
                type="number"
                placeholder="Max price"
                className="filter-input"
                value={maxPriceMobile}
                onChange={(e) => setMaxPriceMobile(e.target.value)}
                min={0}
              />
            </div>

            <button
              onClick={applyMobilePriceFilter}
              className="
                mt-5 w-full h-[48px]
                rounded-xl
                bg-luxury-accent
                text-black font-semibold
              "
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  );
}



