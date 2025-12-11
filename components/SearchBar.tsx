"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import SearchManufacturer from "./SearchManufacturer";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";

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
    const value = e.target.value;
    setModel(value);
    setDropdownOpen(true);
    setHighlightedIndex(-1);

    // ✅ IMPORTANT FIX:
    // If user clears the model input, remove model from URL
    if (value === "") {
      const params = new URLSearchParams(window.location.search);
      params.delete("model");

      router.replace(`/?${params.toString()}`, { scroll: false });
    }
  };

  // When user confirms model (click or Enter), write it to the URL once
  const submitModelToUrl = (selectedModel: string | "") => {
    setModel(selectedModel);
    setDropdownOpen(false);

    const params = new URLSearchParams(window.location.search);

    if (selectedModel) params.set("model", selectedModel.toLowerCase());
    else params.delete("model");
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
    // <div className="flex flex-col sm:flex-row gap-4 w-full items-start">
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 w-full items-center sm:items-start">
      {/* LEFT SIDE — Make + Model */}
      {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"> */}
      <div className="filter-group flex flex-col sm:flex-row gap-3">

        {/* Manufacturer */}
        <div className="relative w-full sm:w-[250px]">
          <SearchManufacturer make={make} setMake={setMake} />
        </div>

        {/* Model */}
        <div className="relative w-full sm:w-[250px]" ref={dropdownRef}>
          <div className="input-shell">
            <Image
              src="/model-icon.png"
              width={22}
              height={22}
              alt="model icon"
              className="input-shell__icon"
            />
            <input
              type="text"
              placeholder="Model (Optional)"
              value={model}
              onChange={handleModelChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setDropdownOpen(true)}
              className="input-shell__input"
            />
          </div>

          {dropdownOpen && filteredModels.length > 0 && (
            <ul className="
            absolute
            z-50
            top-full
            mt-2
            w-full
            max-h-48
            overflow-y-auto
            rounded-xl
            bg-luxury-surface
            border
            border-luxury-border
            shadow-xl
          ">
              {filteredModels.map((m, idx) => (
                <li
                  key={m}
                  onClick={() => handleSelectModel(m)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition ${highlightedIndex === idx
                      ? "bg-luxury-accent/15 text-luxury-text"
                      : "text-luxury-muted hover:bg-luxury-accent/10 hover:text-luxury-text"
                    }`}
                >
                  {m}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* RIGHT SIDE — Price Filter */}
      <div className="filter-group sm:ml-auto">
        <PriceFilter />
      </div>

    </div>
  );
}


