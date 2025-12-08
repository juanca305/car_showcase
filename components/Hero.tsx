"use client";

import Image from "next/image"
import CustomButton from "./CustomButton"

const Hero = () => {
  const handleScroll = () => {
    const element = document.getElementById("discover");
    element?.scrollIntoView({ behavior: "smooth" });
  }
  return (

    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          A Smarter Way to Buy Your Next Car
        </h1>

        <p className="hero__subtitle ">
          Explore new and pre-owned vehicles, compare options, estimate payments,
          and start your car-buying journey online.
        </p>

        <CustomButton
          title="Browse Inventory"
          containerStyles="bg-luxury-accent text-white rounded-full mt-10"
          // containerStyles="bg-primary-blue text-white rounded-full mt-10"
          handleClick={handleScroll}
        />

      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image src="/jeep_gray.png" alt="hero" fill className="object-contain" />
        </div>
        <div className="hero__image-overlay" />

      </div>

      {/* <div className="bg-blue-500 text-white p-8">
        Tailwind is working!
      </div> */}
    </div>
  )
}

export default Hero