"use client";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import supabase from "../config/SuperbaseClient";
type SearchProps = {
  setProperties: React.Dispatch<React.SetStateAction<null | any[]>>;
};
const Search:React.FC<SearchProps>=({setProperties}) => {
  // const [properties, setProperties] = useState<null | any[]>(null);
  const [fetchError, setFetchError] = useState<string | null>(
    "error fetching properties"
  );
  const [beds, setBeds] = useState<null | number>(null);

  const [location, setLocation] = useState<string>("");

  const [availability, setAvailability] = useState<null | boolean>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("location", location);

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
  }, []);
  return (
    <nav className="flex flex-row relative my-4 w-full">
      <form className="flex items-center w-full  justify-between">
        <div className="flex flex-1 bg-white px-2 border-solid border-2 border-gray-300 rounded-full left-0 h-14 lg:h-8 items-center lg:max-w-xs">
          <input
            className="h-12 lg:h-6 items-center flex-1 rounded-l-full lg:text-xs "
            type="text"
            placeholder="Search Destinations"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="button">
            <MagnifyingGlassIcon className="h-10 lg:h-6 text-white ml-3 bg-nesstYellow p-1 rounded-full" />
          </button>
        </div>
        <button className="pl-4 mr-2" type="button">
          Filter
        </button>
      </form>
    </nav>
  );
}

export default Search;