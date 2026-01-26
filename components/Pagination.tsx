"use client";

import Link from "next/link";
import { useQueryParams } from "@/hooks/useQueryParams";

type PaginationProps = {
  page: number;
  pages: number;
};

export default function Pagination({ page, pages }: PaginationProps) {
  const { makeUrl } = useQueryParams();

  if (!pages || pages <= 1) return null;

  const prevPage = page - 1;
  const nextPage = page + 1;

  return (
    <div className="flex items-center justify-between mt-6">
      {/* Prev */}
      {page > 1 ? (
        <Link
          href={makeUrl({ page: prevPage })}
          scroll={false}
          className="px-4 py-2 rounded-xl text-sm font-medium border border-luxury-border bg-black/30 text-luxury-text hover:bg-white/5 transition"
        >
          ← Prev
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 rounded-xl text-sm font-medium border border-luxury-border bg-black/20 text-luxury-muted opacity-50 cursor-not-allowed"
        >
          ← Prev
        </button>
      )}

      {/* Page Info */}
      <div className="text-sm text-luxury-muted">
        Page <span className="text-white font-semibold">{page}</span> of{" "}
        <span className="text-white font-semibold">{pages}</span>
      </div>

      {/* Next */}
      {page < pages ? (
        <Link
          href={makeUrl({ page: nextPage })}
          scroll={false}
          className="px-4 py-2 rounded-xl text-sm font-medium border border-luxury-border bg-black/30 text-luxury-text hover:bg-white/5 transition"
        >
          Next →
        </Link>
      ) : (
        <button
          disabled
          className="px-4 py-2 rounded-xl text-sm font-medium border border-luxury-border bg-black/20 text-luxury-muted opacity-50 cursor-not-allowed"
        >
          Next →
        </button>
      )}
    </div>
  );
}


/***************************** */
/**  THIS LAST VERSION ALSO WORKS! */
/******************************* */
// "use client";

// import Link from "next/link";
// import { useQueryParams } from "@/hooks/useQueryParams";

// type PaginationProps = {
//   page: number;
//   pages: number;
// };

// export default function Pagination({ page, pages }: PaginationProps) {
//   const { makeUrl } = useQueryParams();

//   if (!pages || pages <= 1) return null;

//   const prevPage = page - 1;
//   const nextPage = page + 1;

//   return (
//     <div className="flex items-center justify-between mt-6">
//       {/* Prev */}
//       {page > 1 ? (
//         <Link
//           href={makeUrl({ page: prevPage === 1 ? null : prevPage })}
//           className="px-4 py-2 rounded-xl text-sm font-medium border border-luxury-border bg-black/30 text-luxury-text hover:bg-white/5 transition"
//         >
//           ← Prev
//         </Link>
//       ) : (
//         <button
//           disabled
//           className="px-4 py-2 rounded-xl text-sm font-medium border border-luxury-border bg-black/20 text-luxury-muted opacity-50 cursor-not-allowed"
//         >
//           ← Prev
//         </button>
//       )}

//       {/* ✅ Page Numbers (ADD THIS BLOCK HERE) */}
//       <div className="flex items-center gap-2">
//         {Array.from({ length: pages }, (_, i) => {
//           const p = i + 1;
//           const isActive = p === page;

//           if (isActive) {
//             return (
//               <span
//                 key={p}
//                 className="px-3 py-1 rounded-lg text-sm font-semibold bg-luxury-accent text-black"
//               >
//                 {p}
//               </span>
//             );
//           }

//           return (
//             <Link
//               key={p}
//               href={makeUrl({ page: p === 1 ? null : p })}
//               className="px-3 py-1 rounded-lg text-sm text-luxury-muted hover:text-luxury-text transition"
//             >
//               {p}
//             </Link>
//           );
//         })}
//       </div>

//       {/* Next */}
//       {page < pages ? (
//         <Link
//           href={makeUrl({ page: nextPage })}
//           className="px-4 py-2 rounded-xl text-sm font-medium border border-luxury-border bg-black/30 text-luxury-text hover:bg-white/5 transition"
//         >
//           Next →
//         </Link>
//       ) : (
//         <button
//           disabled
//           className="px-4 py-2 rounded-xl text-sm font-medium border border-luxury-border bg-black/20 text-luxury-muted opacity-50 cursor-not-allowed"
//         >
//           Next →
//         </button>
//       )}
//     </div>
//   );
// }




