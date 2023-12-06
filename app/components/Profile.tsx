"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Image from "next/image";
import AvatarProfile from "./AvatarProfile";

export default function Profile({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [drinker, setDrinker] = useState<string | null>(null);
  const [smoker, setSmoker] = useState<string | null>(null);
  const user = session?.user;
  console.log(`session is ${user} `);
  const router = useRouter();

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
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setUsername(data.username);
        setBio(data.bio);
        setDrinker(data.drinker);
        setSmoker(data.smoker);
        setAvatarUrl(data.avatar_url);
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
      <div className=" flex flex-col items-center h-screen overflow-x-hidden overflow-y-scroll bg-gray-100 ">
        <div>
          <Link href="/edit">Edit</Link>
        </div>
        <div className="flex flex-col py-20 items-center bg-[url('/backgroundImages/profile3.jpg')] relative bg-cover w-screen">
          <div className="pb-4">
            <AvatarProfile uid={user.id} url={avatar_url} size={150} />
          </div>
          <h1 className="text-white text-4xl py-4">
            {firstName} {lastName}
          </h1>
          <h2 className="text-2xl text-white">{username}</h2>
          <div>
            <Link href="/messages">Link</Link>
          </div>
          <div className="bg-[#d9a66d] w-11/12 rounded-lg absolute -bottom-12 px-4 text-white">
            <h3 className="py-2">About Me</h3>
            <p className="py-2">{bio}</p>
          </div>
        </div>

        <div>
          <h3>Connections</h3>
          <div></div>
        </div>
      </div>
    </>
  );
}
