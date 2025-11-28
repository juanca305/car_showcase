'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CustomFilter from "@/components/CustomFilter";

export default function TransmissionFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [transmission, setTransmission] = useState<string>("");

  // Initialize state from URL on mount
  useEffect(() => {
    setTransmission(searchParams?.get("transmission") || "");
  }, [searchParams]);

  // Update state and URL when user selects a new value
  const handleChange = (value: string) => {
    setTransmission(value); // update UI immediately
    const params = new URLSearchParams(window.location.search);

    if (value) params.set("transmission", value);
    else params.delete("transmission"); // remove filter if empty

    //router.push(`/?${params.toString()}`);
    // ❌ scroll: true (default) makes page jump
    // ✅ scroll: false prevents it
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <CustomFilter
      title="transmission"
      value={transmission}
      options={[
        { title: "Transmission", value: "" },
        { title: "Automatic", value: "automatic" },
        { title: "Manual", value: "manual" },
      ]}
      handleChange={handleChange}
    />
  );
}
