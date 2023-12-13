"use client";

import supabase from "../config/SuperbaseClient";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Carousel from "../components/CardCarousell";
import { usePathname } from "next/navigation";
import ExploreNav from "../components/ExploreNav";
import Link from "next/link";
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

  return (
    <main className="flex min-h-screen flex-col items-center p-4 lg:px-8 pb-32">
      <nav className="flex flex-row items-center gap-4 relative my-4 w-full">
        <ExploreNav setProperties={setProperties} />
      </nav>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
        data-testid="card-id"
      >
        {properties?.map((properties) => (
          <Card key={properties.id}>
            <CardHeader className="relative lg:h-40">
              <Carousel images={properties.image} />
            </CardHeader>
            <Link href={`/explore/${properties.id}`}>
              <CardContent>
                <CardTitle className="text-xl lg:text-[10px] font-monserrat font-semibold flex justify-between items-center">
                  {properties.name}
                  <p className="text-sm lg:text-[10px] flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="20"
                      viewBox="0 0 640 512"
                    >
                      <path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" />
                    </svg>
                    {properties.beds}
                  </p>
                </CardTitle>
                <CardDescription className="text-yellow-600 text-sm lg:text-[10px] font-medium">
                  {properties.location}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="font-medium lg:text-[10px]">
                  £{properties.price}/month
                </p>
                {/* ---------------new line */}
                <p className="font-medium lg:text-[10px]">
                  £{Math.round(properties.price / properties.beds)}/pp
                </p>
                {/* ------------ new line */}

                <p className="text-gray-400 lg:text-[10px]">
                  {properties.available ? "Available" : "Unavailable"}
                </p>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
      {properties?.length == 0 && <p>No items match your search.</p>}
      <Footer pathnameUrl={pathname} />
    </main>
  );
}
