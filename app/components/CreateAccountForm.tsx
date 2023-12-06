"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Avatar from "./Avatar";

export default function CreateAccountForm({
  session,
}: {
  session: Session | null;
}) {
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

  async function updateProfile({
    firstName,
    lastName,
    username,
    bio,
    avatar_url,
    smoker,
    drinker,
  }: {
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    bio: string | null;
    avatar_url: string | null;
    smoker: string | null;
    drinker: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        first_name: firstName,
        last_name: lastName,
        username,
        bio,
        avatar_url,
        smoker,
        drinker,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget flex flex-col items-center justify-evenly h-screen overflow-x-hidden overflow-y-scroll bg-black text-white">
      <div className="flex mt-16">
        <Image
          src="/logos/emptyegg.png"
          alt="Nesst Logo"
          width={40}
          height={20}
          className="mr-4"
        />
        <h1 className="text-5xl tracking-[0.4em]">NESST</h1>
      </div>
      <div>
        <Avatar
          uid={user.id}
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
          }}
        />
      </div>
      <div className="w-5/6 ">
        <input
          id="email"
          type="text"
          value={session?.user.email}
          disabled
          className="w-full p-2 pl-4 border border-white rounded-full mt-2 bg-black placeholder-white"
          placeholder="Email"
        />
      </div>
      <div className="w-5/6 ">
        <input
          placeholder="First Name"
          id="firstName"
          type="text"
          value={firstName || ""}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 pl-4 border border-white rounded-full mt-2 bg-black placeholder-white"
        />
      </div>
      <div className="w-5/6 ">
        <input
          id="lastName"
          placeholder="Last Name"
          type="text"
          value={lastName || ""}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 pl-4 border border-white rounded-full  mt-2 bg-black placeholder-white"
        />
      </div>
      <div className="w-5/6 ">
        <input
          id="username"
          placeholder="Username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 pl-4 border border-white rounded-full  mt-2 bg-black placeholder-white"
        />
      </div>
      <div className="w-5/6 ">
        <textarea
          id="Bio"
          placeholder="Bio"
          value={bio || ""}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 pl-4 border border-white rounded-full  mt-2 bg-black placeholder-white"
        />
      </div>
      <div className="w-5/6 ">
        <select
          id="drinker"
          placeholder="Drinking habits"
          value={drinker || ""}
          onChange={(e) => setDrinker(e.target.value)}
          className="w-full p-2 pl-4 border border-white rounded-full  mt-2 bg-black placeholder-white"
        >
          <option value="" disabled selected>
            Drinking habits
          </option>
          <option value="social">Social</option>
          <option value="light">Light</option>
          <option value="heavy">Heavy</option>
          <option value="non">Non</option>
        </select>
      </div>
      <div className="w-5/6 ">
        {/* <label htmlFor="smoker">Smoker</label> */}
        <select
          id="smoker"
          placeholder="Smoker"
          value={smoker || ""}
          onChange={(e) => setSmoker(e.target.value)}
          className="w-full p-2 px-4 border border-white rounded-full  mt-2 bg-black placeholder-white"
        >
          <option value="" disabled selected>
            Smoker
          </option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="w-5/6 ">
        <button
          className="bg-[#d9a66d] w-full py-2 rounded-full"
          onClick={() =>
            updateProfile({
              firstName,
              lastName,
              username,
              bio,
              smoker,
              drinker,
              avatar_url,
            })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Submit"}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}