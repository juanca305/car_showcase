import { fetchCars } from "@/utils";
import AdminCarTable from "../../components/AdminCarTable";

export default async function TrashCarsPage() {
    
    const { data: deletedCars, meta } = await fetchCars({
        onlyDeleted: true, // ✅ backend does the filtering now
        page: 1,
        limit: 50,
    });

    return (
        <main className="pt-[96px]">
            <section className="max-width padding-x padding-y">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-white">Trash</h1>
                    <p className="text-md text-luxury-muted mt-1">
                        Deleted cars:{" "}
                        <span className="text-white font-semibold">
                            {meta?.total ?? deletedCars.length}
                        </span>
                    </p>
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
