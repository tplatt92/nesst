"use client";
import React from "react";
import supabase from "../../config/SuperbaseClient";
import { useEffect, useState } from "react";
import ExploreNav from "../../components/ExploreNav";
import Footer from "@/app/components/Footer";
import { useMediaQuery } from "react-responsive";
import Carousel from "../../components/CardCarousell";
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
import { Heart } from "lucide-react";
import CalendarWidget from "@/app/components/Calendar";

type PropertyIdProps = {
  params: any;
};

const PropertyId: React.FC<PropertyIdProps> = ({ params }) => {
  const [availability, setAvailability] = useState<null | any[]>(null);
  const [properties, setProperties] = useState<null | any[]>(null);
  const [fetchError, setFetchError] = useState<string | null>(
    "error fetching properties"
  );
  const [isLiked, setIsLiked] = useState(false);

  const pathname = usePathname();
  const id = params.id;

  // const fetchProfile = async () => {
  //   const { data, error } = await supabase
  //     .from("profiles")
  //     .select("id")
  //     .eq("id", id);
  // };
  //joining tables
  // const joiningTables = async () => {
  // const { data, error } = await supabase.from("profiles").select(`
  //   id,
  //   properties (
  //     who_has_liked
  //   )
  // `);
  //   }

  const isMobile = useMediaQuery({
    query: "(max-width:600px), { noSsr: true }",
  });

  const addToLikedColumn = async () => {
    const { data, error } = await supabase
      .from("properties")
      .update({ who_has_liked: ["please work"] })
      .eq("id", id);
    console.log(id);
  };

  const removeProfileFromLikedColumn = async () => {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id);
    const array = data[0].who_has_liked;
    console.log(array);
    const index = array.indexOf("ioana");
    array.splice(index, 1);
    console.log(array);
    try {
      await supabase
        .from("properties")
        .update({ who_has_liked: array })
        .eq("id", id);
    } catch (error) {
      console.error(error.message);
    }
  };

  function handleClick() {
    if (!isLiked) {
      addToLikedColumn();
    } else {
      removeProfileFromLikedColumn();
    }
    setIsLiked((prev) => !prev);
  }

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
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
  }, [id]);
  console.log(properties);

  return (
    <>
      <main className="px-4 pt-4 pb-32">
        <ExploreNav setProperties={setProperties} />
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
              <Carousel images={property.image} />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl font-monserrat font-semibold">
                <div className="flex justify-between">
                  {property.name}
                  <p className="text-sm ">
                    {" "}
                    {property.area} m<sup>2</sup>
                  </p>
                </div>
                <p className="text-[1rem] py-1">{property.location}</p>
              </CardTitle>
              <CardDescription className="text-black text-base font-medium pb-4">
                <div className="flex gap-4 items-center justify-between border-b pb-4">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-2">
                      <span
                        dangerouslySetInnerHTML={{
                          __html:
                            '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/></svg>',
                        }}
                      />
                      <p>{property.beds}</p>
                    </span>

                    <span className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="16"
                        viewBox="0 0 512 512"
                        style={{ marginRight: "4px" }}
                      >
                        <path d="M96 77.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9C130 91.8 128 101.7 128 112c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9c-7.9-7.9-19.8-9.1-29-3.8C246 39.2 227.9 32 208 32c-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0C66.6 0 32 34.6 32 77.3V256c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H96V77.3zM32 352v16c0 28.4 12.4 54 32 71.6V480c0 17.7 14.3 32 32 32s32-14.3 32-32V464H384v16c0 17.7 14.3 32 32 32s32-14.3 32-32V439.6c19.6-17.6 32-43.1 32-71.6V352H32z" />
                      </svg>
                      <p>{property.bathrooms}</p>
                    </span>
                  </div>
                  <p className="font-medium text-sm">
                    £ {property.price}/month - £{" "}
                    {Math.round(property.price / property.beds)}/pp
                  </p>
                </div>
                <div className="flex justify-center items-center py-4 border-b gap-4">
                  <div className="text-black">
                    <CalendarWidget />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-nesstYellow text-black font-bold px-4 py-2 rounded-lg font-4"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
                <article>
                  <p className="font-medium border-b py-4">
                    {property.longDescription}
                  </p>
                </article>
              </CardDescription>
            </CardContent>

            <h2 className="text-xl font-bold px-2">Amenities</h2>
            <article className="grid grid-cols-2 place-items-center gap-4 p-4 text-xs border-b">
              <span className="font-medium flex flex-col items-center">
                {property.TV ? (
                  <svg
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.862 31.5215H25.793V33.4985H19.862V31.5215ZM15.908 33.4985V35.4755H29.747V33.4985H27.77V31.5215L28.8402 31.5175L29.0551 31.5123C31.6858 31.4002 31.5421 30.3182 28.8837 30.3182L16.4787 30.3274C13.848 30.4394 13.9903 31.5215 16.6487 31.5215H17.885V33.4985H15.908Z"
                      fill="#8f8f8f"
                    />
                    <path
                      d="M12.9425 11.7515H32.7125L32.8865 11.7568C34.443 11.8464 35.678 13.138 35.678 14.717V26.579L35.6727 26.753C35.5831 28.3095 34.2915 29.5445 32.7125 29.5445H12.9425L12.7685 29.5392C11.212 29.4496 9.977 28.158 9.977 26.579V14.717L9.98227 14.543C10.0719 12.9865 11.3635 11.7515 12.9425 11.7515ZM27.77 31.5215H32.7125L32.9273 31.5175C35.5581 31.4055 37.655 29.2374 37.655 26.579V14.717L37.651 14.5022C37.539 11.8714 35.3709 9.7745 32.7125 9.7745H12.9425L12.7277 9.77845C10.0969 9.89048 8 12.0586 8 14.717V26.579L8.00395 26.7938C8.11598 29.4246 10.2841 31.5215 12.9425 31.5215H17.885H27.77Z"
                      fill="#8f8f8f"
                    />
                  </svg>
                ) : null}

                {property.TV ? <p>TV</p> : null}
              </span>
              <span className="font-medium flex flex-col items-center">
                {property.Desk ? (
                  <svg
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 22.375H38"
                      stroke-width="2"
                      stroke-linejoin="round"
                      stroke="#8f8f8f"
                    />
                    <path
                      d="M11 36.375V22.375"
                      stroke-width="2"
                      stroke-linejoin="round"
                      stroke="#8f8f8f"
                    />
                    <path
                      d="M35 36.375V22.375"
                      stroke-width="2"
                      stroke-linejoin="round"
                      stroke="#8f8f8f"
                    />
                    <path
                      d="M11 22.375H35V30.375C35 32.032 33.657 33.375 32 33.375H14C12.343 33.375 11 32.032 11 30.375V22.375Z"
                      stroke-width="2"
                      stroke-linejoin="round"
                      stroke="#8f8f8f"
                    />
                    <path
                      d="M31 21.375V15.375"
                      stroke-width="2"
                      stroke-linejoin="round"
                      stroke="#8f8f8f"
                    />
                    <path
                      d="M29 9.375H33L35 16.375H27L29 9.375Z"
                      stroke-width="2"
                      stroke-linejoin="round"
                      stroke="#8f8f8f"
                    />
                    <path
                      d="M14 17.375H19V22.375H14V17.375Z"
                      stroke-width="2"
                      stroke-linejoin="round"
                      stroke="#8f8f8f"
                    />
                    <path
                      d="M15.792 17.403L14 13.375"
                      stroke-width="2"
                      stroke-linejoin="round"
                      stroke="#8f8f8f"
                    />
                  </svg>
                ) : null}{" "}
                {property.Desk ? "Desk" : null}
              </span>
              <span className="font-medium flex flex-col items-center">
                {property.Washer ? (
                  <svg
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2_1380)">
                      <path
                        d="M55.8141 59.875C55.8141 57.151 55.8141 54.415 55.8141 51.604C55.8141 48.793 55.8141 45.905 55.8141 42.875C55.8141 39.78 56.2261 35.917 56.4321 32.509C56.6381 29.101 56.6371 26.149 55.8141 24.875C55.7481 24.774 55.0751 24.774 54.3791 24.799C53.6841 24.824 52.9661 24.875 52.8141 24.875C48.7041 24.875 48.0151 23.171 45.8141 21.875C43.4831 20.502 42.6641 19.829 39.8141 19.875C33.9331 19.97 31.5791 24.976 26.8141 24.875C21.9711 24.773 18.1401 18.732 13.8141 18.875C9.89213 19.005 6.18913 24.852 1.81413 24.875C-3.36788 24.903 -5.94787 18.856 -10.1859 20.875C-8.45887 34.259 -12.6889 46.588 -10.1859 52.875C-9.66587 54.181 -6.97687 55.681 -5.18587 56.875C-2.65987 58.56 -0.798875 59.883 1.81413 59.875C6.42513 59.861 9.37113 53.817 14.8141 53.875C18.6921 53.916 23.3351 59.983 27.8141 59.875C33.1761 59.745 34.9671 53.69 40.8141 53.875C46.4791 54.055 48.5351 61.867 55.8141 59.875Z"
                        stroke-width="2"
                        stroke="#8f8f8f"
                      />
                      <path
                        d="M10.8141 9.875H34.8141C35.3661 9.875 35.8141 10.323 35.8141 10.875V34.875C35.8141 35.427 35.3661 35.875 34.8141 35.875H10.8141C10.2621 35.875 9.81415 35.427 9.81415 34.875V10.875C9.81415 10.323 10.2621 9.875 10.8141 9.875Z"
                        stroke-width="2"
                        stroke="#8f8f8f"
                      />
                      <path
                        d="M22.8141 14.875C27.2321 14.875 30.8141 18.457 30.8141 22.875C30.8141 27.293 27.2321 30.875 22.8141 30.875C18.3961 30.875 14.8141 27.293 14.8141 22.875C14.8141 18.457 18.3961 14.875 22.8141 14.875Z"
                        stroke-width="2"
                        stroke="#8f8f8f"
                      />
                      <path
                        d="M13.8141 12.875C14.3661 12.875 14.8141 13.323 14.8141 13.875C14.8141 14.427 14.3661 14.875 13.8141 14.875C13.2621 14.875 12.8141 14.427 12.8141 13.875C12.8141 13.323 13.2621 12.875 13.8141 12.875Z"
                        fill="#8f8f8f"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2_1380">
                        <rect width="45" height="45" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                ) : null}
                {property.Washer ? "Washer" : null}
              </span>
              <span className="font-medium flex flex-col items-center">
                {property.SmokeAlarm ? (
                  <svg
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30 14.75C30.552 14.75 31 15.198 31 15.75C31 16.302 30.552 16.75 30 16.75C29.448 16.75 29 16.302 29 15.75C29 15.198 29.448 14.75 30 14.75Z"
                      fill="#8f8f8f"
                    />
                    <path
                      d="M23 8.75C30.732 8.75 37 15.018 37 22.75C37 30.482 30.732 36.75 23 36.75C15.268 36.75 9 30.482 9 22.75C9 15.018 15.268 8.75 23 8.75Z"
                      stroke="#8f8f8f"
                      stroke-width="2"
                    />
                    <path
                      d="M27.889 23.75C27.491 25.703 25.957 27.246 24 27.644V29.672C24.089 29.659 24.178 29.651 24.266 29.635C27.146 29.109 29.411 26.816 29.901 23.929C29.911 23.87 29.908 23.809 29.916 23.75H27.889Z"
                      fill="#8f8f8f"
                    />
                    <path
                      d="M29.904 21.581C29.408 18.635 27.094 16.329 24.147 15.843C24.099 15.835 24.048 15.839 24 15.832V17.861C25.961 18.259 27.492 19.788 27.89 21.75H29.918C29.91 21.694 29.913 21.636 29.904 21.581Z"
                      fill="#8f8f8f"
                    />
                    <path
                      d="M22 27.639C20.041 27.24 18.508 25.712 18.11 23.75H16.086C16.095 23.815 16.092 23.882 16.103 23.947C16.608 26.875 18.916 29.169 21.846 29.655C21.896 29.663 21.949 29.661 22 29.668V27.639Z"
                      fill="#8f8f8f"
                    />
                    <path
                      d="M18.113 21.75C18.511 19.795 20.036 18.255 22 17.856V15.84C21.908 15.853 21.811 15.85 21.72 15.867C18.802 16.407 16.537 18.739 16.082 21.673C16.078 21.698 16.08 21.724 16.076 21.75H18.113Z"
                      fill="#8f8f8f"
                    />
                    <path
                      d="M23 20.75C24.105 20.75 25 21.645 25 22.75C25 23.855 24.105 24.75 23 24.75C21.895 24.75 21 23.855 21 22.75C21 21.645 21.895 20.75 23 20.75Z"
                      stroke="#8f8f8f"
                      stroke-width="2"
                    />
                  </svg>
                ) : null}
                {property.SmokeAlarm ? "Smoke Alarm" : null}
              </span>
              <span className="font-medium flex flex-col items-center">
                {property.wifi ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#8f8f8f"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                    />
                  </svg>
                ) : null}
                {property.wifi ? "Wifi" : null}
              </span>
              <span className="font-medium flex flex-col items-center">
                {property.Aircon ? (
                  <svg
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.0261 7.548V11.578L27.0521 9.253L28.0521 10.986L23.0261 13.887V20.815L29.0261 17.351V11.548H31.0261V16.196L34.5171 14.182L35.5171 15.914L32.0261 17.929L36.0521 20.253L35.0521 21.986L30.0261 19.083L24.0261 22.547L30.0271 26.012L35.0521 23.11L36.0521 24.842L32.0261 27.166L35.5171 29.182L34.5171 30.914L31.0261 28.899V33.548H29.0261V27.744L23.0261 24.279V31.208L28.0521 34.11L27.0521 35.842L23.0261 33.517V37.548H21.0261V33.517L17.0001 35.842L16.0001 34.11L21.0261 31.208V24.279L15.0261 27.743V33.548H13.0261V28.898L9.53606 30.914L8.53606 29.182L12.0251 27.166L8.00006 24.842L9.00006 23.11L14.0251 26.011L20.0251 22.547L14.0261 19.083L9.00006 21.986L8.00006 20.253L12.0261 17.929L8.53606 15.914L9.53606 14.182L13.0261 16.196V11.548H15.0261V17.351L21.0261 20.815V13.887L16.0001 10.986L17.0001 9.253L21.0261 11.578V7.548H23.0261Z"
                      fill="#8f8f8f"
                    />
                  </svg>
                ) : null}
                {property.Aircon ? "Aircon" : null}
              </span>
              <span className="font-medium flex flex-col items-center">
                {property.Kitchen ? (
                  <svg
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#8f8f8f"
                  >
                    <path
                      d="M11 9.5H35C35.552 9.5 36 9.948 36 10.5V34.5C36 35.052 35.552 35.5 35 35.5H11C10.448 35.5 10 35.052 10 34.5V10.5C10 9.948 10.448 9.5 11 9.5Z"
                      stroke-width="2"
                      stroke="#8f8f8f"
                    />
                    <path d="M36 17.5H10" stroke-width="2" stroke="#8f8f8f" />
                    <path
                      d="M32 12.5C32.552 12.5 33 12.948 33 13.5C33 14.052 32.552 14.5 32 14.5C31.448 14.5 31 14.052 31 13.5C31 12.948 31.448 12.5 32 12.5Z"
                      fill="#8f8f8f"
                    />
                    <path
                      d="M26 12.5C26.552 12.5 27 12.948 27 13.5C27 14.052 26.552 14.5 26 14.5C25.448 14.5 25 14.052 25 13.5C25 12.948 25.448 12.5 26 12.5Z"
                      fill="#8f8f8f"
                    />
                    <path
                      d="M20 12.5C20.552 12.5 21 12.948 21 13.5C21 14.052 20.552 14.5 20 14.5C19.448 14.5 19 14.052 19 13.5C19 12.948 19.448 12.5 20 12.5Z"
                      fill="#8f8f8f"
                    />
                    <path
                      d="M14 12.5C14.552 12.5 15 12.948 15 13.5C15 14.052 14.552 14.5 14 14.5C13.448 14.5 13 14.052 13 13.5C13 12.948 13.448 12.5 14 12.5Z"
                      fill="#8f8f8f"
                    />
                    <path
                      d="M14 21.5H32V31.5H14V21.5Z"
                      stroke-width="2"
                      stroke="#8f8f8f"
                    />
                    <path d="M36 17.5H10" stroke-width="2" stroke="#8f8f8f" />
                  </svg>
                ) : null}
                {property.Kitchen ? "Kitchen" : null}
              </span>
              <span className="font-medium flex flex-col items-center">
                {property.Parking ? (
                  <svg
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                    stroke="#8f8f8f"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32 29.6256H36V32.6256C36 33.1776 35.552 33.6256 35 33.6256H33C32.448 33.6256 32 33.1776 32 32.6256V29.6256Z"
                      stroke="#8f8f8f"
                      stroke-width="2"
                    />
                    <path
                      d="M10 29.6256H14V32.6256C14 33.1776 13.552 33.6256 13 33.6256H11C10.448 33.6256 10 33.1776 10 32.6256V29.6256Z"
                      stroke="#8f8f8f"
                      stroke-width="2"
                    />
                    <path
                      d="M14 19.6256H32C34.209 19.6256 36 21.4166 36 23.6256V28.6256C36 29.1776 35.552 29.6256 35 29.6256H11C10.448 29.6256 10 29.1776 10 28.6256V23.6256C10 21.4166 11.791 19.6256 14 19.6256Z"
                      stroke="#8f8f8f"
                      stroke-width="2"
                    />
                    <path
                      d="M32 23.6256C32.552 23.6256 33 24.0736 33 24.6256C33 25.1776 32.552 25.6256 32 25.6256C31.448 25.6256 31 25.1776 31 24.6256C31 24.0736 31.448 23.6256 32 23.6256Z"
                      fill="#8f8f8f"
                    />
                    <path
                      d="M14 23.6256C14.552 23.6256 15 24.0736 15 24.6256C15 25.1776 14.552 25.6256 14 25.6256C13.448 25.6256 13 25.1776 13 24.6256C13 24.0736 13.448 23.6256 14 23.6256Z"
                      fill="#8f8f8f"
                    />
                    <path
                      d="M15.693 11.6256H30.307C30.724 11.6256 31.097 11.8846 31.243 12.2746L34 19.6256H12L14.757 12.2746C14.903 11.8846 15.276 11.6256 15.693 11.6256Z"
                      stroke-width="2"
                    />
                    <path d="M9 16.6256H12V18.6256H9V16.6256Z" fill="8f8f8f" />
                    <path d="M34 16.6256H37V18.6256H34V16.6256Z" />
                    <path d="M17 24.6256H29" stroke-width="2" fill="#8f8f8f" />
                  </svg>
                ) : null}
                {property.Parking ? "Parking" : null}
              </span>
              <span className="font-medium flex flex-col items-center">
                {property.Pool ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="35"
                      width="35"
                      viewBox="0 0 576 512"
                      fill="#8f8f8f"
                    >
                      <path d="M309.5 178.4L447.9 297.1c-1.6 .9-3.2 2-4.8 3c-18 12.4-40.1 20.3-59.2 20.3c-19.6 0-40.8-7.7-59.2-20.3c-22.1-15.5-51.6-15.5-73.7 0c-17.1 11.8-38 20.3-59.2 20.3c-10.1 0-21.1-2.2-31.9-6.2C163.1 193.2 262.2 96 384 96h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-26.9 0-52.3 6.6-74.5 18.4zM160 160A64 64 0 1 1 32 160a64 64 0 1 1 128 0zM306.5 325.9C329 341.4 356.5 352 384 352c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 405.7 417 416 384 416c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 341.2 165.1 352 192 352c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z" />
                    </svg>
                    <p>Pool</p>
                  </>
                ) : null}
              </span>
              <span className="font-medium flex flex-col items-center">
                {property.Pets ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="30"
                      width="30"
                      viewBox="0 0 512 512"
                      fill="#8f8f8f"
                    >
                      <path d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z" />
                    </svg>
                    <p>Pets</p>
                  </>
                ) : null}
              </span>
            </article>
          </Card>
        ))}
        <article className="px-2 py-4 text-lg font-bold">
          <h2>These people also liked this property...</h2>
        </article>
      </main>
      {isMobile && <Footer pathnameUrl={pathname} />}
    </>
  );
};

export default PropertyId;
