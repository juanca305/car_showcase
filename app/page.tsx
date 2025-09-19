import { Hero } from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <h1 className="text-4xl font-bold text-red-500">
      Tailwind is finally working!
    </h1>
      <Hero />
    </main>
  );
}
