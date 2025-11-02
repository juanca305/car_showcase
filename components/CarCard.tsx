"use client";

import Image from "next/image";
import { useState } from "react";
import { CarProps } from "@/types";
import CarDetails from "./CarDetails";
import CustomButton from './CustomButton';

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Obtener imagen principal
  //const mainImage = car.images.find(img => img.angle === "main")?.url || "/hero.png";

  const mainImage =
  car.images?.find(img => img.angle === "main")?.url ??
  car.images?.[0]?.url ??
  "/hero.png";

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">{car.make} {car.model}</h2>
      </div>

      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {car.pricePerDay}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>

      {/* Imagen principal */}
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={mainImage}
          alt={`${car.make} ${car.model}`}
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Características */}
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col items-center gap-2">
            <Image src="/steering-wheel.svg" width={20} height={20} alt="transmission" />
            <p className="text-[14px]">{car.transmission || "Manual"}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image src="/tire.svg" width={20} height={20} alt="tires" />
            <p className="text-[14px]">FWD</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image src="/gas.svg" width={20} height={20} alt="fuel" />
            <p className="text-[14px]">{car.fuelType || "Gasoline"}</p>
          </div>
        </div>

        {/* Botón */}
        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      {/* Modal */}
      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  );
};

export default CarCard;


