export async function fetchCarMakes(): Promise<string[]> {
  try {
    const res = await fetch("http://localhost:5000/api/cars/makes/distinct", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch makes");
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    console.error(err);
    return [];
  }
}
