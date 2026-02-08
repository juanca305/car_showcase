import { CarProps } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCarById(
  id: string
): Promise<CarProps | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/admin/cars/${id}`,
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY!,
        },
        cache: "no-store", // admin must always be fresh
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch car by id:", res.statusText);
      return null;
    }

    const json = await res.json();

    // Backend returns { data: car }
    if (!json?.data) return null;

    return json.data;
  } catch (error) {
    console.error("Error fetching car by id:", error);
    return null;
  }
}
