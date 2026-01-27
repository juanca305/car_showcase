// import { fetchCars } from "@/utils";
// import AdminCarTable from "../components/AdminCarTable";

// export default async function AdminCarsPage() {
//   // For now we reuse fetchCars
//   // Later we can create a dedicated admin fetch
//   const { data: cars } = await fetchCars({
//     includeDeleted: true,
//     page: 1,
//     limit: 50,
//   });

//   console.log("ADMIN CARS FROM SERVER:", cars);

//   return (
//     <main className="pt-[96px]">
//       <section className="max-width padding-x padding-y">
//         {/* HEADER */}
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold text-white">
//             Cars Inventory
//           </h1>

//           <a
//             href="/admin/cars/new"
//             className="
//               px-5 py-2
//               rounded-full
//               bg-luxury-accent
//               text-black
//               font-semibold
//               hover:bg-luxury-accentHover
//               transition
//             "
//           >
//             + Add Car
//           </a>
//         </div>

//         {/* TABLE */}
//         <AdminCarTable cars={cars} />
//       </section>
//     </main>
//   );
// }
/************************* */
// import { fetchCars } from "@/utils";
// import AdminCarTable from "../components/AdminCarTable";

// export default async function AdminCarsPage() {

//   // const { data: cars } = await fetchCars({
//   //   includeDeleted: false, // ✅ only active
//   //   page: 1,
//   //   limit: 50,
//   // });

//   const { data: cars, meta } = await fetchCars({
//     onlyActive: true,
//     includeHidden: true,
//     page: 1,
//     limit: 50,
//   });

//   return (
//     <main className="pt-[96px]">
//       <section className="max-width padding-x padding-y">
//         <div className="flex items-center justify-between mb-6">

//           <h1 className="text-2xl font-bold text-white">Cars Inventory</h1>
//           <p className="text-md text-luxury-muted mt-1">
//             Active cars:{" "}
//             <span className="text-white font-semibold">
//               {meta.total ?? cars.length}
//             </span>
//           </p>
//           <div className="flex items-center gap-3">
//             <a
//               href="/admin/cars/trash"
//               className="
//                 px-5 py-2 rounded-full
//                 border border-white/10
//                 text-white
//                 hover:bg-white/5 transition
//               "
//             >
//               Trash
//             </a>

//             <a
//               href="/admin/cars/new"
//               className="
//                 px-5 py-2
//                 rounded-full
//                 bg-luxury-accent
//                 text-black
//                 font-semibold
//                 hover:bg-luxury-accentHover
//                 transition
//               "
//             >
//               + Add Car
//             </a>
//           </div>
//         </div>

//         <AdminCarTable cars={cars} mode="active" />
//       </section>
//     </main>
//   );
// }
/************************** */

import { fetchCars } from "@/utils";
import AdminCarTable from "../components/AdminCarTable";
import Pagination from "../../../components/Pagination";
import AdminFiltersPanelWrapper from "../components/AdminFiltersPanelWrapper";

// Import or define SortOption type
import type { SortOption } from "@/types"; // Adjust the path if needed

