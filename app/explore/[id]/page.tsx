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
  }, []);
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
          <CardFooter className="flex justify-between">
            <p className="font-medium">£{property.price}/month</p>
            <p className="text-gray-400">
              {property.available ? "Available" : "Unavailable"}
            </p>
          </CardFooter>
        </Card>
      ))}
    </>
  );}

  
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
      