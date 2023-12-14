import React, {
  useState,
  useEffect,
  MouseEventHandler,
  FormEvent,
} from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import supabase from "../config/SuperbaseClient";
import FilterSheet from "./FilterSheet";

type SearchProps = {
  setProperties: React.Dispatch<React.SetStateAction<null | any[]>>;
};

const Search: React.FC<SearchProps> = ({ setProperties }) => {
  const [fetchError, setFetchError] = useState<string | null>(
    "error fetching properties"
  );
  const [location, setLocation] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const [bedRange, setBedRange] = useState<number[]>([0, 10]);
  const [bathRange, setBathRange] = useState<number[]>([0, 10]);
  const [smokeAlarm, setSmokeAlarm] = useState<boolean | null>(null);
  const [pets, setPets] = useState<boolean | null>(null);
  const [pool, setPool] = useState<boolean | null>(null);
  const [wifi, setWifi] = useState<boolean | null>(null);
  const [parking, setParking] = useState<boolean | null>(null);
  const [kitchen, setKitchen] = useState<boolean | null>(null);
  const [aircon, setAircon] = useState<boolean | null>(null);
  const [tv, setTv] = useState<boolean | null>(null);
  const [desk, setDesk] = useState<boolean | null>(null);
  const [washer, setWasher] = useState<boolean | null>(null);

  const handleReset: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    resetFilters();
    fetchProperties();
  };

  const resetFilters = () => {
    setLocation("");
    setPriceRange([0, 5000]);
    setBedRange([0, 10]);
    setBathRange([0, 10]);
    setPool(null);
    setSmokeAlarm(null);
    setPets(null);
    setWifi(null);
    setParking(null);
    setKitchen(null);
    setAircon(null);
    setTv(null);
    setDesk(null);
    setWasher(null);
  };

  useEffect(() => {
    setPriceRange([0, 5000]);
    setBedRange([0, 10]);
    setBathRange([0, 10]);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchProperties();
  };

  const fetchProperties = async () => {
    try {
      let query = supabase.from("properties").select("*");

      if (location) {
        query = query.ilike("location", location);
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
    <div className="flex flex-row items-center gap-4 relative my-4 w-full">
      <nav className="flex flex-row relative my-4 w-full">
        <form
          className="flex items-center w-full justify-between"
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
      <FilterSheet
        onPriceRangeChange={handlePriceRangeChange}
        onBedRangeChange={handleBedRangeChange}
        onBathRangeChange={handleBathRangeChange}
        onReset={resetFilters}
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
    </div>
  );
};

export default Search;