export default async function AdminCarsPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    limit?: string;

    make?: string;
    model?: string;
    condition?: string;
    branch?: string;
    sort?: string;
    transmission?: string;

    yearMin?: string;
    yearMax?: string;

    mileageMin?: string;
    mileageMax?: string;
  };
}) {
  const page = Number(searchParams.page || 1);
  const limit = Number(searchParams.limit || 10);

  const { data: cars, meta } = await fetchCars({
    onlyActive: true,
    includeHidden: true, // ✅ admin sees hidden too
    page,
    limit,

    // ✅ admin filters (optional)
    make: searchParams.make || "",
    model: searchParams.model || "",
    condition: searchParams.condition || "",
    branch: searchParams.branch || "",
    transmission: searchParams.transmission as any || undefined,
    sort: searchParams.sort as SortOption || undefined,

    yearMin: searchParams.yearMin ? Number(searchParams.yearMin) : undefined,
    yearMax: searchParams.yearMax ? Number(searchParams.yearMax) : undefined,

    mileageMin: searchParams.mileageMin ? Number(searchParams.mileageMin) : undefined,
    mileageMax: searchParams.mileageMax ? Number(searchParams.mileageMax) : undefined,
  });

  return (
    <main className="pt-[96px]">
      <section className="max-width padding-x padding-y">
        {/* HEADER */}
        <div className="mb-6">
          <div
            className="
                flex flex-col gap-4
                md:flex-row md:items-center md:justify-between
              "
          >
            {/* Left: title + stats */}
            <div>
              <h1 className="text-2xl font-bold text-white">Cars Inventory</h1>

              <p className="text-sm text-luxury-muted mt-1">
                Active cars:{" "}
                <span className="text-white font-semibold">
                  {meta.total ?? cars.length}
                </span>
              </p>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-3">
              <a
                href="/admin/cars/trash"
                className="
                px-4 py-2 rounded-xl text-sm font-medium
                border border-red-500/30
                bg-red-500/10 text-red-300
                hover:bg-red-500/15 transition
              "
              >
                Trash
              </a>

              <a
                href="/admin/cars/new"
                className="
          px-4 py-2 rounded-full
          bg-luxury-accent
          text-black text-sm font-semibold
          hover:bg-luxury-accentHover transition
        "
              >
                + Add Car
              </a>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <AdminFiltersPanelWrapper />
        {/* <AdminCarsFilters /> */}

        {/* TABLE */}
        <AdminCarTable cars={cars} mode="active" />

        {/* PAGINATION */}
        <Pagination page={meta.page} pages={meta.pages} />
      </section>
    </main>
  );
}

/*************************************** */
/***THIS VERSION WORKS**** */
/******************************************** */
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// import { fetchCars } from "@/utils";
// import AdminCarTable from "../components/AdminCarTable";
// import Pagination from "../../../components/Pagination";

// export default async function AdminCarsPage({
//   searchParams,
// }: {
//   // searchParams: { page?: string };
//   searchParams: {
//     page?: string;
//     limit?: string;

//     make?: string;
//     model?: string;
//     condition?: string;
//     branch?: string;
//     sort?: string;
//   };
// }) {
//   const page = Number(searchParams.page || 1);

//   const { data: cars, meta } = await fetchCars({
//     onlyActive: true,
//     includeHidden: true, // ✅ so admin sees hidden cars too
//     page,
//     limit: 10, // ✅ you can adjust, 10 is good for admin tables
//   });

//   return (
//     <main className="pt-[96px]">
//       <section className="max-width padding-x padding-y">
//         {/* HEADER */}
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-white">Cars Inventory</h1>
//             <p className="text-sm text-luxury-muted mt-1">
//               Active cars:{" "}
//               <span className="text-white font-semibold">
//                 {meta.total ?? cars.length}
//               </span>
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <a
//               href="/admin/cars/trash"
//               className="
//                 px-5 py-2 rounded-full
//                 border border-white/10
//                 text-white
//                 hover:bg-white/5 transition
//               "
//             >
//               Trash
//             </a>

//             <a
//               href="/admin/cars/new"
//               className="
//                 px-5 py-2 rounded-full
//                 bg-luxury-accent
//                 text-black
//                 font-semibold
//                 hover:bg-luxury-accentHover
//                 transition
//               "
//             >
//               + Add Car
//             </a>
//           </div>
//         </div>

//         {/* TABLE */}
//         {/* <AdminCarTable cars={cars} mode="active" /> */}
//         <AdminCarTable key={meta.page} cars={cars} mode="active" />

//         {/* ✅ PAGINATION */}
//         <Pagination
//           page={meta.page}
//           pages={meta.pages}
//           // basePath="/admin/cars"
//         />
//       </section>
//     </main>
//   );
// }
