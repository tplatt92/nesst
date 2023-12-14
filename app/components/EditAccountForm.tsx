"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Switch } from "@/components/ui/switch";
import { profileData } from "@/types/types";
import CustomTextArea from "./CustomTextArea";
import CustomSelect from "./CustomSelect";
import CustomInput from "./CustomInput";
import Image from "next/image";
import Avatar from "./Avatar";

export default function EditAccountForm({
  session,
}: {
  session: Session | null;
}) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<profileData>({
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

  // function to getProfile

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
        setFormData((prevFormData) => ({
          ...prevFormData,
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

  // UseEffect to getProfile

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  // Update profile

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
    smoker: boolean;
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
      router.refresh();
      router.push("/profile");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget flex flex-col items-center h-screen overflow-x-hidden overflow-y-scroll bg-black text-white md:text-xl">
      <div className="flex mt-16 pb-4">
        <Image
          src="/logos/emptyegg.png"
          alt="Nesst Logo"
          width={40}
          height={20}
          className="mr-4"
        />
        <h1 className="text-5xl tracking-[0.4em]">NESST</h1>
      </div>
      <div className="pb-4">
        <Avatar
          uid={user?.id ?? ""}
          url={formData.avatar_url ?? null}
          size={150}
          onUpload={(url) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              avatar_url: url,
            }));
          }}
        />
      </div>
      <div className="w-5/6 pb-4">
        <label htmlFor="email">Email</label>
        <CustomInput
          id="email"
          placeholder="Email"
          type="text"
          value={session?.user.email || ""}
          onChange={(e) => e.preventDefault()} // Dummy onChange for disabled input
          required
        />
      </div>
      <div className="w-5/6 pb-4 ">
        <label htmlFor="firstName">First Name</label>
        <CustomInput
          id="firstName"
          placeholder="First Name"
          type="text"
          value={formData.firstName || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              firstName: e.target.value,
            }))
          }
        />
      </div>
      <div className="w-5/6 pb-4">
        <label htmlFor="lastName">Last Name</label>
        <CustomInput
          id="lastName"
          placeholder="Last Name"
          type="text"
          value={formData.lastName || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              lastName: e.target.value,
            }))
          }
        />
      </div>
      <div className="w-5/6 pb-4">
        <label htmlFor="username">Username</label>
        <CustomInput
          id="username"
          placeholder="Username minimum 2 characters"
          type="text"
          value={formData.username || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              username: e.target.value,
            }))
          }
          onError={(e) => alert("Username must be at least 3 characters")}
          required
        />
      </div>
      <div className="w-5/6 pb-4">
        <label htmlFor="bio">Bio</label>
        <CustomTextArea
          id="Bio"
          placeholder="Bio"
          value={formData.bio || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              bio: e.target.value,
            }))
          }
        />
      </div>
      <div className="w-5/6 pb-8">
        <label htmlFor="drinking habits">Drinking Habits</label>
        <CustomSelect
          id="drinker"
          value={formData.drinker || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              drinker: e.target.value,
            }))
          }
          options={[
            { value: "", label: "Drinking habits" },
            { value: "social", label: "Social" },
            { value: "light", label: "Light" },
            { value: "heavy", label: "Heavy" },
            { value: "non", label: "Non" },
          ]}
        />
      </div>
      <div className="w-5/6 pb-8 flex justify-between items-center">
        <label htmlFor="smoker">Do you Smoke?</label>
        <Switch
          id="smoker"
          checked={formData.smoker}
          onCheckedChange={() =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              smoker: !formData.smoker,
            }))
          }
        />
      </div>
      <div className="w-5/6 pb-4">
        <button
          className="bg-[#d9a66d] w-full py-2 rounded-full "
          onClick={() =>
            updateProfile({
              ...formData,
            })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div className="pb-16 pt-4">
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
