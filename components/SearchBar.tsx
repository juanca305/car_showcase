"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import SearchManufacturer from "./SearchManufacturer";
import CategoryFilter from "./CategoryFilter";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 'make' comes from the combobox selection (discrete)
  const [make, setMake] = useState("");
  // model is the local UI text while typing/selecting — we do NOT push it to URL on every keystroke
  const [model, setModel] = useState("");
  const [modelOptions, setModelOptions] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [loadingModels, setLoadingModels] = useState(false);


  const dropdownRef = useRef<HTMLDivElement>(null);

  // Keep UI in sync with URL on mount / when user navigates externally
  useEffect(() => {
    setMake(searchParams.get("make") || "");
    setModel(searchParams.get("model") || "");
  }, [searchParams]);

  // When make changes (selection from SearchManufacturer), fetch models and update URL for make.
  // IMPORTANT: leave model alone (we only update model in URL when user selects a model).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (make) {
      params.set("make", make.toLowerCase());
    } else {
      params.delete("make");
      // If make is cleared, also clear local model (and remove model from url)
      setModel("");
      params.delete("model");
    }

    // replace so we don't create history entries on each make change
    // router.replace(`/?${params.toString()}`);
    router.replace(`/?${params.toString()}`, { scroll: false });

  }, [make, router]);

  // Fetch model options only when make changes (discrete)

  useEffect(() => {
    if (!make) {
      setModelOptions([]);
      return;
    }

    const fetchModels = async () => {
      setLoadingModels(true); // start loading
      try {
        // call your backend endpoint (use host appropriate in prod)
        const res = await fetch(
          `http://localhost:5000/api/cars/models/distinct?make=${encodeURIComponent(make)}`
        );
        if (!res.ok) throw new Error("Failed to fetch models");
        const data = await res.json();
        setModelOptions(data.data || []);
      } catch (err) {
        console.error("Failed to fetch models:", err);
        setModelOptions([]);
      } finally {
        setLoadingModels(false); // done loading
      }
    };
    fetchModels();
  }, [make]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---- Local typing: no router updates here (prevents scroll on each key) ----
  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModel(e.target.value);
    setDropdownOpen(true);
    setHighlightedIndex(-1);
  };

  // When user confirms model (click or Enter), write it to the URL once
  const submitModelToUrl = (selectedModel: string | "") => {
    setModel(selectedModel);
    setDropdownOpen(false);

    const params = new URLSearchParams(window.location.search);

    if (selectedModel) params.set("model", selectedModel.toLowerCase());
    else params.delete("model");

    // Keep make value if present (it's already in URL from the make effect).
    // Use replace to avoid polluting history.

    //router.replace(`/?${params.toString()}`);
    router.replace(`/?${params.toString()}`, { scroll: false });

  };

  const handleSelectModel = (value: string) => {
    submitModelToUrl(value);
  };

  // Keyboard navigation (Arrow up/down + Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownOpen || modelOptions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < modelOptions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : modelOptions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        submitModelToUrl(modelOptions[highlightedIndex]);
      } else {
        // if no highlight, treat Enter as explicit submit of what user typed
        submitModelToUrl(model);
      }
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
    }
  };

  const filteredModels = modelOptions.filter((m) =>
    m.toLowerCase().includes(model.toLowerCase())
  );

  return (
    // <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full items-center">
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full items-center">

      {/* Manufacturer */}
      <div className="relative w-full sm:w-[250px]">
        <SearchManufacturer make={make} setMake={setMake} />
      </div>

      {/* Model */}
      <div className="relative w-full sm:w-[250px]" ref={dropdownRef}>
        <Image src="/model-icon.png" width={22} height={22} alt="model icon" className="absolute left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Model (Optional)"
          value={model}
          onChange={handleModelChange}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 py-2 border rounded-lg shadow-sm outline-none text-gray-900 placeholder-gray-500"
          onFocus={() => setDropdownOpen(true)}
        />

        {/* Dropdown */}
        {dropdownOpen && filteredModels.length > 0 && (
          <ul className="absolute z-50 top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
            {filteredModels.map((m, idx) => (
              <li
                key={m}
                onClick={() => handleSelectModel(m)}
                onMouseEnter={() => setHighlightedIndex(idx)}
                className={`px-4 py-2 cursor-pointer ${highlightedIndex === idx ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
              >
                {m}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

    // </form>
  );
}


//********************************************** */
// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";
// import SearchManufacturer from "./SearchManufacturer";

// export default function SearchBar() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [make, setMake] = useState("");
//   const [model, setModel] = useState("");
//   const [modelOptions, setModelOptions] = useState<string[]>([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [highlightedIndex, setHighlightedIndex] = useState(-1);

//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Keep UI in sync with URL
//   useEffect(() => {
//     setMake(searchParams.get("make") || "");
//     setModel(searchParams.get("model") || "");
//   }, [searchParams]);

//   // Update URL when make or model changes
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);

//     if (make) params.set("make", make.toLowerCase());
//     else {
//       params.delete("make");
//       setModel(""); // reset model if make is cleared
//     }

//     if (model) params.set("model", model.toLowerCase());
//     else params.delete("model");

//     router.replace(`/?${params.toString()}`);
//   }, [make, model]);

//   // Fetch model options when make changes
//   useEffect(() => {
//     if (!make) {
//       setModelOptions([]);
//       return;
//     }

//     const fetchModels = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/cars/models/distinct?make=${encodeURIComponent(make)}`
//         );
//         const data = await res.json();
//         setModelOptions(data.data || []);
//       } catch (err) {
//         console.error("Failed to fetch models:", err);
//         setModelOptions([]);
//       }
//     };

//     fetchModels();
//   }, [make]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       ) {
//         setDropdownOpen(false);
//         setHighlightedIndex(-1);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setModel(e.target.value);
//     setDropdownOpen(true);
//     setHighlightedIndex(-1);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (!dropdownOpen || modelOptions.length === 0) return;

//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setHighlightedIndex((prev) =>
//         prev < modelOptions.length - 1 ? prev + 1 : 0
//       );
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setHighlightedIndex((prev) =>
//         prev > 0 ? prev - 1 : modelOptions.length - 1
//       );
//     } else if (e.key === "Enter") {
//       e.preventDefault();
//       if (highlightedIndex >= 0) {
//         setModel(modelOptions[highlightedIndex]);
//         setDropdownOpen(false);
//       }
//     } else if (e.key === "Escape") {
//       setDropdownOpen(false);
//     }
//   };

//   const handleSelectModel = (value: string) => {
//     setModel(value);
//     setDropdownOpen(false);
//   };

//   const filteredModels = modelOptions.filter((m) =>
//     m.toLowerCase().includes(model.toLowerCase())
//   );

//   return (
//     <form
//       onSubmit={(e) => e.preventDefault()}
//       className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full items-center"
//     >
//       {/* Manufacturer */}
//       <div className="relative w-full sm:w-[250px]">
//         <SearchManufacturer make={make} setMake={setMake} />
//       </div>

//       {/* Model */}
//       <div className="relative w-full sm:w-[250px]" ref={dropdownRef}>
//         <Image
//           src="/model-icon.png"
//           width={22}
//           height={22}
//           alt="model icon"
//           className="absolute left-3 text-gray-400"
//         />
//         <input
//           type="text"
//           placeholder="Model (Optional)"
//           value={model}
//           onChange={handleModelChange}
//           onKeyDown={handleKeyDown}
//           className="w-full pl-10 py-2 border rounded-lg shadow-sm outline-none text-gray-900 placeholder-gray-500"
//           onFocus={() => setDropdownOpen(true)}
//         />

//         {/* Dropdown */}
//         {dropdownOpen && filteredModels.length > 0 && (
//           <ul className="absolute z-50 top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
//             {filteredModels.map((m, idx) => (
//               <li
//                 key={m}
//                 onClick={() => handleSelectModel(m)}
//                 onMouseEnter={() => setHighlightedIndex(idx)}
//                 className={`px-4 py-2 cursor-pointer ${
//                   highlightedIndex === idx
//                     ? "bg-blue-500 text-white"
//                     : "hover:bg-gray-100"
//                 }`}
//               >
//                 {m}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </form>
//   );
// }



//********************************************* */
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";
// import SearchManufacturer from "./SearchManufacturer";

// export default function SearchBar() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [make, setMake] = useState("");
//   const [model, setModel] = useState("");

//   // 1) Keep UI in sync with URL — REQUIRED for consistent behavior
//   useEffect(() => {
//     setMake(searchParams.get("make") || "");
//     setModel(searchParams.get("model") || "");
//   }, [searchParams]);

//   // 2) Auto-update URL whenever make changes
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);

//     if (make) params.set("make", make.toLowerCase());
//     else params.delete("make");

//     router.replace(`/?${params.toString()}`);
//   }, [make]);

//   // 3) Auto-update URL whenever model changes
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);

//     if (model) params.set("model", model.toLowerCase());
//     else params.delete("model");

//     router.replace(`/?${params.toString()}`);
//   }, [model]);

//   return (
//     <form
//       onSubmit={(e) => e.preventDefault()}
//       className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full items-center"
//     >
//       {/* Manufacturer */}
//       <div className="relative w-full sm:w-[250px]">
//         <SearchManufacturer make={make} setMake={setMake} />
//       </div>

//       {/* Model */}
//       <div className="relative w-full sm:w-[250px] flex items-center">
//         <Image
//           src="/model-icon.png"
//           width={22}
//           height={22}
//           alt="model icon"
//           className="absolute left-3 text-gray-400"
//         />

//         <input
//           type="text"
//           placeholder="Model (Optional)"
//           value={model}
//           onChange={(e) => setModel(e.target.value)}
//           className="w-full pl-10 py-2 border rounded-lg shadow-sm outline-none text-gray-900 placeholder-gray-500"
//         />
//       </div>
//     </form>
//   );
// }


//**************************************** */
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import SearchManufacturer from "./SearchManufacturer";

// import { useSearchParams } from "next/navigation";

// export default function SearchBar() {
//   const router = useRouter();
//   const [make, setMake] = useState("");
//   const [model, setModel] = useState("");
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     setMake(searchParams.get("make") || "");
//     setModel(searchParams.get("model") || "");
//   }, [searchParams]);

//   // useEffect(() => {
//   //   if (make) {
//   //     const params = new URLSearchParams(window.location.search);
//   //     params.set("make", make.toLowerCase());
//   //     router.push(`/?${params.toString()}`);
//   //   }
//   // }, [make]);


//   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const params = new URLSearchParams(window.location.search);

//     if (make) params.set("make", make.toLowerCase());
//     else params.delete("make");

//     if (model) params.set("model", model.toLowerCase());
//     else params.delete("model");

//     router.push(`/?${params.toString()}`);
//   };

//   return (
//     <form
//       onSubmit={handleSearch}
//       className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full items-center"
//     >
//       {/* Manufacturer */}
//       <div className="relative w-full sm:w-[250px]">
//         <SearchManufacturer make={make} setMake={setMake} />
//       </div>

//       {/* Model */}
//       <div className="relative w-full sm:w-[250px] flex items-center">
//         <Image
//           src="/model-icon.png"
//           width={22}
//           height={22}
//           alt="model icon"
//           className="absolute left-3 text-gray-400"
//         />
//         <input
//           type="text"
//           name="model"
//           value={model}
//           onChange={(e) => setModel(e.target.value)}
//           placeholder="Model (Optional)"
//           className="w-full pl-10 py-2 border rounded-lg shadow-sm outline-none text-gray-900 placeholder-gray-500"
//         />
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="flex items-center justify-center bg-primary-blue text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition w-full sm:w-auto"
//       >
//         <Image
//           src="/magnifying-glass.svg"
//           alt="search"
//           width={20}
//           height={20}
//           className="mr-2"
//         />
//         Search
//       </button>
//     </form>
//   );
// }


//******************************* */
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import SearchManufacturer from "./SearchManufacturer";
// import Image from "next/image";

// const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
//   <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
//     <Image src="/magnifying-glass.svg" alt="magnifying-glass" width={40} height={40} className="object-contain" />
//   </button>
// );

// const SearchBar = () => {
//   const [make, setMake] = useState("");
//   const [model, setModel] = useState("");
//   const router = useRouter();

//   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // if (make === '' && model === '') {
//     //   return alert('Please fill in the search bar')
//     if (!make && !model) return;
//     }
//     updateSearchParams(model.toLowerCase(), make.toLowerCase());
//   };

//   const updateSearchParams = (model: string, make: string) => {
//     const searchParams = new URLSearchParams(window.location.search);

//     if (model) searchParams.set("model", model);
//     else searchParams.delete("model");

//     if (make) searchParams.set("make", make);
//     else searchParams.delete("make");

//     // Add other filters in the future if needed
//     // e.g. fuelType, transmission, year, priceMin, priceMax

//     const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
//     router.push(newPathName);
//   };

//   return (
//     <form className="searchbar" onSubmit={handleSearch}>
//       <div className="searchbar__item">
//         <SearchManufacturer make={make} setMake={setMake} />
//         <SearchButton otherClasses="sm:hidden" />
//       </div>

//       <div className="searchbar__item">
//         <Image src="/model-icon.png" width={25} height={25} className="absolute w-[20px] h-[20px] ml-4" alt="car model" />
//         <input
//           type="text"
//           name="model"
//           value={model}
//           onChange={(e) => setModel(e.target.value)}
//           placeholder="Tiguan"
//           className="searchbar__input"
//         />
//         <SearchButton otherClasses="sm:hidden" />
//       </div>

//       <SearchButton otherClasses="max-sm:hidden" />
//     </form>
//   );
// };

// export default SearchBar;

