
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore, BackToTop, PriceFilter, FuelFilter, SeatsFilter, TransmissionFilter, YearFilter, CategoryFilter } from "@/components";
import BranchFilter from "@/components/BranchFilter";
import ClearFiltersButton from "@/components/ClearFiltersButton";
import ConditionFilter from "@/components/ConditionFilter";
import FiltersPanelWrapper from "@/components/FiltersPanelWrapper";
import RefinementBar from "@/components/RefinementBar";
import ResultsHeader from "@/components/ResultsHeader";
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
  const branch = searchParams?.branch || "";
  const condition = searchParams?.condition || "";
  
  const sort = searchParams?.sort || "";

  // Set the amount of car cards per page ***/
  const limit = Number(searchParams?.limit) || 8;

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
    branch,
    condition,
    sort,
  });

  // 3️⃣ Compute helper booleans
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1;
  const isNext = meta && page < meta.pages; // ✅ only true if another page exists

  return (
    <main className="overflow-visible">
      <Hero />
      <div id="discover" className="
          mt-12
          sm:mt-16
          xl:mt-20
          padding-x
          padding-y
          max-width
          bg-luxury-bg
          border-t
          border-luxury-divider
        "
      >
        <div className="home__text-container">
          <h1 className="section__title">Find Your Next Vehicle</h1>
          <p className="section__subtitle">
            Compare models, features, and pricing — all in one place
          </p>
        </div>

        <div className="home__filters">
          <div
            className="
                w-full
                mt-8
                p-4 
                sm:p-5
                rounded-2xl
                bg-luxury-surface
                border
                border-luxury-border
                shadow-sm
              "
          >
            {/* Top row: Make / Model / Condition */}
            <div
              className="
                flex
                flex-col
                xl:flex-row
                gap-4 
                xl:gap-6
                items-stretch
              "
            >
              {/* Make + Model */}
              <div className="flex-1 flex items-center">
                <SearchBar />
              </div>

              {/* 🔹 Divider (mobile + tablet only) */}
              <div className="block xl:hidden">
                <div className="my-2 h-px bg-luxury-border/60" />
              </div>

              {/* Condition */}
              <div
                className="
                  xl:w-[260px]
                  flex
                  items-center
                  justify-center
                "
              > 
                <ConditionFilter />
              </div>
            </div>
          </div>

          {/* Secondary filters panel */}
          <div className="w-full block mt-4">
            <FiltersPanelWrapper />
          </div>
        </div>

        {/* Clear Filters Button */}
        {/* <div className="flex justify-end mt-4">
          <ClearFiltersButton />
        </div> */}

        {!isDataEmpty ? (
          <section>    
            <ResultsHeader total={meta.total} />
            <RefinementBar />
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



