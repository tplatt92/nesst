"use client";
import React from "react";
import supabase from "../../config/SuperbaseClient";
import { useEffect, useState } from "react";
import Footer from "@/app/components/Footer";
import AvatarProfile from "@/app/components/AvatarProfile";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";

type ProfileIdProps = {
  params: any | null;
};

const ProfieId: React.FC<ProfileIdProps> = ({ params }) => {
  const [profile, setProfile] = useState<null | any[]>(null);
  const [fetchError, setFetchError] = useState<string | null>(
    "error fetching profile"
  );
  const pathname = usePathname();
  const user = params.user;

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
    console.log(profile);
    fetchProfile();
  }, [user]);

  return (
    <>
      {profile?.map((profile) => (
        <div
          key={profile.id}
          className=" flex flex-col items-center h-screen overflow-x-hidden overflow-y-scroll bg-gray-200 "
        >
          <div className="flex flex-col py-20 items-center bg-[url('/backgroundImages/profile3.jpg')] relative bg-cover w-screen">
            <div className="pb-4">
              {/* <AvatarProfile
                uid={profile.id}
                url={profile.avatar_url}
                size={150}
              /> */}
            </div>
            <h1 className="text-white text-4xl py-4">
              {profile.first_name} {profile.last_name}
            </h1>
            <h2 className="text-2xl text-white">{profile.username}</h2>
            <div className="pt-4 flex">
              <Link href="/messages">
                <Image
                  src="/logos/instagramCircle.png"
                  height={40}
                  width={40}
                  alt="Instagram Logo"
                />
              </Link>
              <Link href="/messages">
                <ChatBubbleLeftEllipsisIcon className="h-10 text-[#d9a66d] px-8" />
              </Link>
              <Link href="/messages">
                <Image
                  src="/logos/linkedinCircle.png"
                  height={40}
                  width={40}
                  alt="Facebook Logo"
                />
              </Link>
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
              <Image
                src="/userPhotos/user5.png"
                height={50}
                width={50}
                alt="user 1 Photo"
                className="rounded-r-full object-cover rounded-b-full"
              />

              <Image
                src="/userPhotos/user6.png"
                height={50}
                width={50}
                alt="user 2 Photo"
                className="rounded-r-full object-cover rounded-b-full"
              />
              <Image
                src="/userPhotos/user7.png"
                height={50}
                width={50}
                alt="user 3 Photo"
                className="rounded-r-full object-cover rounded-b-full"
              />
              <Image
                src="/userPhotos/user8.png"
                height={50}
                width={50}
                alt="user 4 Photo"
                className="rounded-r-full object-cover rounded-b-full"
              />
            </div>
          </div>
          <Footer pathnameUrl={pathname} />
        </div>
      ))}
    </>
  );
};

export default ProfieId;
