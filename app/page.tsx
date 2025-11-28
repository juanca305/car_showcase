
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore, BackToTop, PriceFilter, FuelFilter, SeatsFilter, TransmissionFilter, YearFilter, CategoryFilter } from "@/components";
import ClearFiltersButton from "@/components/ClearFiltersButton";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";

import { useRouter } from 'next/navigation';

export default async function Home({ searchParams }: { searchParams: any }) {
  // 1️⃣ Extract filters with defaults
  const make = searchParams?.make || "";
  const model = searchParams?.model || "";
  const category = searchParams?.category || "";
  const fuelType = searchParams?.fuelType || "";
  const transmission = searchParams?.transmission || "";
  const year = searchParams?.year || "";
  const seats = searchParams?.seats || "";
  const priceMin = searchParams?.priceMin || "";
  const priceMax = searchParams?.priceMax || "";
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 3;

  // 2️⃣ Fetch filtered cars (now destructure data + meta)
  const { data: allCars, meta } = await fetchCars({
    make,
    model,
    fuelType,
    transmission,
    year,
    seats,
    priceMin,
    priceMax,
    page,
    limit,
    category,
  });

  // 3️⃣ Compute helper booleans
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1;
  const isNext = meta && page < meta.pages; // ✅ only true if another page exists

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CategoryFilter />
            <SeatsFilter /> {/* fully client controlled */}
            <FuelFilter />
            <TransmissionFilter />
            <YearFilter />
            <PriceFilter />
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="flex justify-end mt-4">
          <ClearFiltersButton />
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars.map((car, index) => (
                <CarCard key={car._id || index} car={car} />
              ))}
            </div>

            {/* ✅ Updated ShowMore with true pagination logic */}
            <ShowMore
              pageNumber={page}
              isNext={isNext}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Ooops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
      <BackToTop />
    </main>
  );
}



