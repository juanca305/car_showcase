"use client";

import { useState, useEffect, Fragment } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import Image from "next/image";

import { fetchCarMakes } from "@/utils/fetchCarMakes";

interface SearchMakeProps {
  make: string;
  setMake: (make: string) => void;
}

const SearchManufacturer = ({ make, setMake }: SearchMakeProps) => {
  const [query, setQuery] = useState("");
  const [makes, setMakes] = useState<string[]>([]);

  useEffect(() => {
    const loadMakes = async () => {
      const data = await fetchCarMakes();
      setMakes(data);
      console.log("Loaded makes:", makes);
    };
    loadMakes();
  }, []);


  const filteredMakes =
    query === ""
      ? makes
      : makes.filter((item) =>
        item.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
      );

  return (
    <div className="search-manufacturer">
      <Combobox value={make} onChange={setMake}>
        <div className="relative w-full">
          <ComboboxButton className="absolute top-[14px]">
            <Image src="/car-logo.svg" width={20} height={20} className="ml-4" alt="Car Logo" />
          </ComboboxButton>
          <ComboboxInput
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(make: string) => make}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <ComboboxOptions>
              {filteredMakes.map((item) => (
                <ComboboxOption
                  key={item}
                  value={item}
                  className={({ active, selected }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-primary-blue text-white" : "text-gray-900"
                    } ${selected ? "font-medium" : "font-normal"}`
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span className="block truncate">{item}</span>
                      {selected && (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"
                            }`}
                        >
                          ✔
                        </span>
                      )}
                    </>
                  )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;



