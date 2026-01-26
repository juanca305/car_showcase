// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import CustomFilter from "@/components/CustomFilter";

// export default function SeatsFilter() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   // ✅ Step 2.1: Create state for the selected seat
//   const [seats, setSeats] = useState<string>("");

//   // ✅ Step 2.2: Initialize state from URL on mount
//   useEffect(() => {
//     setSeats(searchParams?.get("seats") || "");
//   }, [searchParams]);

//   // ✅ Step 2.3: Update state and URL when user selects a new value
//   const handleChange = (value: string) => {
//     setSeats(value); // update UI immediately
//     const params = new URLSearchParams(window.location.search);

//     if (value) params.set("seats", value);
//     else params.delete("seats"); // remove filter if empty

//     //router.push(`/?${params.toString()}`);

//     // ❌ scroll: true (default) makes page jump
//     // ✅ scroll: false prevents it
//     router.push(`/?${params.toString()}`, { scroll: false });

//   };

//   return (
//     <CustomFilter
//       title="seats"
//       value={seats} // controlled value from state
//       options={[
//         { title: "Seats", value: "" },
//         { title: "2", value: "2" },
//         { title: "4", value: "4" },
//         { title: "5", value: "5" },
//         { title: "7", value: "7" },
//       ]}
//       handleChange={handleChange} // call when user selects
//     />
//   );
// }
/*********************************** */
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CustomFilter from "@/components/CustomFilter";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function SeatsFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { makeUrl } = useQueryParams();

  const [seats, setSeats] = useState<string>("");

  useEffect(() => {
    setSeats(searchParams.get("seats") || "");
  }, [searchParams]);

  const handleChange = (value: string) => {
    setSeats(value);

    router.push(
      makeUrl({
        seats: value || null, // ✅ set or remove seats param
        page: null,           // ✅ reset pagination on filter change
      }),
      { scroll: false }
    );
  };

  return (
    <CustomFilter
      title="seats"
      value={seats}
      options={[
        { title: "Seats", value: "" },
        { title: "2", value: "2" },
        { title: "4", value: "4" },
        { title: "5", value: "5" },
        { title: "7", value: "7" },
      ]}
      handleChange={handleChange}
    />
  );
}

