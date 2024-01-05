//see also CreateAccountForm.tsx [with extra update button]
"use client";
import { useEffect } from "react";
import { Session } from "@supabase/auth-helpers-nextjs";
import { Switch } from "@/components/ui/switch";
import CustomTextArea from "./CustomTextArea";
import CustomSelect from "./CustomSelect";
import CustomInput from "./CustomInput";
import Image from "next/image";
import Avatar from "./Avatar";
import { useUserProfile } from "../hooks/useUserProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import Link from "next/link";

export default function EditAccountForm({
  session,
}: {
  session: Session | null;
}) {
  const user = session?.user;

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

  // call to update profile
  const { updateProfile } = useUpdateProfile(session);

  return (
    <div className="form-widget flex flex-col items-center h-screen overflow-x-hidden overflow-y-scroll bg-black text-white md:text-xl relative">
      <Link href="/profile">
        <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2 bg-white m-4 absolute left-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="14"
            viewBox="0 0 448 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </div>
      </Link>
      <div className="flex mt-16 pb-4">
        <Image
          src="/logos/emptyegg.png"
          alt="Nesst Logo"
          width={40}
          height={20}
          style={{ width: "auto", height: "auto" }}
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
          onChange={(e) => e.preventDefault()}
          required
        />
      </div>
      <div className="w-5/6 pb-4 ">
        <label htmlFor="firstName">First Name</label>
        <CustomInput
          id="firstName"
          placeholder="First Name"
          type="text"
          value={formData.first_name || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              first_name: e.target.value,
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
          value={formData.last_name || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              last_name: e.target.value,
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
          required={true}
        />
      </div>
      <div className="w-5/6 pb-4">
        <label htmlFor="age">Age</label>
        <CustomInput
          id="age"
          placeholder="age"
          type="number"
          value={formData.age || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              username: e.target.value,
            }))
          }
        />
      </div>
      <div className="w-5/6 pb-4">
        <label htmlFor="bio">Bio</label>
        <CustomTextArea
          id="bio"
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
          id="drinking habits"
          value={formData.drinker || ""}
          name={"drinking habits"}
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
          aria-label="smoker"
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
        <label htmlFor="nationality">Nationality</label>
        <CustomInput
          id="nationality"
          placeholder="Nationality"
          type="text"
          value={formData.nationality || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              nationality: e.target.value,
            }))
          }
        />
      </div>
      <div className="w-5/6 pb-4">
        <label htmlFor="occupation">Occupation</label>
        <CustomInput
          id="occupation"
          placeholder="Occupation"
          type="text"
          value={formData.occupation || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              occupation: e.target.value,
            }))
          }
        />
      </div>
      <div className="w-5/6 pb-4">
        <label htmlFor="hobbies">Hobbies</label>
        <CustomInput
          id="hobbies"
          placeholder="Hobbies"
          type="text"
          value={formData.hobbies?.join(", ") || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              hobbies: e.target.value.split(", "),
            }))
          }
        />
      </div>
      <div className="w-5/6 pb-4">
        <label htmlFor="location">Location</label>
        <CustomInput
          id="Location"
          placeholder="Location"
          type="text"
          value={formData.location || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              location: e.target.value,
            }))
          }
        />
      </div>
      <div className="w-5/6 pb-4">
        <label htmlFor="languages">Languages</label>
        <CustomInput
          id="languages"
          placeholder="Languages"
          type="text"
          value={formData.languages?.join(", ") || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              languages: e.target.value.split(", "),
            }))
          }
        />
      </div>
      <div className="w-5/6 pb-4">
        <label htmlFor="personality type">
          Personality Type (Myers-Briggs)
        </label>
        <CustomInput
          id="personality_type"
          placeholder="Personality Type"
          type="text"
          value={formData.personality_type || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              personality_type: e.target.value,
            }))
          }
        />
      </div>
      <div className="w-5/6 pb-4">
        <label htmlFor="star_sign">Star Sign</label>
        <CustomInput
          id="star_sign"
          placeholder="Star Sign"
          type="text"
          value={formData.star_sign || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              star_sign: e.target.value,
            }))
          }
        />
      </div>
      <div className="w-5/6 pb-4">
        <button
          className="bg-nesstDarkGrey text-white w-full py-2 rounded-full border border-white "
          onClick={() =>
            updateProfile({
              first_name: formData.first_name,
              last_name: formData.last_name,
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
              map(
                arg0: (profile: any) => import("react").JSX.Element
              ): unknown {
                throw new Error("Method not implemented.");
              },
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
