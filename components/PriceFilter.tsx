// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function PriceFilter() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   useEffect(() => {
//     setMinPrice(searchParams.get("priceMin") || "");
//     setMaxPrice(searchParams.get("priceMax") || "");
//   }, [searchParams]);

//   const applyPriceFilter = () => {
//     const params = new URLSearchParams(window.location.search);

//     minPrice ? params.set("priceMin", minPrice) : params.delete("priceMin");
//     maxPrice ? params.set("priceMax", maxPrice) : params.delete("priceMax");

//     params.delete("page");

//     router.push(`/?${params.toString()}`, { scroll: false });
//   };

//   return (
//     <div className="
//       price-filter-wrapper
//       sm:rounded-xl
//       sm:border
//       sm:border-luxury-border
//       sm:bg-luxury-surface/40
//       sm:px-3
//       sm:py-2
//     ">
//       <span className="price-label whitespace-nowrap">
//         Price
//       </span>

//       <div className="price-controls">
//         <div className="price-input relative">
//           <input
//             type="number"
//             placeholder="Min"
//             className="filter-input pl-12"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//             min={0}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") applyPriceFilter();
//             }}
//           />
//         </div>

//         <div className="price-input relative">
//           <input
//             type="number"
//             placeholder="Max"
//             className="filter-input pl-14"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             min={0}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") applyPriceFilter();
//             }}
//           />
//         </div>

//         <button
//           onClick={applyPriceFilter}
//           className="filter-apply-btn whitespace-nowrap"
//         >
//           Apply
//         </button>
//       </div>
//     </div>
//   );
// }
/****************************************** */

//*** This does not work ***/ */
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function PriceFilter() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [openModal, setOpenModal] = useState(false);

//   useEffect(() => {
//     setMinPrice(searchParams.get("priceMin") || "");
//     setMaxPrice(searchParams.get("priceMax") || "");
//   }, [searchParams]);

//   const applyPriceFilter = () => {
//     const params = new URLSearchParams(window.location.search);

//     minPrice ? params.set("priceMin", minPrice) : params.delete("priceMin");
//     maxPrice ? params.set("priceMax", maxPrice) : params.delete("priceMax");
//     params.delete("page");

//     router.push(`/?${params.toString()}`, { scroll: false });
//     setOpenModal(false);
//   };

//   return (
//     <>
//       {/* DESKTOP version (unchanged) */}
//       <div className="hidden sm:flex price-filter-wrapper">
//         <span className="price-label whitespace-nowrap">Price</span>

//         <div className="price-controls">
//           <div className="price-input relative">
//             <input
//               type="number"
//               placeholder="Min"
//               className="filter-input pl-12"
//               value={minPrice}
//               onChange={(e) => setMinPrice(e.target.value)}
//             />
//           </div>

//           <div className="price-input relative">
//             <input
//               type="number"
//               placeholder="Max"
//               className="filter-input pl-12"
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(e.target.value)}
//             />
//           </div>

//           <button onClick={applyPriceFilter} className="filter-apply-btn">
//             Apply
//           </button>
//         </div>
//       </div>

//       {/* MOBILE BUTTON (opens modal) */}
//       <button
//         onClick={() => setOpenModal(true)}
//         className="
//           sm:hidden
//           px-4 py-2
//           rounded-xl
//           bg-luxury-surface
//           border border-luxury-border
//           text-luxury-text
//           text-sm font-medium
//         "
//       >
//         Price Filter
//       </button>

//       {/* MOBILE MODAL */}
//       {openModal && (
//         <div
//           className="
//             fixed inset-0 z-50 bg-black/40 backdrop-blur-sm 
//             flex justify-center items-end
//             sm:hidden
//           "
//         >
//           <div
//             className="
//               w-full
//               rounded-t-2xl
//               bg-luxury-surface
//               border border-luxury-border
//               p-5 pb-8
//               animate-slide-up
//             "
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-base font-semibold text-luxury-text">Price Range</h2>
//               <button onClick={() => setOpenModal(false)} className="text-xl text-luxury-muted">
//                 ×
//               </button>
//             </div>

//             {/* Inputs inside modal */}
//             <div className="flex flex-col gap-4">
//               <input
//                 type="number"
//                 placeholder="Min Price"
//                 className="filter-input"
//                 value={minPrice}
//                 onChange={(e) => setMinPrice(e.target.value)}
//               />
//               <input
//                 type="number"
//                 placeholder="Max Price"
//                 className="filter-input"
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(e.target.value)}
//               />
//             </div>

//             <button
//               onClick={applyPriceFilter}
//               className="
//                 mt-5 w-full h-[48px]
//                 rounded-xl bg-luxury-accent text-black font-semibold
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

/*************************** */

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    setMinPrice(searchParams.get("priceMin") || "");
    setMaxPrice(searchParams.get("priceMax") || "");
  }, [searchParams]);

  const applyPriceFilter = () => {
    const params = new URLSearchParams(window.location.search);

    minPrice ? params.set("priceMin", minPrice) : params.delete("priceMin");
    maxPrice ? params.set("priceMax", maxPrice) : params.delete("priceMax");

    // reset pagination
    params.delete("page");

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="price-filter-wrapper">
      <span className="price-label whitespace-nowrap">
        Price
      </span>

      <div className="price-controls">
        <div className="price-input relative">
          <input
            type="number"
            placeholder="Min"
            className="filter-input pl-12"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyPriceFilter();
            }}
          />
        </div>

        <div className="price-input relative">
          <input
            type="number"
            placeholder="Max"
            className="filter-input pl-12"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyPriceFilter();
            }}
          />
        </div>

        <button
          onClick={applyPriceFilter}
          className="filter-apply-btn whitespace-nowrap"
        >
          Apply
        </button>
      </div>
    </div>
  );
}











