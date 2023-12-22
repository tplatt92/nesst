"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Session } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import AvatarProfile from "./AvatarProfile";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Footer from "./Footer";
import { useUserProfile } from "../hooks/useUserProfile";
import { renderSocialLink, renderUserPhoto } from "../utils/helperFunctions";
import { fetchConnectionsData } from "../hooks/fetchConnections";
import UserConnections from "./UserConnections";
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

interface ConnectionData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  username: string | null;
}

export default function UserProfile({ session }: { session: Session | null }) {
  const [connections, setConnections] = useState<ConnectionData[] | null>(null);
  const user = session?.user;

  const router = useRouter();
  const pathname = usePathname();

  // gets profile
  const { loading, formData, setFormData, setLoading } = useUserProfile(
    user?.id ?? ""
  );

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      firstName: formData.first_name,
      lastName: formData.last_name,
      username: formData.username,
      age: formData.age,
      bio: formData.bio,
      drinker: formData.drinker,
      smoker: formData.smoker,
      avatar_url: formData.avatar_url,
      occupation: formData.occupation,
      languages: formData.languages,
      personality_type: formData.personality_type,
      star_sign: formData.star_sign,
      location: formData.location,
      nationality: formData.nationality,
      hobbies: formData.hobbies,
    }));
  }, []); // eslint-disable-line

  useEffect(() => {
    const userId: string | undefined = user?.id;
    if (userId) {
      fetchConnectionsData(userId).then((data) => setConnections(data));
    } else {
      console.error("User ID is undefined");
    }
  }, []); // eslint-disable-line

  return (
    <>
      <div className=" flex flex-col items-center h-screen overflow-x-hidden bg-gray-100 pb-96 ">
        <div className=" flex flex-col items-center h-screen relative  lg:mt-12">
          <div className="absolute right-8 md:right-20 lg:right-10 top-4 lg:top-4 z-50 w-6">
            {" "}
            <form action="/auth/signout" method="post">
              <button className="button block" type="submit" name="Sign out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-log-out"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
              </button>
            </form>
            <Link href="/profile/edit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="#fff"
                className="w-10 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </Link>
          </div>
          <div className="relative">
            <div className="flex flex-col items-center lg:flex-row py-20 shadow-lg lg:gap-16 bg-[url('/backgroundImages/profile3.jpg')] relative bg-cover w-screen max-w-5xl  lg:rounded-lg">
              {" "}
              <div className="pb-4 lg:pb-0 lg:pl-24">
                <AvatarProfile
                  uid={user?.id ?? ""}
                  url={formData.avatar_url}
                  size={150}
                />
              </div>
              <div>
                <h1 className="text-white text-4xl py-4 lg:pt-0">
                  {formData.first_name} {formData.last_name}
                </h1>
                <h2 className="text-2xl text-center lg:text-left pb-4 text-white">
                  {formData.username}
                </h2>
                <p className="text-md text-center lg:text-left text-white">
                  {formData.location}
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
              </div>
            </div>

            {/* bio */}
            <div className="w-full flex flex-col items-center my-4 shadow-lg">
              <div className="bg-nesstDarkGrey w-11/12 lg:w-full max-w-5xl rounded-lg absolute lg:static left-[4%] top-[87%] -bottom-[17%] md:-bottom-[32%] px-4  text-white overflow-y-scroll md:overflow-hidden">
                <div className=" flex flex-row justify-between">
                  <h3 className="py-2 font-semibold">About Me</h3>
                  <h3 className="py-2 font-semibold">{formData.age} y/o</h3>
                </div>
                <p className="pb-2">{formData.bio}</p>
              </div>
            </div>
          </div>
          {/* connections */}
          <div className="w-full mb-80 gap-4 px-5 lg:px-0 md:flex">
            <div className="flex-1 bg-white rounded-lg shadow-lg mt-28 md:mt-48 lg:mt-0 px-4 py-4 max-w-5xl ">
              <h3 className="pb-2 text-[#bfbfbf] font-semibold">Connections</h3>
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

                {formData.nationality && (
                  <div className="py-2 flex gap-2">
                    <Map /> <p>{formData.nationality}</p>
                  </div>
                )}

                {formData.personality_type && (
                  <div className="py-2 flex gap-2">
                    <User /> <p>{formData.personality_type}</p>
                  </div>
                )}
                {formData.occupation && (
                  <div className="py-2 flex gap-2">
                    <Briefcase /> <p>{formData.occupation}</p>
                  </div>
                )}
                {formData.languages && (
                  <div className="py-2 flex gap-2">
                    <Globe2 /> <p>{formData.languages.join(", ")}</p>
                  </div>
                )}
                {formData.star_sign && (
                  <div className="py-2 flex gap-2">
                    <Sparkles /> <p>{formData.star_sign}</p>
                  </div>
                )}
                {formData.hobbies && (
                  <div className="py-2 flex gap-2">
                    <Bike /> <p>{formData.hobbies.join(", ")}</p>
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
      </div>
      <div className="md:hidden">
        <Footer pathnameUrl={pathname} />
      </div>
    </>
  );
}
