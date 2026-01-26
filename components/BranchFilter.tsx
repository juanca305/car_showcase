// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import CustomFilter from "./CustomFilter";
// import { dealerBranches } from "@/constants";

// export default function BranchFilter() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [branch, setBranch] = useState("");

//   useEffect(() => {
//     setBranch(searchParams.get("branch") || "");
//   }, [searchParams]);

//   const handleChange = (value: string) => {
//     setBranch(value);

//     const params = new URLSearchParams(window.location.search);

//     if (value) params.set("branch", value);
//     else params.delete("branch");

//     params.delete("page"); // Reset to first page on filter change

//     router.push(`/?${params.toString()}`, { scroll: false });
//   };

//   return (
//     <CustomFilter
//       title="location"
//       value={branch}
//       options={dealerBranches}
//       handleChange={handleChange}
//     />
//   );
// }
/********************* */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomFilter from "./CustomFilter";
import { dealerBranches } from "@/constants";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function BranchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { makeUrl } = useQueryParams();

  const [branch, setBranch] = useState("");

  useEffect(() => {
    setBranch(searchParams.get("branch") || "");
  }, [searchParams]);

  const handleChange = (value: string) => {
    setBranch(value);

    router.push(
      makeUrl({
        branch: value || null, // ✅ set or delete param
        page: null,            // ✅ reset pagination
      }),
      { scroll: false }
    );
  };

  return (
    <CustomFilter
      title="location"
      value={branch}
      options={dealerBranches}
      handleChange={handleChange}
    />
  );
}

