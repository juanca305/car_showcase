// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import CustomFilter from "@/components/CustomFilter";
// import { carCategories } from "@/constants";

// export default function CategoryFilter() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [category, setCategory] = useState<string>("");

//   // Load initial category from URL
//   useEffect(() => {
//     setCategory(searchParams?.get("category") || "");
//   }, [searchParams]);

//   const handleChange = (value: string) => {
//     setCategory(value);

//     const params = new URLSearchParams(window.location.search);

//     if (value) params.set("category", value);
//     else params.delete("category");

//     params.delete("page"); // Reset to first page on filter change  

//     router.push(`/?${params.toString()}`, { scroll: false });
//   };

//   return (
//     <CustomFilter
//       title="category"
//       value={category}
//       options={carCategories}
//       handleChange={handleChange}
//     />
//   );
// }
/************************* */
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CustomFilter from "@/components/CustomFilter";
import { carCategories } from "@/constants";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function CategoryFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { makeUrl } = useQueryParams();

  const [category, setCategory] = useState<string>("");

  // Sync UI from URL
  useEffect(() => {
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);

  const handleChange = (value: string) => {
    setCategory(value);

    router.push(
      makeUrl({
        category: value || null, // ✅ set or remove category
        page: null,              // ✅ reset page when filter changes
      }),
      { scroll: false }
    );
  };

  return (
    <CustomFilter
      title="category"
      value={category}
      options={carCategories}
      handleChange={handleChange}
    />
  );
}

