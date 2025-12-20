// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { CarProps } from "@/types";
// import CarDetails from "./CarDetails";
// import CustomButton from './CustomButton';

// interface CarCardProps {
//   car: CarProps;
// }

// const CarCard = ({ car }: CarCardProps) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const isCertified =
//     car.condition?.toLowerCase() === "used" && car.certified === true;


//   // Getting the main image

//   const mainImage =
//     car.images?.find(img => img.angle === "main")?.url ??
//     car.images?.[0]?.url ??
//     "/hero.png";

//   return (
//     <div className="car-card group">
//       {/* <div className="car-card__content">
//         <h2 className="car-card__content-title">{car.make} {car.model}</h2>
//       </div> */}

//       <div className="car-card__content flex items-center justify-between gap-2">
//         <h2 className="car-card__content-title">
//           {car.make} {car.model}
//         </h2>

//         {isCertified && (
//           <span
//             className="
//               inline-flex
//               items-center
//               px-2.5
//               py-1
//               text-[11px]
//               font-semibold
//               tracking-wide
//               rounded-full
//               border
//               border-luxury-border
//               bg-luxury-accent/15
//               text-luxury-text
//               whitespace-nowrap
//             "
//           >
//             Certified
//           </span>
//         )}
//       </div>


//       <p className="flex mt-6 text-[32px] font-extrabold">
//         <span className="self-start text-[14px] font-semibold">$</span>
//         {car.pricePerDay}
//         <span className="self-end text-[14px] font-medium">/day</span>
//       </p>

//       {/* Main image */}
//       <div className="relative w-full aspect-[4/3] my-2 sm:my-3  rounded-lg overflow-hidden bg-gray-100">
//         {/* Shimmer placeholder */}
//         {/* Loading shimmer (appears under the image while loading) */}
//         <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 z-10" />

//         <Image
//           src={mainImage}
//           alt={`${car.make} ${car.model}`}
//           fill
//           priority
//           className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.015] p-[4px] z-20"
//         />
//       </div>

//       <div className="relative flex w-full mt-2">
//         <div className="flex group-hover:invisible w-full justify-between text-gray">
//           <div className="flex flex-col items-center gap-2">
//             <Image src="/steering-wheel.svg" width={20} height={20} alt="transmission" />
//             <p className="text-[14px]">{car.transmission || "Manual"}</p>
//           </div>
//           <div className="flex flex-col items-center gap-2">
//             <Image src="/tire.svg" width={20} height={20} alt="tires" />
//             <p className="text-[14px]">FWD</p>
//           </div>
//           <div className="flex flex-col items-center gap-2">
//             <Image src="/gas.svg" width={20} height={20} alt="fuel" />
//             <p className="text-[14px]">{car.fuelType || "Gasoline"}</p>
//           </div>
//         </div>

//         <div className="car-card__btn-container">
//           <CustomButton
//             title="View More"
//             containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
//             textStyles="text-white text-[14px] leading-[17px] font-bold"
//             rightIcon="/right-arrow.svg"
//             handleClick={() => setIsOpen(true)}
//           />
//         </div>
//       </div>

//       {/* Modal */}
//       <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
//     </div>
//   );
// };

// export default CarCard;

//*************************************************** */

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

  const isCertified =
    car.condition?.toLowerCase() === "used" && car.certified === true;


  // Getting the main image

  const mainImage =
    car.images?.find(img => img.angle === "main")?.url ??
    car.images?.[0]?.url ??
    "/hero.png";

  return (
    <div className="car-card-dark group">
      {/* <div className="car-card__content">
        <h2 className="car-card__content-title">{car.make} {car.model}</h2>
      </div> */}

      <div className="car-card-dark__content flex items-center justify-between gap-2">
        <h2 className="car-card-dark__title">
          {car.make} {car.model}
        </h2>

        {isCertified && (
          <span
            className="
              certified-badge
              inline-flex
              items-center
              px-2.5
              py-1
              text-[11px]
              font-semibold
              tracking-wide
              rounded-full
              border
              border-luxury-border
              bg-luxury-accent/15
              text-luxury-text
              whitespace-nowrap
            "
          >
            Certified
          </span>
        )}
      </div>


      {/* <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {car.pricePerDay}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p> */}

      <p className="car-card-dark__price">
        <span className="car-card-dark__price-dollar">$</span>
        {car.pricePerDay}
        <span className="car-card-dark__price-day">/day</span>
      </p>


      {/* Main image */}
      {/* <div className="relative w-full aspect-[4/3] my-2 sm:my-3  rounded-lg overflow-hidden bg-gray-100"> */}
      <div className="car-card-dark__media">

        {/* Shimmer placeholder */}
        {/* Loading shimmer (appears under the image while loading) */}
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 z-10" />

        <Image
          src={mainImage}
          alt={`${car.make} ${car.model}`}
          fill
          priority
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.015] p-[4px] z-20"
        />
      </div>

      <div className="relative flex w-full mt-2">

        {/* <div className="flex group-hover:invisible w-full justify-between text-gray"> */}
        <div className="car-card-dark__specs group-hover:invisible">

          {/* <div className="flex flex-col items-center gap-2"> */}
          <div className="car-card-dark__spec">
            <Image src="/steering-wheel.svg" width={20} height={20} alt="transmission" />
            <p className="text-[14px]">{car.transmission || "Manual"}</p>
          </div>

          {/* <div className="flex flex-col items-center gap-2"> */}
          <div className="car-card-dark__spec">
            <Image src="/tire.svg" width={20} height={20} alt="tires" />
            <p className="text-[14px]">FWD</p>
          </div>

          {/* <div className="flex flex-col items-center gap-2"> */}
          <div className="car-card-dark__spec">
            <Image src="/gas.svg" width={20} height={20} alt="fuel" />
            <p className="text-[14px]">{car.fuelType || "Gasoline"}</p>
          </div>
        </div>

        <div className="car-card-dark__btn-container">
          {/* <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          /> */}
          <CustomButton
            title="View More"
            containerStyles="
              w-[90%]
              py-[14px]
              rounded-full
              bg-luxury-accent
              hover:bg-luxury-accentHover
              transition
            "
            textStyles="text-black text-[14px] font-semibold"
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


