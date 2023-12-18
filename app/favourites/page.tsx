"use client";
import Footer from "../components/Footer";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import { fetchLikedProperties } from "../hooks/fetchLikedProperties";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import React from "react";
import { useEffect, useState } from "react";
import { Session } from "@supabase/auth-helpers-nextjs";
import LikedPropertiesItem from "../components/LikedPropertiesItem";
import Link from "next/link";
import DesktopNav from "../components/DesktopNav";

interface PropertyData {
  id: string;
  name: string | null;
  description: string | null;
  image: string[] | null;
}

export default function Favourites() {
  const supabase = createClientComponentClient<Database>();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<null | any[]>(null);
  const pathname = usePathname();
  const isMobile = useMediaQuery({
    query: "(max-width:600px), { noSsr: true }",
  });
  const [likedProperties, setLikedProperties] = useState<PropertyData[] | null>(
    null
  );
  const [fetchError, setFetchError] = useState<string | null>(
    "error fetching profile"
  );

  // get session userid
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching session:", error);
          return;
        }
        if (data) {
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

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // check to see if session is undefined
        if (!session || !session.user || !session.user.id) {
          return;
        }
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session?.user?.id)
          .single();

        if (error) {
          setFetchError("error fetching profile");
          setProfile(null);
          console.error(error);
        }

        if (data) {
          setProfile([data]);
          setFetchError(null);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };

    fetchData();
  }, [session]); // eslint-disable-line

  //fetch liked properties
  useEffect(() => {
    const fetchLiked = async () => {
      try {
        if (session) {
          const userId = profile && profile[0]?.id;

          if (userId) {
            const data = await fetchLikedProperties(userId);
            setLikedProperties(data);
          }
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };

    fetchLiked();
  }, [session, profile]); // eslint-disable-line

  return (
    <>
      <DesktopNav />
      <main className="px-4 pt-4 flex flex-col items-center">
        <h1 className=" text-center text-2xl lg:text-3xl font-bold py-4 md:py-8 border-b">
          Favourites
        </h1>
        <div className="flex min-h-screen flex-col items-between px-4 lg:px-8 pb-2 w-full max-w-5xl lg:gap-8">
          {likedProperties?.map((property) => (
            <Link key={property.id} href={`/explore/${property.id}`}>
              <LikedPropertiesItem
                id={property.id}
                name={property.name}
                description={property.description}
                image={property.image}
              />
            </Link>
          ))}
        </div>
      </main>
      {isMobile && <Footer pathnameUrl={pathname} />}
    </>
  );
}
