"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import { useRouter, usePathname } from "next/navigation";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import AvatarProfile from "./AvatarProfile";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Footer from "./Footer";
import { profileData } from "@/types/types";
import { renderSocialLink, renderUserPhoto } from "../utils/helperFunctions";

export default function UserProfile({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<profileData>({
    firstName: null,
    lastName: null,
    username: null,
    age: null,
    bio: null,
    avatar_url: null,
    drinker: null,
    smoker: false,
  });

  const user = session?.user;

  const router = useRouter();
  const pathname = usePathname();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(
          `first_name, last_name, username, age, avatar_url, bio, drinker, smoker`
        )
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          firstName: data.first_name,
          lastName: data.last_name,
          username: data.username,
          age: data.age,
          bio: data.bio,
          drinker: data.drinker,
          smoker: data.smoker,
          avatar_url: data.avatar_url,
        }));
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  return (
    <>
      <div className=" flex flex-col items-center h-screen overflow-x-hidden overflow-y-scroll bg-gray-200 ">
        <div className="absolute right-8 top-8 z-50 w-6">
          <Link href="/profile/edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#d9a66d"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </Link>
        </div>
        <div className="flex flex-col py-20 items-center bg-[url('/backgroundImages/profile3.jpg')] relative bg-cover w-screen">
          <div className="pb-4">
            <AvatarProfile
              uid={user?.id ?? ""}
              url={profileData.avatar_url}
              size={150}
            />
          </div>
          <h1 className="text-white text-4xl py-4">
            {profileData.firstName} {profileData.lastName}
          </h1>
          <h2 className="text-2xl text-white">{profileData.username}</h2>
          <div className="pt-4 flex" aria-label="Social icons list">
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
              <h3 className="py-2 font-semibold">{profileData.age} y/o</h3>
            </div>
            <p className="pb-2">{profileData.bio}</p>
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
        <Footer pathnameUrl={pathname} />
      </div>
    </>
  );
}
