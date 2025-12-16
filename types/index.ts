import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface SearchManufacturerProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
}

export interface CarImage {
  angle: "main" | "front" | "rear" | "roof";
  url: string;
}

export interface CarProps {
  _id: string;
  make: string;
  model: string;
  category?: string;
  trim?: string;
  year: number;
  color?: string;
  seats?: number;
  fuelType?: string;
  transmission?: string;
  mileage?: number;
  pricePerDay: number;
  images: CarImage[];
  description?: string;
  features?: string[];
  available: boolean;
  createdAt?: string;
  slug?: string;
}

// export interface FilterProps {
//   make?: string;
//   model?: string;
//   fuelType?: string;
//   transmission?: string;
//   year?: string | number;
//   priceMin?: number;
//   priceMax?: number;
//   page?: number;
//   limit?: number;
// }

export type FuelType = "gasoline" | "diesel" | "electric" | "hybrid" | "other";
export type Transmission = "automatic" | "manual" | "semi-automatic";

export interface FilterProps {
  make?: string;
  model?: string;
  fuelType?: FuelType;
  transmission?: Transmission;
  year?: string | number;
  priceMin?: number;
  priceMax?: number;
  page?: number;
  limit?: number;
  seats?: number;
  category?: string;
  branch?: string;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  value: string;
  options: OptionProps[];
  handleChange?: (value: string) => void; // ✅ callback when selection changes
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}
