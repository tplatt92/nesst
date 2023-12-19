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
import Image from "next/image";
import {
  Briefcase,
  MapPin,
  Bike,
  Map,
  Globe2,
  User,
  Sparkles,
} from "lucide-react";

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
  const [isConnected, setIsConnected] = useState<boolean>(false);
  // console.log(profile);
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

  // fetch profile data
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
  }, [user]); // eslint-disable-line

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
        } else {
          console.error("User session is undefined");
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };

    fetchConnections();
  }, [profile]); // eslint-disable-line

  //check if connected
  useEffect(() => {
    const checkIfConnected = async () => {
      try {
        const userId = profile && profile[0]?.id;
        console.log(userId);
        console.log(session?.user.id);
        const { data, error } = await supabase
          .from("connections")
          .select("*")
          .eq("friend_id", `${userId}`)
          .eq("user_id", `${session?.user?.id}`);

        console.log(data);
        if (error) {
          console.error("Error fetching connections:", error.message);
        } else {
          // console.log("Row fetched successfully:", data);
          if (data.length > 0) {
            setIsConnected(true);
          }
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };
    checkIfConnected();
  }, [profile]); // eslint-disable-line

  // // add connection to connections table

  const addToConnections = async () => {
    try {
      const userId = profile && profile[0]?.id;
      const { data, error } = await supabase
        .from("connnections")
        .insert({ user_id: `${session?.user?.id}`, friend_id: `${userId}` });

      if (error) {
        console.error("Error adding to connections:", error.message);
      } else {
        console.log("Row added successfully:", data);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  // // remove property from propertiesILiked

  // const removeProfileFromLikedColumn = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from("propertiesILiked")
  //       .delete()
  //       .eq("profile_id", `${userId}`)
  //       .eq("property_id", `${propertyId}`);

  //     if (error) {
  //       console.error("Error removing from liked column:", error.message);
  //     } else {
  //       console.log("Row deleted successfully:", data);
  //     }
  //   } catch (error) {
  //     console.error("An unexpected error occurred:", error);
  //   }
  // };

  // // handles liking and disliking on button click

  async function handleClick() {
    if (!isConnected) {
      addToConnections();
      //   } else {
      //     removeProfileFromLikedColumn();
      //   }
      setIsConnected((prev) => !prev);
    }
  }

  return (
    <>
      {profile?.map((profile) => (
        <div
          key={profile.id}
          className=" flex flex-col items-center h-screen overflow-x-hidden overflow-y-scroll bg-gray-200 "
        >
          <div className=" flex flex-col items-center h-screen relative lg:mt-12 lg:mb-32">
            {/* profile header */}
            <div className="relative">
              <div className="flex flex-col items-center lg:flex-row py-20 shadow-lg lg:gap-16 bg-[url('/backgroundImages/profile3.jpg')] relative bg-cover w-screen max-w-5xl  lg:rounded-lg">
                <div className="pb-4 lg:pb-0 lg:pl-24">
                  <AvatarProfile
                    uid={profile.id}
                    url={`/${profile.avatar_url}`}
                    size={150}
                  />
                </div>
                <div>
                  <h1 className="text-white text-4xl py-4 lg:pt-0">
                    {profile.first_name} {profile.last_name}
                  </h1>
                  {/* social links */}
                  <h2 className="text-2xl text-center lg:text-left pb-4 text-white">
                    {profile.username}
                  </h2>
                  <p className="text-md text-center lg:text-left text-white">
                    {profile.Location}
                  </p>
                  <div className="pt-4 flex" aria-label="Social icons list">
                    {renderSocialLink(
                      "/messages",
                      "/logos/instagramCircle.png",
                      "Instagram Logo"
                    )}
                    <Link href="/messages">
                      <ChatBubbleLeftEllipsisIcon className="h-10 text-white px-8" />
                    </Link>
                    {renderSocialLink(
                      "/messages",
                      "/logos/linkedinCircle.png",
                      "LinkedIn Logo"
                    )}
                  </div>
                  <button onClick={handleClick}>connect</button>
                </div>
              </div>
              {/* bio */}
              <div className="w-full flex flex-col items-center my-4 shadow-lg">
                <div className="bg-nesstDarkGrey w-11/12 lg:w-full max-w-5xl rounded-lg absolute lg:static left-[4%] top-[87%] -bottom-[17%] md:-bottom-[32%] px-4  text-white overflow-y-scroll md:overflow-hidden">
                  <div className=" flex flex-row justify-between">
                    <h3 className="py-2 font-semibold">About Me</h3>
                    <h3 className="py-2 font-semibold">{profile.age} y/o</h3>
                  </div>
                  <p className="pb-2">{profile.bio}</p>
                </div>
              </div>
            </div>
            {/* connections */}
            <div className="w-full mb-80 gap-4 px-5 lg:px-0 md:flex">
              <div className="flex-1 bg-white rounded-lg shadow-lg mt-28 md:mt-48 lg:mt-0 px-4 py-4 max-w-5xl ">
                <h3 className="pb-2 text-[#bfbfbf] font-semibold">
                  Connections
                </h3>
                <div className="md:flex md:gap-8">
                  <div className="flex flex-1 flex-col justify-evenly py-1 ">
                    <UserConnections connections={connections} />
                  </div>
                </div>
              </div>
              {/* get to know me */}
              <div>
                <div className="flex flex-1 flex-col mt-4 py-4  bg-white rounded-lg shadow-lg  md:mt-48 lg:mt-0 px-4 max-w-5xl ">
                  <h3 className="pb-2 text-[#bfbfbf] font-semibold">
                    Get to know me
                  </h3>

                  {profile.Nationality && (
                    <div className="py-2 flex gap-2">
                      <Map /> <p>{profile.Nationality}</p>
                    </div>
                  )}

                  {profile.personality_type && (
                    <div className="py-2 flex gap-2">
                      <User /> <p>{profile.personality_type}</p>
                    </div>
                  )}
                  {profile.occupation && (
                    <div className="py-2 flex gap-2">
                      <Briefcase /> <p>{profile.occupation}</p>
                    </div>
                  )}
                  {profile.languages && (
                    <div className="py-2 flex gap-2">
                      <Globe2 /> <p>{profile.languages.join(", ")}</p>
                    </div>
                  )}
                  {profile.star_sign && (
                    <div className="py-2 flex gap-2">
                      <Sparkles /> <p>{profile.star_sign}</p>
                    </div>
                  )}
                  {profile.Hobbies && (
                    <div className="py-2 flex gap-2">
                      <Bike /> <p>{profile.Hobbies.join(", ")}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col mt-4 mb-32 md:mb-0 py-4 bg-white rounded-lg shadow-lg px-4 max-w-5xl ">
                  <h3 className="pb-2 text-[#bfbfbf] font-semibold">
                    Current Nest
                  </h3>
                  <div className="flex gap-4">
                    <Image
                      src="/imagesTest/photo2.webp"
                      alt="profileNest"
                      width={80}
                      height={100}
                      className="rounded-r-full object-cover rounded-b-full border-4 border-gray-300"
                    />
                    <div>
                      <p className="font-bold">Spacious Town House</p>
                      <p>London</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer pathnameUrl={pathname} />
        </div>
      ))}
    </>
  );
};

export default ViewUserProfile;
