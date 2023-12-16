"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { renderSocialLink, renderUserPhoto } from "../../utils/helperFunctions";
import { fetchConnectionsData } from "../../hooks/fetchConnections";
import { Session } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import AvatarProfile from "@/app/components/AvatarProfile";
import UserConnections from "../../components/UserConnections";
import supabase from "../../config/SuperbaseClient";

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

const ViewUserProfile: React.FC<ProfileIdProps> = ({ params }) => {
  const supabase = createClientComponentClient<Database>();
  const [session, setSession] = useState<Session | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const user = params.user;
  const [connections, setConnections] = useState<ConnectionData[] | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(
    "error fetching properties"
  );
  const [profile, setProfile] = useState<null | any[]>(null);

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
  }, []);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("username", user)
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
  }, [user]);

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
  }, [profile]);

  return (
    <>
      {profile?.map((profile) => (
        <div
          key={profile.id}
          className=" flex flex-col items-center h-screen overflow-x-hidden overflow-y-scroll bg-gray-200 "
        >
          <div className="flex flex-col py-20 items-center bg-[url('/backgroundImages/profile3.jpg')] relative bg-cover w-screen">
            <div className="pb-4">
              <AvatarProfile
                uid={profile.id}
                url={`/${profile.avatar_url}`}
                size={150}
              />
            </div>

            <h1 className="text-white text-4xl py-4">
              {profile.first_name} {profile.last_name}
            </h1>

            <h2 className="text-2xl text-white">{profile.username}</h2>
            <div className="pt-4 flex">
              {renderSocialLink(
                "/messages",
                "/logos/instagramCircle.png",
                "Instagram Logo"
              )}
              <Link href="/messages">
                <ChatBubbleLeftEllipsisIcon className="h-10 text-[#d9a66d] px-8" />
              </Link>
              {renderSocialLink(
                "/messages",
                "/logos/linkedinCircle.png",
                "LinkedIn Logo"
              )}
            </div>

            <div className="bg-[#d9a66d] w-11/12 rounded-lg absolute  top-[87%] -bottom-[17%] px-4 text-white overflow-y-scroll">
              <div className=" flex flex-row justify-between">
                <h3 className="py-2 font-semibold">About Me</h3>
                <h3 className="py-2 font-semibold">{profile.age} y/o</h3>
              </div>
              <p className="pb-2">{profile.bio}</p>
            </div>
          </div>

          <div className="w-11/12 bg-white rounded-lg mt-24 px-4 ">
            <h3 className="py-2 text-[#bfbfbf] font-semibold">Connections</h3>
            <div className="flex justify-evenly py-2">
              <UserConnections connections={connections} />
            </div>
          </div>
          <Footer pathnameUrl={pathname} />
        </div>
      ))}
    </>
  );
};

export default ViewUserProfile;
