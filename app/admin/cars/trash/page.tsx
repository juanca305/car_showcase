import { fetchCars } from "@/utils";
import AdminCarTable from "../../components/AdminCarTable";

export default async function TrashCarsPage() {
  const { data: cars } = await fetchCars({
    includeDeleted: true, // include deleted + active
    page: 1,
    limit: 50,
  });

  // ✅ keep only deleted cars on this page
  const deletedCars = cars.filter((c: any) => c.isDeleted);

  return (
    <main className="pt-[96px]">
      <section className="max-width padding-x padding-y">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Trash</h1>

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
      </section>
    </main>
  );
}
