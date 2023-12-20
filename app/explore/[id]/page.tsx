"use client";
import React from "react";
import logoGreyEmpty from "public/logos/logoGreyEmpty.png";
import { useEffect, useState } from "react";
import Footer from "@/app/components/Footer";
import DesktopNav from "@/app/components/DesktopNav";
import { useFetchProperty } from "../../hooks/useFetchProperty";
// import { useMediaQuery } from "react-responsive";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import Carousel from "../../components/CardCarousell";
import { Session } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import logoGrey from "public/logos/logoGrey.png";
import AvatarProfile from "@/app/components/AvatarProfile";
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
  Info,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import CalendarWidget from "@/app/components/Calendar";
import { set } from "date-fns";

type PropertyIdProps = {
  params: any;
};

const PropertyId: React.FC<PropertyIdProps> = ({ params }) => {
  const supabase = createClientComponentClient<Database>();
  const [session, setSession] = useState<Session | null>(null);
  const [
    profilesWhoHaveLikedThisProperty,
    setProfilesWhoHaveLikedThisProperty,
  ] = useState<null | any[]>(null);
  const [inNesst, setInNesst] = useState<null | any[]>(null);
  const [availability, setAvailability] = useState<null | any[]>(null);
  //const [properties, setProperties] = useState<null | any[]>(null);
  const [fetchError, setFetchError] = useState<string | null>(
    "error fetching properties"
  );
  const [isLiked, setIsLiked] = useState(false);
  const [isNessted, setIsNessted] = useState(false);

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
  const { properties } = useFetchProperty(propertyId, supabase);

  // useEffect(() => {
  //   const fetchProperties = async () => {
  //     try {
  //       const { data, error } = await supabase
  //         .from("properties")
  //         .select("*")
  //         .eq("id", propertyId)
  //         .single();

  //       if (error) {
  //         setFetchError("error fetching properties");
  //         setProperties(null);
  //         console.error(error);
  //       }
  //       if (data) {
  //         setProperties([data]);
  //         setFetchError(null);
  //       }
  //     } catch (error) {
  //       console.error("An unexpected error occurred:", error);
  //     }
  //   };
  //   fetchProperties();
  // }, [propertyId]); // eslint-disable-line

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
          console.error("Error fetching liked properties:", error.message);
        } else {
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

  //check if property has already been nessted
  useEffect(() => {
    const checkIfNessted = async () => {
      try {
        const { data, error } = await supabase
          .from("nessts")
          .select("*")
          .eq("profile_id", `${userId}`)
          .eq("property_id", `${propertyId}`);

        if (error) {
          console.error("Error fetching nessted properties:", error.message);
        } else {
          if (data.length > 0) {
            setIsNessted(true);
          }
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };
    checkIfNessted();
  }, [propertyId, userId]); // eslint-disable-line

  // // fetch who has liked a property info
  // useEffect(() => {
  //   const fetchWhoLiked = async () => {
  //     try {
  //       const { data, error } = await supabase
  //         .from("propertiesILiked")
  //         .select(`profiles (id, username, avatar_url)`)
  //         .eq("property_id", `${propertyId}`);

  //       if (error) {
  //         console.error("Error fetching properties:", error.message);
  //       } else if (data) {
  //         console.log(data);
  //         setProfilesWhoHaveLikedThisProperty(data);
  //       }
  //     } catch (error) {
  //       console.error("An unexpected error occurred:", error);
  //     }
  //   };
  //   fetchWhoLiked();
  // }, [propertyId]); // eslint-disable-line

  // fetch who is in a nesst
  useEffect(() => {
    const fetchInNesstData = async () => {
      try {
        const { data, error } = await supabase
          .from("nessts")
          .select(`profiles (id, username, avatar_url)`)
          .eq("property_id", `${propertyId}`);

        if (error) {
          console.error("Error fetching nessts properties:", error.message);
        } else if (data) {
          console.log(data);
          setInNesst(data);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };
    fetchInNesstData();
  }, [propertyId]); // eslint-disable-line

  const addToLikedColumn = async () => {
    try {
      const { data, error } = await supabase
        .from("propertiesILiked")
        .insert({ profile_id: `${userId}`, property_id: `${propertyId}` });

      if (error) {
        console.error("Error adding to liked column:", error.message);
      } else {
        console.log("Row added to liked table successfully:", data);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  //add a user to the nessts table
  const addToNesstsTable = async () => {
    try {
      const { data, error } = await supabase
        .from("nessts")
        .insert({ profile_id: `${userId}`, property_id: `${propertyId}` });

      if (error) {
        console.error("Error adding to nessts table:", error.message);
      } else {
        console.log("Row added to nessts successfully:", data);
      }
    } catch (error) {
      console.error("An unexpected error with nessts table occurred:", error);
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
        console.log("Row deleted from liked table successfully:", data);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  //removing a user from the nessts table

  const removeProfileFromNesstsTable = async () => {
    try {
      const { data, error } = await supabase
        .from("nessts")
        .delete()
        .eq("profile_id", `${userId}`)
        .eq("property_id", `${propertyId}`);

      if (error) {
        console.error("Error removing from nessts table:", error.message);
      } else {
        console.log("Row deleted from nessts table successfully:", data);
      }
    } catch (error) {
      console.error(
        "An unexpected error removing from nessts table occurred:",
        error
      );
    }
  };

  // handles liking and disliking on button click

  function handleClickLike() {
    if (!isLiked) {
      addToLikedColumn();
    } else {
      removeProfileFromLikedColumn();
    }
    setIsLiked((prev) => !prev);
  }

  // handles nessting and unnesting on button click

  function handleClickNesst() {
    if (!isNessted && !isLiked) {
      addToNesstsTable();
      addToLikedColumn();
      setIsLiked(true);
    } else if (!isNessted && isLiked) {
      addToNesstsTable();
    } else if (isNessted) {
      removeProfileFromNesstsTable();
    }
    setIsNessted((prev) => !prev);
  }

  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  const numImagesToShow = (width: number): number => {
    if (width <= 1024) {
      return 4;
    } else if (width < 1280) {
      return 3;
    } else {
      return 5;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  return (
    <>
    <div className="hiden md:block">
      <DesktopNav />
    </div>
      <main className="px-4 pt-20 pb-32">
        {properties?.map((property) => (
          <Card key={property.id}>
            <CardHeader className="relative">
              <div className="align-middle mx-auto md:hidden">
                <Carousel images={property.image} />
              </div>
              <div className="hidden md:grid md:grid-cols-2 md:grid-rows-2 lg:grid-rows-2 lg:grid-cols-3 xl:grid-rows-2 xl:grid-cols-4 gap-4">
                {property.image
                  .slice(0, numImagesToShow(screenWidth))
                  .map((property: string, index: number) => (
                    <div
                      key={index}
                      className={`object-cover h-100 w-100 ${
                        index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                      } ${index >= numImagesToShow(screenWidth) ? 'hidden' : ''}`}
                    >
                      <Image
                        src={property}
                        alt="property image"
                        width={800}
                        height={400}
                        className="h-full w-full"
                      />
                    </div>
                  ))}
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl font-monserrat font-semibold">
                <div className="flex justify-between md:justify-evenly">
                  {property.name} - {property.location}
                  <p className="text-sm ">
                    {property.area} m<sup>2</sup>
                  </p>
                </div>
              </CardTitle>
              <CardDescription className="text-black text-base font-medium pb-4">
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
                    £ {property.price * property.beds}/month - £{" "}
                    {property.price}/pp
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center py-4 border-b gap-4">
                  <div className="text-black">
                    <CalendarWidget />
                  </div>
                  <div className="flex gap-2 sm:gap-12 md:gap-20 lg:gap-36">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Info />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Information</AlertDialogTitle>
                          <AlertDialogDescription className="mr-6 text-nesstDarkGrey">
                            <p>
                              Reserve Property - Reserve the entire property!
                              <br></br>Reserve bed - Share this property with
                              other nomads<br></br>Heart - Add this property to
                              your favourites!<br></br>Nesst- Add this property
                              to Your Nesst and favourites. Go to messages to
                              chat with other nomads in this Nesst.<br></br>
                              Whichever way, get ready for an awesome stay!
                            </p>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="mr-6 text-nesstDarkGrey">
                            Close
                          </AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <button
                      type="submit"
                      className="bg-nesstDarkGrey text-white font-md px-2 py-2 rounded-lg font-2"
                    >
                      Reserve property
                    </button>
                    <button
                      type="submit"
                      className="bg-nesstDarkGrey text-white font-md px-2 py-2 rounded-lg font-2"
                    >
                      Reserve Bed
                    </button>
                  </div>
                </div>
                <div className="flex flex-row w-auto h-auto justify-evenly items-center border-b py-4 ">
                  <div
                    className="flex flex-col items-center justify-center"
                    onClick={handleClickLike}
                  >
                    <div className="w-14 h-14 rounded-full border-solid border-2 border-nesstLightGrey flex items-center justify-center">
                      <div>
                        {isLiked ? (
                          <Heart width={50} fill="#6e6e6e" stroke="#6e6e6e" />
                        ) : (
                          <Heart width={50} stroke="#6e6e6e" />
                        )}
                      </div>
                    </div>
                    <div className="text-center text-xs pt-2">
                      <p>
                        Add to<br></br>Favourites
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={handleClickNesst}
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="h-auto w-auto">
                      {isNessted ? (
                        <Image
                          src={logoGrey}
                          alt="nesst logo"
                          width={40}
                          height={40}
                          style={{ width: "auto", height: "auto" }}
                        />
                      ) : (
                        <Image
                          src={logoGreyEmpty}
                          alt="Empty nesst logo"
                          width={40}
                          height={40}
                          style={{ width: "auto", height: "auto" }}
                        />
                      )}
                    </div>
                    <div className="text-center text-xs pt-2">
                      <p>
                        Join<br></br>Nesst
                      </p>
                    </div>
                  </div>
                </div>
                <article>
                  <p className="font-medium border-b py-4">
                    {property.longDescription}
                  </p>
                </article>
              </CardDescription>
            </CardContent>
            <div className="md:flex flex-row items-center justify-evenly border-b">
              <div className="block">
                <h2 className="text-xl font-bold px-2 text-center">
                  Amenities
                </h2>
                <article className="grid grid-cols-2 sm:grid-cols-3 place-items-center gap-4 p-4 text-xs">
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
              </div>
              <div className="align-middle hidden md:block pb-4">
                <Carousel images={property.image} />
              </div>
            </div>
           
          </Card>
        ))}
        
        <article className="px-2 py-4 text-lg font-bold">
          <h2>The current users in this Nesst</h2>
          <div className="relative overflow-x-auto ">
            <div className="flex items-center ">
              {inNesst?.map((profile) => (
                <div
                  key={profile.profiles.id}
                  className="flex flex-col items-center py-4"
                  style={{ minWidth: "140px" }}
                >
                  <Link href={`/profile/${profile.profiles.username}`}>
                    <div className="px-4 ">
                      <div className="flex items-center">
                        <AvatarProfile
                          uid={profile.profiles.id}
                          url={
                            profile.profiles.avatar_url
                              ? `/${profile.profiles.avatar_url}`
                              : ""
                          }
                          size={80}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <p>{profile.profiles.username}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>
      <div className="md:hidden">
        <Footer pathnameUrl={pathname} />
      </div>
    </>
  );
};

export default PropertyId;
