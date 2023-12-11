"use client";

import Link from "next/link";
import Image from "next/image";
import supabase from "../config/SuperbaseClient";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Carousel from "../components/CardCarousell";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Explore() {
  const [availability, setAvailability] = useState<null | any[]>(null);
  const [properties, setProperties] = useState<null | any[]>(null);
  const [fetchError, setFetchError] = useState<string | null>(
    "error fetching properties"
  );
  const pathname = usePathname();

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
  console.log(properties);
  //for propertty page
  // useEffect(() => {
  //   const fetchAvailability = async () => {
  //     try {
  //       const { data, error } = await supabase.from("availability").select("*");

  //       if (error) {
  //         setFetchError("error fetching properties");
  //         setAvailability(null);
  //         console.error(error);
  //       }
  //       if (data) {
  //         setAvailability(data);
  //         setFetchError(null);
  //       }
  //     } catch (error) {
  //       console.error("An unexpected error occurred:", error);
  //     }
  //   };
  //   fetchAvailability();
  // }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 lg:px-8 pb-28">
      <nav className="flex flex-row relative my-4 w-full">
        <form className="flex items-center w-full  justify-between">
          <div className="flex flex-1 bg-white px-2 border-solid border-2 border-gray-300 rounded-full left-0 h-14 lg:h-8 items-center lg:max-w-xs">
            <input
              className="h-12 lg:h-6 items-center flex-1 rounded-l-full lg:text-xs "
              type="text"
              placeholder="Search Destinations"
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
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
        data-testid="card-id"
      >
        {properties?.map((properties) => (
          <Card key={properties.id}>
            <Link href={`/explore/${properties.id}`}>
            <CardHeader className="relative lg:h-40">
              <Carousel images={properties.image} />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl lg:text-[10px] font-monserrat font-semibold flex justify-between items-center">
                {properties.name}
                <p className="text-sm lg:text-[10px]">beds:{properties.beds}</p>
              </CardTitle>
              <CardDescription className="text-yellow-600 text-sm lg:text-[10px] font-medium">
                {properties.location}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="font-medium lg:text-[10px]">
                £{properties.price}/month
              </p>

              <p className="text-gray-400 lg:text-[10px]">
                {properties.available ? "Available" : "Unavailable"}
              </p>
            </CardFooter>

        </Link>
          </Card>
        ))}
      </div>
      <Footer pathnameUrl={pathname} />
    </main>
  );
}
