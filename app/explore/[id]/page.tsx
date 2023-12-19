"use client";
import React from "react";
import { useEffect, useState } from "react";
import ExploreNav from "../../components/ExploreNav";
import Footer from "@/app/components/Footer";
import { useMediaQuery } from "react-responsive";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import Carousel from "../../components/CardCarousell";
import { Session } from "@supabase/auth-helpers-nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  Wifi,
  ParkingSquare,
  Waves,
  PawPrint,
  Utensils,
  LampDesk,
  Radius,
  Shirt,
  Fan,
  Tv,
  Bed,
  Bath,
} from "lucide-react";

import CalendarWidget from "@/app/components/Calendar";

type PropertyIdProps = {
  params: any;
};

const PropertyId: React.FC<PropertyIdProps> = ({ params }) => {
  const supabase = createClientComponentClient<Database>();
  const [session, setSession] = useState<Session | null>(null);
  const [properties, setProperties] = useState<null | any[]>(null);
  const [fetchError, setFetchError] = useState<string | null>(
    "error fetching properties"
  );
  const [isLiked, setIsLiked] = useState(false);

  const pathname = usePathname();
  const propertyId = params.id;
  const userId = session?.user?.id;

  // const isMobile = useMediaQuery({
  //   query: "(max-width:600px), { noSsr: true }",
  // });

  // get session
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching session:", error);
          return;
        }
        if (data) {
          console.log(session?.user ?? null);
          setSession(data?.session ?? null);
        } else {
          setSession(null);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };
    fetchSession();
  }, []); // eslint-disable-line

  // fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", propertyId)
          .single();

        if (error) {
          setFetchError("error fetching properties");
          setProperties(null);
          console.error(error);
        }
        if (data) {
          setProperties([data]);
          setFetchError(null);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };
    fetchProperties();
  }, [propertyId]); // eslint-disable-line

  //check if property has already been liked
  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const { data, error } = await supabase
          .from("propertiesILiked")
          .select("*")
          .eq("profile_id", `${userId}`)
          .eq("property_id", `${propertyId}`);

        if (error) {
          console.error("Error fetching properties:", error.message);
        } else {
          // console.log("Row fetched successfully:", data);
          if (data.length > 0) {
            setIsLiked(true);
          }
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };
    checkIfLiked();
  }, [propertyId, userId]); // eslint-disable-line

  // add property to propertiesILiked

  const addToLikedColumn = async () => {
    try {
      const { data, error } = await supabase
        .from("propertiesILiked")
        .insert({ profile_id: `${userId}`, property_id: `${propertyId}` });

      if (error) {
        console.error("Error adding to liked column:", error.message);
      } else {
        console.log("Row added successfully:", data);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  // remove property from propertiesILiked

  const removeProfileFromLikedColumn = async () => {
    try {
      const { data, error } = await supabase
        .from("propertiesILiked")
        .delete()
        .eq("profile_id", `${userId}`)
        .eq("property_id", `${propertyId}`);

      if (error) {
        console.error("Error removing from liked column:", error.message);
      } else {
        console.log("Row deleted successfully:", data);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  // handles liking and disliking on button click

  function handleClick() {
    if (!isLiked) {
      addToLikedColumn();
    } else {
      removeProfileFromLikedColumn();
    }
    setIsLiked((prev) => !prev);
  }

  return (
    <>
      <div className="px-4 pt-4 pb-32">
        <div className="flex justify-between">
          <Link href="/explore">
            <div className="w-8 h-8 rounded-full bg-nesstYellow flex items-center justify-center mb-2 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </div>
          </Link>
          <div
            className="w-8 h-8 rounded-full bg-nesstYellow flex items-center justify-center mb-2 shadow-lg "
            onClick={handleClick}
          >
            {isLiked ? (
              <Heart width={20} fill="#212121" />
            ) : (
              <Heart width={20} />
            )}
          </div>
        </div>
        {properties?.map((property) => (
          <Card key={property.id}>
            <CardHeader className="relative">
              <div className="align-middle mx-auto">
                <Carousel images={property.image} />
              </div>
            </CardHeader>

            <CardTitle className="text-xl font-monserrat font-semibold">
              <div className="flex justify-between md:justify-evenly">
                {property.name} - {property.location}
                <p className="text-sm ">
                  {property.area} m<sup>2</sup>
                </p>
              </div>
            </CardTitle>
            <CardContent className="text-black text-base font-medium pb-4">
              <div className="flex gap-4 items-center justify-between md:justify-evenly border-b pb-4">
                <div className="flex gap-4">
                  <span className="flex items-center gap-2">
                    <Bed size={20} stroke="#8f8f8f" />
                    <p>{property.beds}</p>
                  </span>

                  <span className="flex items-center gap-2">
                    <Bath size={20} stroke="#8f8f8f" />

                    <p>{property.bathrooms}</p>
                  </span>
                </div>
                <p className="font-medium text-sm">
                  £ {property.price * property.beds}/month - £ {property.price}
                  /pp
                </p>
              </div>
              <div className="flex flex-col justify-center items-center py-4 border-b gap-4">
                <div className="text-black">
                  <CalendarWidget />
                </div>
                <div className="flex gap-2 sm:gap-12 md:gap-20 lg:gap-36">
                  <button
                    type="submit"
                    className="bg-nesstYellow text-black font-bold px-2 py-2 rounded-lg font-2"
                  >
                    Reserve property
                  </button>
                  <button
                    type="submit"
                    className="bg-nesstYellow text-black font-bold px-2 py-2 rounded-lg font-2"
                  >
                    Reserve Bed
                  </button>
                </div>
              </div>
              <p className="font-medium border-b py-4">
                {property.longDescription}
              </p>
            </CardContent>

            <h2 className="text-xl font-bold px-2">Amenities</h2>
            <article className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-4 p-4 text-xs border-b">
              {property.TV ? (
                <span className="font-medium flex flex-col items-center">
                  <Tv size={36} stroke="#8f8f8f" />
                  <p>TV</p>
                </span>
              ) : null}
              {property.Desk ? (
                <span className="font-medium flex flex-col items-center">
                  <LampDesk size={36} stroke="#8f8f8f" />

                  <p>Desk</p>
                </span>
              ) : null}{" "}
              {property.Washer ? (
                <span className="font-medium flex flex-col items-center">
                  <Shirt size={36} stroke="#8f8f8f" />

                  <p>Washer</p>
                </span>
              ) : null}
              {property.SmokeAlarm ? (
                <span className="font-medium flex flex-col items-center">
                  <Radius size={36} stroke="#8f8f8f" />
                  <p>Smoke Alarm</p>
                </span>
              ) : null}
              {property.wifi ? (
                <span className="font-medium flex flex-col items-center">
                  <Wifi size={36} stroke="#8f8f8f" />
                  <p>Wifi</p>
                </span>
              ) : null}
              {property.Aircon ? (
                <span className="font-medium flex flex-col items-center">
                  <Fan size={36} stroke="#8f8f8f" />
                  <p>Aircon</p>
                </span>
              ) : null}
              {property.Kitchen ? (
                <span className="font-medium flex flex-col items-center">
                  <Utensils size={36} stroke="#8f8f8f" />
                  <p>Kitchen</p>
                </span>
              ) : null}
              {property.Parking ? (
                <span className="font-medium flex flex-col items-center">
                  <ParkingSquare size={36} stroke="#8f8f8f" />
                  <p>Parking</p>
                </span>
              ) : null}
              {property.Pool ? (
                <span className="font-medium flex flex-col items-center">
                  <Waves size={36} stroke="#8f8f8f" />
                  <p>Pool</p>
                </span>
              ) : null}
              {property.Pets ? (
                <span className="font-medium flex flex-col items-center">
                  <PawPrint size={36} stroke="#8f8f8f" />
                  <p>Pets</p>
                </span>
              ) : null}
            </article>
          </Card>
        ))}
        <article className="px-2 py-4 text-lg font-bold">
          <h2>These people also liked this property...</h2>
        </article>
      </div>
      <div className="md:hidden">
        <Footer pathnameUrl={pathname} />
      </div>
    </>
  );
};

export default PropertyId;
