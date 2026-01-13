"use client";

import { useRouter } from "next/navigation";
import { CarProps } from "@/types";
import Link from "next/link";

interface AdminCarTableProps {
  cars: CarProps[];
  mode?: "active" | "trash";
}

export default function AdminCarTable({
  cars,
  mode = "active",
}: AdminCarTableProps) {
  const router = useRouter();

  async function handleDelete(id: string) {
    const confirm = window.confirm("Are you sure you want to delete this car?");

    if (!confirm) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/${id}`, {
      method: "DELETE",
    });

    router.refresh();
  }

  async function handleRestore(id: string) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/${id}/restore`, {
      method: "PUT",
    });

    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-luxury-border bg-luxury-surface/80 overflow-hidden">
      {/* TABLE HEADER */}
      <div className="px-6 py-4 border-b border-luxury-border">
        <h2 className="text-lg font-semibold text-luxury-text">
          Inventory Cars
        </h2>
        <p className="text-sm text-luxury-muted">
          Manage vehicles, pricing, and availability
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-black/30 text-luxury-muted">
            <tr>
              <th className="px-6 py-3 text-left">Vehicle</th>
              <th className="px-6 py-3 text-left">Condition</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {cars.map((car) => (
              <tr key={car._id} className="hover:bg-white/5 transition">
                {/* VEHICLE */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="relative h-14 w-14 rounded-lg overflow-hidden border border-white/10 bg-black/20">
                      {car.images?.[0]?.url ? (
                        <img
                          src={car.images[0].url}
                          alt={`${car.make} ${car.model}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-xs text-luxury-muted">
                          No image
                        </div>
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex flex-col">
                      <span className="font-medium text-luxury-text">
                        {car.make} {car.model}
                      </span>
                      <span className="text-xs text-luxury-muted">
                        {car.year}
                      </span>
                    </div>
                  </div>
                </td>

                {/* CONDITION */}
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium
                      ${
                        car.condition === "new"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-blue-500/15 text-blue-400"
                      }`}
                  >
                    {car.condition === "new" ? "New" : "Used"}
                  </span>

                  {car.certified && (
                    <span className="ml-2 px-2 py-1 rounded-md text-xs font-medium bg-luxury-accent/15 text-luxury-accent">
                      Certified
                    </span>
                  )}
                </td>

                {/* PRICE */}
                <td className="px-6 py-4 text-luxury-text font-semibold">
                  ${car.price?.toLocaleString() || "—"}
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-2 text-xs font-medium
                      ${car.available ? "text-emerald-400" : "text-red-400"}`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full
                        ${car.available ? "bg-emerald-400" : "bg-red-400"}`}
                    />
                    {car.available ? "Visible" : "Hidden"}
                  </span>
                </td>

                {/* ACTIONS (single column) */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-4">
                    {/* links */}
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/cars/${car._id}/edit`}
                        className="text-sm text-luxury-accent hover:underline"
                      >
                        Edit
                      </Link>

                      <Link
                        href={`/admin/cars/${car._id}/images`}
                        className="text-sm text-luxury-muted hover:text-luxury-text"
                      >
                        Images
                      </Link>
                    </div>

                    {/* divider */}
                    <span className="h-5 w-px bg-white/10" />

                    {/* delete/restore */}
                    {/* {car.isDeleted ? (
                      <button
                        onClick={() => handleRestore(car._id)}
                        className="
                          px-3 py-1.5 rounded-md text-xs font-medium
                          text-emerald-400 border border-emerald-400/30
                          hover:bg-emerald-400/10 transition
                        "
                      >
                        Restore
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDelete(car._id)}
                        className="
                        px-3 py-1.5 rounded-md text-xs font-medium
                        text-red-400 border border-red-400/30
                        hover:bg-red-400/10 transition
                      "
                      >
                        Delete
                      </button>
                    )} */}

                    {/* delete/restore */}
                    {mode === "trash" ? (
                      <button
                        onClick={() => handleRestore(car._id)}
                        className="
                          px-3 py-1.5 rounded-md text-xs font-medium
                          text-emerald-400 border border-emerald-400/30
                          hover:bg-emerald-400/10 transition
                        "
                      >
                        Restore
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDelete(car._id)}
                        className="
                          px-3 py-1.5 rounded-md text-xs font-medium
                          text-red-400 border border-red-400/30
                          hover:bg-red-400/10 transition
                        "
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
