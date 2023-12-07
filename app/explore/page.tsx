"use client";

import Link from "next/link";
import Image from "next/image";
import supabase from "../config/SuperbaseClient";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Carousel from "../components/CardCarousell";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Explore() {
  const [properties, setProperties] = useState<null | any[]>(null);
  const [fetchError, setFetchError] = useState<string | null>(
    "error fetching properties"
  );

  useEffect(() => {
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
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 pb-20">
      <nav className="flex flex-row relative justify-between my-4 w-full">
        <form className="flex items-center">
          <div className="flex bg-white p-2 border-solid border-2 border-gray-300 rounded-full left-0 h-16 items-center">
            <input
              className="h-12 items-center rounded-l-full "
              type="text"
              placeholder="Search Destinations"
            />
            <button type="button">
              <MagnifyingGlassIcon className="h-12 text-white ml-3 bg-yellow-600 p-2 rounded-full" />
            </button>
          </div>
          <button className="pl-4 mr-2" type="button">
            Filter
          </button>
        </form>
      </nav>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        data-testid="card-id"
      >
        {properties?.map((properties) => (
          <Card key={properties.id}>
            <CardHeader className="relative">
              <Carousel images={properties.image} />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl font-monserrat font-semibold">
                {properties.name}
              </CardTitle>
              <CardDescription className="text-yellow-600 text-base font-medium">
                {properties.location}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="font-medium">{properties.price}</p>
              <p className="text-gray-400 ">{properties.date}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Footer />
    </main>
  );
}

{
  /* <div>
<h1 className="bg-nesstYellow text-white p-1 text-1xl font-serif font-bold font-montserrat">
  Hello
</h1>
<h1 className="bg-nesstLightGrey text-white p-2 text-2xl font-sans hover:underline font-montserrat">
  Hello
</h1>
<h1 className="bg-nesstDarkGrey text-white p-3 text-3xl font-mono underline border-solid border-white border-4 text-center font-montserrat">
  Hello
</h1>
</div> */
}

{
  /* <button className="material-symbols-outlined absolute top-5 right-4 mt-4 mr-4 text-black text-4xl font-extrabold cursor-pointer focus:text-red-700 bg-white rounded-full bg-opacity-50">
                Favorite
              </button> */
}
