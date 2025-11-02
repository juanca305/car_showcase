import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";
import { fetchCars } from "@/utils";

export default async function Home({ searchParams }: { searchParams: any }) {
  // Extract filters with defaults
  const make = searchParams?.make || "";
  const model = searchParams?.model || "";
  const fuelType = searchParams?.fuelType || "";
  const transmission = searchParams?.transmission || "";
  const year = searchParams?.year || "";
  const priceMin = searchParams?.priceMin || "";
  const priceMax = searchParams?.priceMax || "";
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 12;

  // Fetch filtered cars
  const allCars = await fetchCars({
    make,
    model,
    fuelType,
    transmission,
    year,
    priceMin,
    priceMax,
    page,
    limit,
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1;

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
            <CustomFilter title="fuel" />
            <CustomFilter title="year" />
            {/* Future filters */}
            {/* <CustomFilter title="transmission" /> */}
            {/* <CustomFilter title="price range" /> */}
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars.map((car, index) => (
                <CarCard key={car._id || index} car={car} />
              ))}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Ooops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}

