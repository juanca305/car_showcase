import { CarProps, FilterProps } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchCarsResponse {
  data: CarProps[];
}

export async function fetchCars(filters: FilterProps): Promise<CarProps[]> {
  try {
    // --- Destructure for readability
    const {
      make,
      model,
      fuelType,
      transmission,
      year,
      priceMin,
      priceMax,
      page = 1,
      limit = 12,
    } = filters;

    // --- Build query string dynamically
    const query = new URLSearchParams();

    if (make) query.append("make", encodeURIComponent(make));
    if (model) query.append("model", encodeURIComponent(model));
    if (fuelType) query.append("fuelType", encodeURIComponent(fuelType));
    if (transmission) query.append("transmission", encodeURIComponent(transmission));
    if (year) query.append("year", year.toString());
    if (priceMin) query.append("priceMin", priceMin.toString());
    if (priceMax) query.append("priceMax", priceMax.toString());
    query.append("page", page.toString());
    query.append("limit", limit.toString());

    // --- Log queries for development (optional)
    console.log("Fetching cars with query:", query.toString());

    // --- Fetch from backend
    // const response = await fetch(`http://localhost:5000/api/cars?${query.toString()}`, {
    //   cache: "no-store",
    // });

     const response = await fetch(`${BASE_URL}/api/cars?${query.toString()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch cars: ${response.statusText}`);
    }

    // --- Parse response
    const json: FetchCarsResponse = await response.json();

    if (!json || !Array.isArray(json.data)) {
      console.warn("Unexpected backend response:", json);
      return [];
    }

    // --- Normalize and fill optional fields
    const cars: CarProps[] = json.data.map((car) => ({
      _id: car._id,
      make: car.make,
      model: car.model,
      trim: car.trim || "",
      year: car.year,
      color: car.color || "Unknown",
      seats: car.seats ?? 0,
      fuelType: car.fuelType || "Gasoline",
      transmission: car.transmission || "Manual",
      mileage: car.mileage ?? 0,
      pricePerDay: car.pricePerDay,
      images: Array.isArray(car.images) ? car.images : [],
      description: car.description || "",
      features: Array.isArray(car.features) ? car.features : [],
      available: car.available ?? true,
      createdAt: car.createdAt || "",
      slug: car.slug || "",
    }));

    return cars;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
}

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  
      searchParams.set(type, value);
  
      const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

      return newPathname;
}






