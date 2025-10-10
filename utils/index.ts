import { CarProps } from "@/types";

interface FetchCarsResponse {
  data: CarProps[];
}

export async function fetchCars(): Promise<CarProps[]> {
  try {
    const response = await fetch("http://localhost:5000/api/cars", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch cars: ${response.statusText}`);
    }

    const json: FetchCarsResponse = await response.json();

    if (!json.data || !Array.isArray(json.data)) {
      throw new Error("Invalid data format from backend");
    }

    return json.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
}






