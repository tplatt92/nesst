"use client";
import React, {
  useState,
  useEffect,
  MouseEventHandler,
  FormEvent,
} from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import supabase from "../config/SuperbaseClient";
import FilterSheet from "./FilterSheet";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
    setPriceRange([0, 5000]);
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

  // useEffect(() => {
  //   setPriceRange([0, 5000]);
  //   setBedRange([0, 10]);
  //   setBathRange([0, 10]);
  // }, []);

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

  const isMobile = useMediaQuery({
    query: "(max-width:600px), { noSsr: true}",
    //make sure to get rid of the hydration warning
  });

  const pathnameUrl = usePathname();
  return (
    <nav className="flex flex-row items-center gap-4 relative my-4 w-full ">
      {isMobile ? (
        <>
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
      ) : (
        <div className="flex flex-row items-center gap-4 relative my-4 w-full">
          <div className="flex items-center justify-center pl-2">
            <Image
              alt="NESST"
              src="/logos/fullegg.png"
              priority={true}
              width={80}
              height={80}
            />
          </div>
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
          <div
            className={`${
              pathnameUrl === "/explore" ? "text-nesstYellow" : "text-black"
            } `}
          >
            <Link
              href="/explore"
              className="flex-1 text-center hover:underline  hover:text-nesstYellow cursor-pointer "
            >
              <p className=" text-md">Explore</p>
            </Link>
          </div>
          <div
            className={`${
              pathnameUrl === "/favourites" ? "text-nesstYellow" : "text-black"
            } `}
          >
            <Link
              href="/favourites"
              className="flex-1 text-center hover:underline  hover:text-nesstYellow cursor-pointer"
            >
              <p className=" text-md">Favourites</p>
            </Link>
          </div>
          <div
            className={`${
              pathnameUrl === "/messages" ? "text-nesstYellow" : "text-black"
            } `}
          >
            <Link
              href="/messages"
              className="flex-1 text-center hover:underline  hover:text-nesstYellow cursor-pointer"
            >
              <p className=" text-md">Messages</p>
            </Link>
          </div>
          <div
            className={`${
              pathnameUrl === "/profile" ? "text-nesstYellow" : "text-black"
            } `}
          >
            <Link
              href="/profile"
              className="flex-1 text-center hover:underline  hover:text-nesstYellow cursor-pointer"
            >
              <p className=" text-md">Profile</p>
            </Link>
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
        </div>
      )}
    </nav>
  );
};

export default Search;
