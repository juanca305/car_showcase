'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CustomFilter from "@/components/CustomFilter";
import { fuels } from "@/constants";

export default function FuelFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [fuelType, setFuelType] = useState<string>("");

  useEffect(() => {
    setFuelType(searchParams?.get("fuelType") || "");
  }, [searchParams]);

  const handleChange = (value: string) => {
    setFuelType(value); // update UI immediately
    const params = new URLSearchParams(window.location.search);

    if (value) params.set("fuelType", value);
    else params.delete("fuelType"); // remove filter if empty
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <CustomFilter
      title="fuelType"
      value={fuelType}
      options={fuels} // your fuels array from constants
      handleChange={handleChange}
    />
  );
}
