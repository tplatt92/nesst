"use client";
import { useEffect } from "react";
import { Session } from "@supabase/auth-helpers-nextjs";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Avatar from "./Avatar";
import CustomTextArea from "./CustomTextArea";
import CustomSelect from "./CustomSelect";
import CustomInput from "./CustomInput";
import { useUserProfile } from "../hooks/useUserProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

export default function CreateAccountForm({
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
          onError={(e) => alert("Username is required and must be at least 3 characters")}
          required={true}
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
          name="drinking habits"
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
      <div className="w-5/6 pb-4 flex justify-between items-center">
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
      <div className="w-5/6 ">
        <button
          className="bg-[#d9a66d] w-full py-2 rounded-full"
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
          {loading ? "Loading ..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
