"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import React from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { renderSocialLink, renderUserPhoto } from "../utils/helperFunctions";
import { fetchConnectionsData } from "../hooks/fetchConnections";
import { Session } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import MessageContainerItem from "../components/MessageContainerItem";
import DesktopNav from "../components/DesktopNav";
import { fetchNesstsData } from "../hooks/fetchNessts";
import { NesstsData } from "../hooks/fetchNessts";
import NesstContainerItem from "../components/NesstContainerItem";

type ProfileIdProps = {};

interface ConnectionData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  username: string | null;
}

const Messages: React.FC<ProfileIdProps> = () => {
  const supabase = createClientComponentClient<Database>();
  const [session, setSession] = useState<Session | null>(null);
  const pathname = usePathname();
  const [connections, setConnections] = useState<ConnectionData[] | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(
    "error fetching profile"
  );
  const [profile, setProfile] = useState<null | any[]>(null);
  const [isNomads, setIsNomads] = useState<boolean>(false);
  const [nesst, setNesst] = useState<NesstsData[] | null>(null);

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

  // fetch connections

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        if (session) {
          const userId = profile && profile[0]?.id;
          if (userId) {
            const data = await fetchConnectionsData(userId);
            setConnections(data);
          } else {
            console.error("User ID is undefined in the session");
          }
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };

    fetchConnections();
  }, [profile]); // eslint-disable-line

  useEffect(() => {
    const fetchNessts = async () => {
      try {
        if (session) {
          const userId = profile && profile[0]?.id;
          if (userId) {
            const data = await fetchNesstsData(userId);
            setNesst(data);
          } else {
            console.error("User ID is undefined in the session");
          }
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };

    fetchNessts();
  }, [profile]); // eslint-disable-line
  return (
    <>
      <header className="hidden md:block p-0">
        <DesktopNav />
      </header>
      <div className="flex flex-col items-center w-screen">
        <main className="px-4 pt-4 max-w-5xl w-full">
          <h1 className=" text-center text-2xl font-bold py-4 md:py-8">
            Messages
          </h1>
          <div className="text-center flex justify-evenly font-bold border-b py-4">
            <button
              onClick={() => setIsNomads(true)}
              className={`${
                isNomads ? "text-nesstDarkGrey" : "text-nesstLightGrey"
              }`}
            >
              Nomads
            </button>
            <button
              onClick={() => setIsNomads(false)}
              className={`${
                !isNomads ? "text-nesstDarkGrey" : "text-nesstLightGrey"
              }`}
            >
              Nessts
            </button>
          </div>

          {isNomads
            ? connections?.map((connection) => (
                <Link key={connection.id} href={`/messages/${connection.id}`}>
                  <MessageContainerItem
                    id={connection.id}
                    first_name={connection.first_name}
                    last_name={connection.last_name}
                    avatar_url={connection.avatar_url}
                    username={connection.username}
                  />
                </Link>
              ))
            : nesst?.map((nesst) => (
                <Link key={nesst.id} href={`/messages/${nesst.id}`}>
                  <NesstContainerItem
                    id={nesst.id}
                    name={nesst.name}
                    description={nesst.description}
                    image={nesst.image}
                  />
                </Link>
              ))}
        </main>
      </div>
      <nav className="md:hidden">
        <Footer pathnameUrl={pathname} />
      </nav>
    </>
  );
};

export default Messages;
