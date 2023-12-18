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

type ProfileIdProps = {
  params: any | null;
};

interface ConnectionData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  username: string | null;
}

interface MessageContainerItemProps {
  connections: ConnectionData[] | null;
}

const Messages: React.FC<ProfileIdProps> = () => {
  const supabase = createClientComponentClient<Database>();
  const [session, setSession] = useState<Session | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [connections, setConnections] = useState<ConnectionData[] | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(
    "error fetching profile"
  );
  const [profile, setProfile] = useState<null | any[]>(null);
  const [isNomads, setIsNomads] = useState<boolean>(true);

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

  // fetch connections

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        if (session) {
          console.log("Session object:", session);

          const userId = profile && profile[0]?.id;
          console.log(userId);

          if (userId) {
            const data = await fetchConnectionsData(userId);
            setConnections(data);
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

    fetchConnections();
  }, [profile]); // eslint-disable-line

  return (
    <>
      <DesktopNav />
      <main className="px-4 pt-4">
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
            Nests
          </button>
        </div>

        {isNomads ? (
          connections?.map((connection) => (
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
        ) : (
          <h1>This</h1>
        )}
      </main>
      <Footer pathnameUrl={pathname} />
    </>
  );
};

export default Messages;
