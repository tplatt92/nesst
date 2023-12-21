"use client";

import supabase from "../config/SuperbaseClient";
import { useEffect, useState } from "react";
import Carousel from "../components/CardCarousell";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";
import ExploreNav from "../components/ExploreNav";
import Footer from "../components/Footer";
import DesktopNav from "../components/DesktopNav";

// const ExploreNav = dynamic(() => import("../components/ExploreNav"), {
//   ssr: false,
// });

// const Footer = dynamic(() => import("../components/Footer"), {
//   ssr: false,
// });

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
    <>
    <div className="hidden md:block">
      <DesktopNav />
    </div>
    <main className="flex min-h-screen w-screen flex-col items-center  pb-2">
      <ExploreNav setProperties={setProperties} />
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-8 lg:mx-12 lg:my-12 p-8 lg:px-8"
        data-testid="card-id"
      >
        {properties?.map((properties) => (
          <Card key={properties.id}>
            <CardHeader className="relative h-80 lg:h-60 lg:pb-2">
              <Carousel images={properties.image} />
            </CardHeader>
            <Link href={`/explore/${properties.id}`}>
              <CardContent>
                <CardTitle className="text-xl lg:text-[14px] font-monserrat font-semibold flex justify-between items-center">
                  {properties.name}
                  <p className="text-sm lg:text-[14px] flex gap-2">
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
                <CardDescription className="text-nesstLightGrey text-sm lg:text-[14px] font-medium">
                  {properties.location}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="font-semibold lg:text-[14px]">
                  £{properties.price * properties.beds}/month
                </p>
                {/* ---------------new line */}
                <p className="font-semibold lg:text-[14px]">
                  £{properties.price}/pp
                </p>
                {/* ------------ new line */}

                <p className="text-gray-400 lg:text-[14px]">
                  {properties.available ? "Available" : "Unavailable"}
                </p>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
      {properties?.length == 0 && <p>No items match your search.</p>}
    </main>
      <div className="md:hidden">
      <Footer pathnameUrl={pathname} />
      </div>
    </>
  );
}
