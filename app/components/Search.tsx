"use client";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import supabase from "../config/SuperbaseClient";
type SearchProps = {
  setProperties: React.Dispatch<React.SetStateAction<null | any[]>>;
};
type FormSubmit = React.FormEvent<HTMLFormElement>;
const Search: React.FC<SearchProps> = ({ setProperties }) => {
  // const [properties, setProperties] = useState<null | any[]>(null);
  const [fetchError, setFetchError] = useState<string | null>(
    "error fetching properties"
  );
  const [beds, setBeds] = useState<null | number>(null);

  const [location, setLocation] = useState<string>("");

  const [availability, setAvailability] = useState<null | boolean>(null);

  function handleSubmit(e: FormSubmit) {
    e.preventDefault();
    const fetchProperties = async () => {
      try {
        if (location == "") {
          const { data, error } = await supabase.from("properties").select("*");
          setProperties(data);
        } else {
          const { data, error } = await supabase
            .from("properties")
            .select("*")
            .ilike("location", location);

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
  );
};

export default Search;
