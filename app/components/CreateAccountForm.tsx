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
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      age: formData.age,
      bio: formData.bio,
      drinker: formData.drinker,
      smoker: formData.smoker,
      avatar_url: formData.avatar_url,
    }));
  }, []);

  // call to update profile
  const { updateProfile } = useUpdateProfile(session);

  return (
    <div
      className="form-widget flex flex-col items-center justify-evenly h-screen overflow-x-hidden overflow-y-scroll bg-black text-white"
      data-testid="CreateAccForm-id"
    >
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
      <div className="w-5/6 ">
        <CustomInput
          id="email"
          placeholder="Email"
          type="text"
          value={session?.user.email || ""}
          onChange={(e) => e.preventDefault()} // Dummy onChange for disabled input
          required
        />
      </div>
      <div className="w-5/6 ">
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
      <div className="w-5/6 ">
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
      <div className="w-5/6 ">
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
      <div className="w-5/6 ">
        <CustomInput
          id="age"
          placeholder="Age"
          required
          type="number"
          value={formData.age || ""}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              age: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="w-5/6 ">
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
      <div className="w-5/6 ">
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
      <div className="w-5/6 ">
        <button
          className="bg-[#d9a66d] w-full py-2 rounded-full"
          onClick={() =>
            updateProfile({
              firstName: formData.firstName,
              lastName: formData.lastName,
              username: formData.username,
              age: formData.age,
              bio: formData.bio,
              drinker: formData.drinker,
              smoker: formData.smoker,
              avatar_url: formData.avatar_url,
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
