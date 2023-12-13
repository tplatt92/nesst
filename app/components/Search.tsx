"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import supabase from "../config/SuperbaseClient";
type SearchProps = {
  setProperties: React.Dispatch<React.SetStateAction<null | any[]>>;
};
type FormSubmit = React.FormEvent<HTMLFormElement>;
const Search: React.FC<SearchProps> = ({ setProperties }) => {
  const [fetchError, setFetchError] = useState<string | null>(
    "error fetching properties"
  );

  const [location, setLocation] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [minBeds, setMinBeds] = useState<number | null>(null);
  const [minBaths, setMinBaths] = useState<number | null>(null);

  function handleReset(e: FormSubmit) {
    e.preventDefault();
    setLocation("");
    setMinPrice(null);
    setMaxPrice(null);
    setMinBeds(null);
    setMinBaths(null);

    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase.from("properties").select("*");

        if (error) {
          setFetchError("error fetching properties");
          setProperties(null);
          console.error(error);
        }

        if (data) {
          setProperties(data);
          setFetchError(null);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };

    fetchProperties();
  }
  function handleSubmit(e: FormSubmit) {
    e.preventDefault();
    const fetchProperties = async () => {
      try {
        if (location === "") {
          const { data, error } = await supabase
            .from("properties")
            .select("*")
            .gte("price", minPrice ? minPrice : 0)
            .lte("price", maxPrice ? maxPrice : 1000000)
            .gte("beds", minBeds ? minBeds : 0)
            .gte("bathrooms", minBaths ? minBaths : 0);
          setProperties(data);
        } else {
          const { data, error } = await supabase
            .from("properties")
            .select("*")
            .ilike("location", location)
            .gte("price", minPrice ? minPrice : 0)
            .lte("price", maxPrice ? maxPrice : 1000000)
            .gte("beds", minBeds ? minBeds : 0)
            .gte("bathrooms", minBaths ? minBaths : 0);

          if (error) {
            setFetchError("error fetching properties");
            setProperties(null);
            console.error(error);
          }
          if (data) {
            setProperties(data);
            setFetchError(null);
          }
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };
    fetchProperties();
  }
  return (
    <div className="flex flex-row items-center gap-4 relative my-4 w-full">
      <nav className="flex flex-row relative my-4 w-full">
        <form
          className="flex items-center w-full  justify-between"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-1 border-2 rounded-full pl-4 pr-2 left-0 h-12 lg:h-10 items-center lg:max-w-xs shadow-sm">
            <input
              className="h-13 lg:h-6 items-center flex-1 rounded-l-full lg:text-xs focus:outline-none"
              type="text"
              placeholder="Search Destinations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit">
              <MagnifyingGlassIcon className="h-8 lg:h-7 text-white ml-3 bg-nesstYellow p-1 rounded-full" />
            </button>
          </div>
        </form>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 0 512 512"
            fill="#d9a66d"
            className="border shadow h-10 w-10 p-2 rounded-full text-nesstYellow"
          >
            <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
          </svg>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Filter</SheetTitle>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label>Min Price</label>
            <input
              id="Min Price"
              value={minPrice || ""}
              onChange={(e) => setMinPrice(parseInt(e.target.value))}
            />
            <label>Max Price</label>
            <input
              id="Max Price"
              value={maxPrice || ""}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            />
            <label>Beds</label>
            <input
              id="Beds"
              value={minBeds || ""}
              onChange={(e) => setMinBeds(parseInt(e.target.value))}
            />
            <label>Baths</label>
            <input
              id="Baths"
              value={minBaths || ""}
              onChange={(e) => setMinBaths(parseInt(e.target.value))}
            />
            <SheetClose asChild>
              <button type="submit">Apply</button>
            </SheetClose>
            <SheetClose asChild>
              <button type="reset" onClick={handleReset}>
                Reset
              </button>
            </SheetClose>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Search;
