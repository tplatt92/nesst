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
    <main className="flex min-h-screen flex-col items-center justify-between p-4 pb-28">
      <nav className="flex flex-row relative my-4 w-full">
        <form className="flex items-center w-full justify-between">
          <div className="flex flex-1 bg-white px-2 border-solid border-2 border-gray-300 rounded-full left-0 h-14 items-center">
            <input
              className="h-12 items-center flex-1 rounded-l-full "
              type="text"
              placeholder="Search Destinations"
            />
            <button type="button">
              <MagnifyingGlassIcon className="h-10 text-white ml-3 bg-nesstYellow p-2 rounded-full" />
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
              <p className="font-medium">£{properties.price}/month</p>
              <p className="text-gray-400 ">{properties.date}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Footer />
    </main>
  );
}
