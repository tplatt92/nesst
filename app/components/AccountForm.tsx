"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null);
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
        setAge(data.age);
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
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session?.user.email} disabled />
      </div>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          value={firstName || ""}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          value={lastName || ""}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="bio">Bio</label>
        <input
          id="Bio"
          type="text"
          value={bio || ""}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="avatarUrl">Avatar URL</label>
        <input
          id="avatarUrl"
          type="url"
          value={avatar_url || ""}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="drinker">What are your drinking habits?</label>
        <select
          id="drinker"
          value={drinker || ""}
          onChange={(e) => setDrinker(e.target.value)}
        >
          <option value="social">Social</option>
          <option value="light">Light</option>
          <option value="heavy">Heavy</option>
          <option value="non">Non</option>
        </select>
      </div>
      <div>
        <label htmlFor="smoker">Smoker</label>
        <input
          id="smoker"
          type="radio"
          value={smoker || ""}
          onChange={(e) => setSmoker(e.target.value)}
        />
      </div>
      <div>
        <button
          className="button primary block"
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
          {loading ? "Loading ..." : "Update"}
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
