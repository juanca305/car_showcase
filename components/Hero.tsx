"use client";

import CustomButton from "./CustomButton";

const Hero = () => {
  const handleScroll = () => {
    const element = document.getElementById("discover");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="
        relative w-full
        h-[52vh] sm:h-[64vh] md:h-[68vh] lg:h-[90vh]
        flex items-start lg:items-center pt-[90px] lg:pt-0

        bg-[url('/chevy-hero.png')]
        bg-cover
        bg-[position:80%_center]
        sm:bg-[position:85%_center]
        lg:bg-[position:88%_center]
      "
    >
      {/* Gradient overlay (ALL devices) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-[1440px] mx-auto padding-x">
          <div className="max-w-md sm:max-w-lg lg:max-w-xl">
            <h1 className="
              hero-title--lux-white
              text-[26px] sm:text-[38px] md:text-[44px] lg:text-[56px] xl:text-[64px]
              leading-tight
            ">
              A Smarter Way to
              <span className="lux-highlight block">
                Buy Your Next Car
              </span>
            </h1>
            <p className="
              hero__subtitle
              mt-5 sm:mt-5 lg:mt-6
              text-[13px] sm:text-[16px] md:text-[17px] lg:text-[20px]
              max-w-sm sm:max-w-md md:max-w-md lg:max-w-lg
            ">
              Explore new and pre-owned vehicles, compare options, estimate payments,
              and start your car-buying journey online.
            </p>

            <CustomButton
              title="Browse Inventory"
              containerStyles="
                bg-luxury-accent
                text-black font-semibold
                rounded-full
                mt-6
                px-5 py-2.5
                text-sm sm:text-base
              "
              handleClick={handleScroll}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
