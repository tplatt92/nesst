//can view the profile of other users by profile/username [and yourself if wanted]
"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { renderSocialLink, renderUserPhoto } from "../utils/helperFunctions";
import { fetchConnectionsData } from "../hooks/fetchConnections";
import { Session } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import AvatarProfile from "@/app/components/AvatarProfile";
import UserConnections from "./UserConnections";
import supabase from "../config/SuperbaseClient";

interface ConnectionData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  username: string | null;
}

type ProfileIdProps = {
  params: any | null;
  session: Session | null;
};

const ViewUserProfile: React.FC<ProfileIdProps> = ({ params, session }) => {
  const [connections, setConnections] = useState<ConnectionData[] | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(
    "error fetching properties"
  );
  const [profile, setProfile] = useState<null | any[]>(null);
  const pathname = usePathname();

  const router = useRouter();
  const user = params.user;
  const userId = session?.user;
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const fetchProfile = async () => {
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

    fetchProfile();
  }, [user, supabase]);

  useEffect(() => {
    const userData: string | undefined = userId?.id;
    if (userData) {
      fetchConnectionsData(userData).then((data) => setConnections(data));
    } else {
      console.error("User ID is undefined");
    }
  }, []); // eslint-disable-line

  //fetch profile data and map out; based on url pathname
  return (
    <>
      {profile?.map((profile) => (
        <div
          key={profile.id}
          className=" flex flex-col items-center overflow-x-hidden overflow-y-scroll bg-gray-200 "
        >
          <div className="flex flex-col py-20 items-center bg-[url('/backgroundImages/profile3.jpg')] relative bg-cover w-screen">
            <div className="pb-4">
              <AvatarProfile
                uid={profile.id}
                url={`/${profile.avatar_url}`}
                size={150}
              />
            </div>

            <h1 className="text-white text-4xl py-4 text-center">
              {profile.first_name} {profile.last_name}
            </h1>

            <h2 className="text-2xl text-white">{profile.username}</h2>
            <div className="pt-4 flex justify-center lg:justify-start">
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
              {renderUserPhoto("/userPhotos/user5.png", "user 1 Photo")}
              {renderUserPhoto("/userPhotos/user6.png", "user 2 Photo")}
              {renderUserPhoto("/userPhotos/user7.png", "user 3 Photo")}
              {renderUserPhoto("/userPhotos/user8.png", "user 4 Photo")}
            </div>
          </div>
          <div className="md:hidden">
            <Footer pathnameUrl={pathname} />
          </div>
        </div>
      ))}
    </>
  );
};

export default ViewUserProfile;
