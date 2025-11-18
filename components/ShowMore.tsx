"use client";

import { ShowMoreProps } from "@/types";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import CustomButton from "./CustomButton";

// Using useSearchParams() instead of window.location
// Works even in environments where window is not ready
// Consistent with Next 13/14 navigation API

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNavigation = () => {
    const params = new URLSearchParams(searchParams.toString());
    const current = Number(params.get("page") || pageNumber || 1);
    const nextPage = current + 1;

    params.set("page", String(nextPage));

    router.push(`${pathname}?${params.toString()}`);
  };

  if (!isNext) return null;

  return (
    <div className="w-full flex-center gap-5 mt-10">
      <CustomButton
        title="Show More"
        btnType="button"
        containerStyles="bg-primary-blue rounded-full text-white"
        handleClick={handleNavigation}
      />
    </div>
  );
};

export default ShowMore;

//****************************************************************** */
// "use client";

// import { ShowMoreProps } from "@/types";
// import { useRouter } from "next/navigation";
// import CustomButton from "./CustomButton";

// const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
//   const router = useRouter();

//   const handleNavigation = () => {
//     try {
//       // read current querystring
//       const searchParams = new URLSearchParams(window.location.search);

//       // increment page
//       const current = Number(searchParams.get("page") || pageNumber || 1);
//       const nextPage = current + 1;

//       searchParams.set("page", String(nextPage));

//       // keep other params and navigate
//       const newPath = `${window.location.pathname}?${searchParams.toString()}`;
//       router.push(newPath);
//     } catch (err) {
//       console.error("ShowMore navigation error:", err);
//     }
//   };

//   // Show the button only when 'isNext' === true
//   if (!isNext) return null;

//   return (
//     <div className="w-full flex-center gap-5 mt-10">
//       <CustomButton
//         title="Show More"
//         btnType="button"
//         containerStyles="bg-primary-blue rounded-full text-white"
//         handleClick={handleNavigation}
//       />
//     </div>
//   );
// };

// export default ShowMore;
