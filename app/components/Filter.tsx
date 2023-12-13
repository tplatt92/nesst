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
import supabase from "../config/SuperbaseClient";

interface Property {
  price: number;
  beds: number;
  baths: number;
}
type FormSubmit = React.FormEvent<HTMLFormElement>;

type FilterProps = {
  properties: Property[] | null;
  setProperties: React.Dispatch<React.SetStateAction<null | Property[]>>;
};

const Filter: React.FC<FilterProps> = ({ properties, setProperties }) => {
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [minBeds, setMinBeds] = useState<number | null>(null);
  const [minBaths, setMinBaths] = useState<number | null>(null);
  const [filteredProperties, setfilteredProperties] = useState<
    Property[] | null
  >(properties || null);

  useEffect(() => {
    setfilteredProperties(properties || null);
  }, [properties]);

  function handleReset() {
    setMinPrice(null);
    setMaxPrice(null);
    setMinBeds(null);
    setMinBaths(null);
    setProperties(filteredProperties);
  }

  function filterProperties() {
    setProperties((prevProperties) => {
      if (!prevProperties) return null;
      setfilteredProperties(prevProperties);
      return prevProperties.filter((filteredProperty) => {
        return (
          (!minPrice || filteredProperty.price >= minPrice) &&
          (!maxPrice || filteredProperty.price <= maxPrice) &&
          (!minBeds || filteredProperty.beds >= minBeds) &&
          (!minBaths || filteredProperty.baths >= minBaths)
        );
      });
    });
    console.log(filteredProperties);
  }

  function handleSubmit(e: FormSubmit) {
    e.preventDefault();
    console.log("minPrice:", minPrice);
    console.log("maxPrice:", maxPrice);
    console.log("beds:", minBeds);
    filterProperties();
  }

  return (
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
  );
};

export default Filter;
