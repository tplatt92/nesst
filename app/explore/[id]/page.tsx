//  for propertty page
//   useEffect(() => {
//     const fetchAvailability = async () => {
//       try {
//         const { data, error } = await supabase.from("availability").select("*");

//         if (error) {
//           setFetchError("error fetching properties");
//           setAvailability(null);
//           console.error(error);
//         }
//         if (data) {
//           setAvailability(data);
//           setFetchError(null);
//         }
//       } catch (error) {
//         console.error("An unexpected error occurred:", error);
//       }
//     };
//     fetchAvailability();
//   }, []);
"use client";
import React from "react";
import supabase from "../../config/SuperbaseClient";
import { useEffect, useState } from "react";
import Footer from "@/app/components/Footer";
import Carousel from "../../components/CardCarousell";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
type PropertyIdProps = {
  params: any;
};
const PropertyId: React.FC<PropertyIdProps> = ({ params }) => {
  const [availability, setAvailability] = useState<null | any[]>(null);
  const [properties, setProperties] = useState<null | any[]>(null);
  const [fetchError, setFetchError] = useState<string | null>(
    "error fetching properties"
  );
  const id = params.id;
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
  return (
    <>
      {properties?.map((property) => (
        <Card key={property.id}>
          <CardHeader className="relative">
            <Carousel images={property.image} />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-xl font-monserrat font-semibold">
              {property.name}
            </CardTitle>
            <CardDescription className="text-yellow-600 text-base font-medium">
              {property.location}
            </CardDescription>
          </CardContent>
          <CardFooter
            className="flex flex-col justify-between"
            style={{ alignItems: "flex-start" }}
          >
            <p className="font-medium">{property.description}</p>
            <p className="font-medium">£{property.price}/month</p>
            <p className="text-gray-400 ">{property.date}</p>
            <p className="font-medium">
              {property.wifi ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                  />
                </svg>
              ) : null}
            </p>

            <p className="text-gray-400">
              <span style={{ display: "flex", alignItems: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 512 512"
                  style={{ marginRight: "4px" }}
                >
                  <path d="M96 77.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9C130 91.8 128 101.7 128 112c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9c-7.9-7.9-19.8-9.1-29-3.8C246 39.2 227.9 32 208 32c-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0C66.6 0 32 34.6 32 77.3V256c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H96V77.3zM32 352v16c0 28.4 12.4 54 32 71.6V480c0 17.7 14.3 32 32 32s32-14.3 32-32V464H384v16c0 17.7 14.3 32 32 32s32-14.3 32-32V439.6c19.6-17.6 32-43.1 32-71.6V352H32z" />
                </svg>
                {property.bathrooms}
              </span>
            </p>
            <p className="text-gray-400 ">
              {" "}
              Area ={property.area} m<sup>2</sup>
            </p>
            <p className="font-medium">
              {property.available ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="18"
                  viewBox="0 0 576 512"
                >
                  <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                </svg>
              ) : (
                "NOT AVAIL"
              )}
            </p>
            <p className="font-medium">
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
                    fill="#3C3C3C"
                  />
                </svg>
              ) : null}
            </p>
            <p className="font-medium">
              {property.Parking ? (
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32 29.6256H36V32.6256C36 33.1776 35.552 33.6256 35 33.6256H33C32.448 33.6256 32 33.1776 32 32.6256V29.6256Z"
                    stroke="#3C3C3C"
                    stroke-width="2"
                  />
                  <path
                    d="M10 29.6256H14V32.6256C14 33.1776 13.552 33.6256 13 33.6256H11C10.448 33.6256 10 33.1776 10 32.6256V29.6256Z"
                    stroke="#3C3C3C"
                    stroke-width="2"
                  />
                  <path
                    d="M14 19.6256H32C34.209 19.6256 36 21.4166 36 23.6256V28.6256C36 29.1776 35.552 29.6256 35 29.6256H11C10.448 29.6256 10 29.1776 10 28.6256V23.6256C10 21.4166 11.791 19.6256 14 19.6256Z"
                    stroke="#3C3C3C"
                    stroke-width="2"
                  />
                  <path
                    d="M32 23.6256C32.552 23.6256 33 24.0736 33 24.6256C33 25.1776 32.552 25.6256 32 25.6256C31.448 25.6256 31 25.1776 31 24.6256C31 24.0736 31.448 23.6256 32 23.6256Z"
                    fill="#3C3C3C"
                  />
                  <path
                    d="M14 23.6256C14.552 23.6256 15 24.0736 15 24.6256C15 25.1776 14.552 25.6256 14 25.6256C13.448 25.6256 13 25.1776 13 24.6256C13 24.0736 13.448 23.6256 14 23.6256Z"
                    fill="#3C3C3C"
                  />
                  <path
                    d="M15.693 11.6256H30.307C30.724 11.6256 31.097 11.8846 31.243 12.2746L34 19.6256H12L14.757 12.2746C14.903 11.8846 15.276 11.6256 15.693 11.6256Z"
                    stroke="#3C3C3C"
                    stroke-width="2"
                  />
                  <path d="M9 16.6256H12V18.6256H9V16.6256Z" fill="#3C3C3C" />
                  <path d="M34 16.6256H37V18.6256H34V16.6256Z" fill="#3C3C3C" />
                  <path d="M17 24.6256H29" stroke="#3C3C3C" stroke-width="2" />
                </svg>
              ) : null}
            </p>
            <p className="font-medium">
              {property.Kitchen ? (
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 9.5H35C35.552 9.5 36 9.948 36 10.5V34.5C36 35.052 35.552 35.5 35 35.5H11C10.448 35.5 10 35.052 10 34.5V10.5C10 9.948 10.448 9.5 11 9.5Z"
                    stroke="#3C3C3C"
                    stroke-width="2"
                  />
                  <path d="M36 17.5H10" stroke="#3C3C3C" stroke-width="2" />
                  <path
                    d="M32 12.5C32.552 12.5 33 12.948 33 13.5C33 14.052 32.552 14.5 32 14.5C31.448 14.5 31 14.052 31 13.5C31 12.948 31.448 12.5 32 12.5Z"
                    fill="#3C3C3C"
                  />
                  <path
                    d="M26 12.5C26.552 12.5 27 12.948 27 13.5C27 14.052 26.552 14.5 26 14.5C25.448 14.5 25 14.052 25 13.5C25 12.948 25.448 12.5 26 12.5Z"
                    fill="#3C3C3C"
                  />
                  <path
                    d="M20 12.5C20.552 12.5 21 12.948 21 13.5C21 14.052 20.552 14.5 20 14.5C19.448 14.5 19 14.052 19 13.5C19 12.948 19.448 12.5 20 12.5Z"
                    fill="#3C3C3C"
                  />
                  <path
                    d="M14 12.5C14.552 12.5 15 12.948 15 13.5C15 14.052 14.552 14.5 14 14.5C13.448 14.5 13 14.052 13 13.5C13 12.948 13.448 12.5 14 12.5Z"
                    fill="#3C3C3C"
                  />
                  <path
                    d="M14 21.5H32V31.5H14V21.5Z"
                    stroke="#3C3C3C"
                    stroke-width="2"
                  />
                  <path d="M36 17.5H10" stroke="#3C3C3C" stroke-width="2" />
                </svg>
              ) : null}
            </p>
            <p className="font-medium">{property.TV ? "tv" : "no tv"}</p>
          </CardFooter>
        </Card>
      ))}
      <Footer />
    </>
  );
};

export default PropertyId;
// export default function PropertyPage() {

//   const getProperties = useCallback(async () => {
//     try {
//       setLoading(true);

//       const { data, error, status } = await supabase
//         .from("profiles")
//         .select(
//           '*'
//         )
//         .eq("id", properties?.id)
//         .single();

//       if (error && status !== 406) {
//         throw error;
//       }

//       if (data) {

//       }
//     } catch (error) {
//       alert("Error loading user data!");
//     } finally {
//       setLoading(false);
//     }
//   }, [user, supabase]);

//   useEffect(() => {
//     getProfile();
//   }, [user, getProfile]);
//   return <h1>Property</h1>;
// }
