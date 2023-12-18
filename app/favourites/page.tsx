// import NextJsCarousel from "../components/CardCarousell";
"use client";
import ExploreNav from "../components/ExploreNav";
import Footer from "../components/Footer";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import { fetchLikedProperties } from "../hooks/fetchLikedProperties";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import React from "react";
import { useEffect, useState } from "react";
import { Session } from "@supabase/auth-helpers-nextjs";

interface PropertyData {
  id: string;
  name: string | null;
  description: string | null;
  image: string[] | null;
}
const userId = "8d707790-820f-4ec5-b00d-111e9673995f";

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
  const [properties, setProperties] = useState<null | any[]>(null);

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
          console.log(session?.user ?? null);
          setSession(data?.session ?? null);
        } else {
          setSession(null);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };
    console.log(session);
    fetchSession();
  }, []); // eslint-disable-line

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
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
          console.log("Session object:", session);

          const userId = profile && profile[0]?.id;
          console.log(userId);

          if (userId) {
            const data = await fetchLikedProperties(userId);
            setLikedProperties(data);
          } else {
            console.error("User ID is undefined in the session");
          }
        } else {
          console.error("User session is undefined");
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };

    fetchLiked();
  }, [likedProperties]); // eslint-disable-line

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-4 lg:px-8 pb-2">
        <ExploreNav setProperties={setProperties} />
        {isMobile && <Footer pathnameUrl={pathname} />}
      </main>
    </>
  );
}
