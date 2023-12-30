//search & filter logic
"use client";
import React, {
  useState,
  MouseEventHandler,
  FormEvent,
} from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import supabase from "../config/SuperbaseClient";
import FilterSheet from "./FilterSheet";
import { usePathname } from "next/navigation";

type SearchProps = {
  setProperties: React.Dispatch<React.SetStateAction<null | any[]>>;
};

const Search: React.FC<SearchProps> = ({ setProperties }) => {
  const [fetchError, setFetchError] = useState<string | null>(
    "error fetching properties"
  );
  const [location, setLocation] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [bedRange, setBedRange] = useState<number[]>([0, 10]);
  const [bathRange, setBathRange] = useState<number[]>([0, 10]);
  const [smokeAlarm, setSmokeAlarm] = useState<boolean>(false);
  const [pets, setPets] = useState<boolean>(false);
  const [pool, setPool] = useState<boolean>(false);
  const [wifi, setWifi] = useState<boolean>(false);
  const [parking, setParking] = useState<boolean>(false);
  const [kitchen, setKitchen] = useState<boolean>(false);
  const [aircon, setAircon] = useState<boolean>(false);
  const [tv, setTv] = useState<boolean>(false);
  const [desk, setDesk] = useState<boolean>(false);
  const [washer, setWasher] = useState<boolean>(false);

  const handleReset: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    resetFilters();
    // fetchProperties();
  };

  const resetFilters = () => {
    setLocation("");
    setPriceRange([0, 2000]);
    setBedRange([0, 10]);
    setBathRange([0, 10]);
    setPool(false);
    setSmokeAlarm(false);
    setPets(false);
    setWifi(false);
    setParking(false);
    setKitchen(false);
    setAircon(false);
    setTv(false);
    setDesk(false);
    setWasher(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchProperties();
  };

  //builds a query string based on the current values of the filters & then fetches properties based on those values
  const fetchProperties = async () => {
    try {
      let query = supabase.from("properties").select("*");

      if (location) {
        query = query.ilike("location", location);
      }
      if (pool) {
        query = query.eq("Pool", pool);
      }
      if (smokeAlarm) {
        query = query.eq("SmokeAlarm", smokeAlarm);
      }
      if (pets) {
        query = query.eq("Pets", pets);
      }
      if (wifi) {
        query = query.eq("wifi", wifi);
      }
      if (parking) {
        query = query.eq("Parking", parking);
      }
      if (kitchen) {
        query = query.eq("Kitchen", kitchen);
      }
      if (aircon) {
        query = query.eq("Aircon", aircon);
      }
      if (tv) {
        query = query.eq("TV", tv);
      }
      if (desk) {
        query = query.eq("Desk", desk);
      }
      if (washer) {
        query = query.eq("Washer", washer);
      }

      const { data, error } = await query

        .gte("price", priceRange[0] || 0)
        .lte("price", priceRange[1] || 1000000)
        .gte("beds", bedRange[0] || 0)
        .lte("beds", bedRange[1] || 10)
        .gte("bathrooms", bathRange[0] || 0)
        .lte("bathrooms", bathRange[1] || 10);

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

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleBedRangeChange = (value: number[]) => {
    setBedRange(value);
  };

  const handleBathRangeChange = (value: number[]) => {
    setBathRange(value);
  };


  return (
    <div aria-label="search bar and filter button" className="flex flex-row items-center gap-4 relative px-8 lg:px-20 w-full pt-8 md:pt-0">
      <>
        <div className="flex flex-row relative lg:pt-8 w-full">
          <form
            className="flex items-center w-full justify-between"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-1 border-2 rounded-full pl-4 pr-2 left-0 h-14 lg:h-10 items-center lg:max-w-sm shadow-lg">
              <input
                className="h-13 lg:h-6 items-center flex-1 rounded-l-full pl-4 text-[14px] lg:text-xs focus:outline-none"
                placeholder={"Where - Add destination"}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button type="submit">
                <MagnifyingGlassIcon className="h-8 lg:h-7 text-white ml-3 bg-nesstDarkGrey p-1 rounded-full" />
              </button>
            </div>
          </form>
        </div>
        <FilterSheet
          onPriceRangeChange={handlePriceRangeChange}
          onBedRangeChange={handleBedRangeChange}
          onBathRangeChange={handleBathRangeChange}
          onReset={handleReset}
          onSubmit={handleSubmit}
          priceRange={priceRange}
          bedRange={bedRange}
          bathRange={bathRange}
          smokeAlarm={smokeAlarm}
          onSmokeAlarmChange={setSmokeAlarm}
          pets={pets}
          onPetsChange={setPets}
          pool={pool}
          onPoolChange={setPool}
          wifi={wifi}
          onWifiChange={setWifi}
          parking={parking}
          onParkingChange={setParking}
          kitchen={kitchen}
          onKitchenChange={setKitchen}
          aircon={aircon}
          onAirconChange={setAircon}
          tv={tv}
          onTvChange={setTv}
          desk={desk}
          onDeskChange={setDesk}
          washer={washer}
          onWasherChange={setWasher}
        />
      </>
    </div>
  );
};

export default Search;
