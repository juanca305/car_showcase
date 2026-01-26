// "use client";

// import { useRouter, useSearchParams, usePathname } from "next/navigation";

// export function useQueryParams() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const pathname = usePathname();

//   function updateParams(
//     updates: Record<string, string | number | null | undefined>,
//     options?: { resetPage?: boolean; scroll?: boolean; replace?: boolean }
//   ) {
//     const params = new URLSearchParams(searchParams.toString());

//     // apply changes
//     Object.entries(updates).forEach(([key, value]) => {
//       if (value === "" || value === null || value === undefined) {
//         params.delete(key);
//       } else {
//         params.set(key, String(value));
//       }
//     });

//     // ✅ ALWAYS reset page unless explicitly disabled
//     if (options?.resetPage !== false) {
//       params.delete("page");
//     }

//     const url = `${pathname}?${params.toString()}`;

//     const scroll = options?.scroll ?? false;
//     const replace = options?.replace ?? false;

//     if (replace) router.replace(url, { scroll });
//     else router.push(url, { scroll });
//   }

//   return { updateParams };
// }
/*********************************** */

// "use client";

// import { usePathname, useSearchParams } from "next/navigation";

// type SetQueryOptions = {
//   scroll?: boolean;
// };

// export function useQueryParams() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   function makeUrl(
//     updates: Record<string, string | number | null | undefined>,
//   ) {
//     const params = new URLSearchParams(searchParams.toString());

//     Object.entries(updates).forEach(([key, value]) => {
//       if (value === null || value === undefined || value === "") {
//         params.delete(key);
//       } else {
//         params.set(key, String(value));
//       }
//     });

//     const queryString = params.toString();
//     return queryString ? `${pathname}?${queryString}` : pathname;
//   }

//   return { makeUrl };
// }
/********************************* */
"use client";

import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function useQueryParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const makeUrl = useCallback(
    (updates: Record<string, string | number | null | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      const queryString = params.toString();
      return queryString ? `${pathname}?${queryString}` : pathname;
    },
    [pathname, searchParams]
  );

  return { makeUrl };
}

