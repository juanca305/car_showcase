import { fetchCars } from "@/utils";
import AdminCarTable from "../../components/AdminCarTable";
import Pagination from "../../../../components/Pagination";

export default async function TrashCarsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page || 1); // ✅ CHANGE
  const limit = 2; // ✅ CHANGE (same as Active)

  const { data: deletedCars, meta } = await fetchCars({
    onlyDeleted: true,
    page, // ✅ CHANGE (instead of hardcoded 1)
    limit, // ✅ CHANGE (instead of 50)
  });

  return (
    <main className="pt-[96px]">
      <section className="max-width padding-x padding-y">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Trash</h1>
            <p className="text-md text-luxury-muted mt-1">
              Deleted cars:{" "}
              <span className="text-white font-semibold">
                {meta?.total ?? deletedCars.length}
              </span>
            </p>
          </div>

          <a
            href="/admin/cars"
            className="
              px-5 py-2 rounded-full
              border border-white/10
              text-white
              hover:bg-white/5 transition
            "
          >
            Back to Inventory
          </a>
        </div>

        <AdminCarTable cars={deletedCars} mode="trash" />

        {/* ✅ PAGINATION */}
        <Pagination
          page={meta.page}
          pages={meta.pages}
          basePath="/admin/cars/trash"
        />
      </section>
    </main>
  );
}
