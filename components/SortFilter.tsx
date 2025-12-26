"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CustomFilter from "@/components/CustomFilter";

export default function SortFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sort, setSort] = useState<string>("");

  // Initialize from URL
  useEffect(() => {
    setSort(searchParams.get("sort") || "");
  }, [searchParams]);

  const handleChange = (value: string) => {
    setSort(value);

    const params = new URLSearchParams(window.location.search);

    if (value) params.set("sort", value);
    else params.delete("sort");

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <CustomFilter
      title="sort"
      value={sort}
      options={[
        { title: "Sort by", value: "" },
        { title: "Price: Low → High", value: "price-asc" },
        { title: "Price: High → Low", value: "price-desc" },
        { title: "Year: Oldest → Newest", value: "year-asc" },
        { title: "Year: Newest → Oldest", value: "year-desc" },
      ]}
      handleChange={handleChange}
    />
  );
}
