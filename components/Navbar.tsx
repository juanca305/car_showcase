import Link from "next/link";
import Image from "next/image";

import CustomButton from "./CustomButton";

const Navbar = () => {
  return (
    // <header className="w-full absolute z-10">
    <header className="
        w-full
        absolute
        top-0
        z-10
        bg-luxury-bg/70
        backdrop-blur-md
        border-b
        border-luxury-border
      ">
      {/* <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4"> */}

      <nav className="max-w-[1440px] mx-auto flex justify-between items-center px-4 sm:px-16 py-3 sm:py-4">

        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          {/* Icon */}
          <Image
            src="/logo-icon.svg"
            alt="Car Hub icon"
            width={48}
            height={30}
            priority
            className="
      text-luxury-text
      w-[38px] h-auto
      sm:w-[48px]
    "
          />

          {/* Text */}
          <span
            className="
              text-luxury-text
              font-semibold
              tracking-[0.22em]
              text-[16px]
              sm:text-[22px]
              leading-none
              whitespace-nowrap
            "
          >
            JUANCA MOTORS
          </span>
        </Link>

        <CustomButton
          title="Sign In"
          btnType="button"
          containerStyles="
            min-w-[110px]
            sm:min-w-[130px]
            rounded-full
            bg-luxury-surface
            text-luxury-text
            border border-luxury-border
            hover:bg-luxury-accent
            hover:text-white
            transition
          "
        />
      </nav>
    </header>
  )
}

export default Navbar