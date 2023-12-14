// useProfileUpdater.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { profileData } from "@/types/types";
import { Database } from "@/types/supabase";

interface ProfileUpdater {
  loading: boolean;
  updateProfile: (data: profileData) => Promise<void>;
}

const supabase = createClientComponentClient<Database>();

export function useProfileUpdater(session: Session | null): ProfileUpdater {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
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

  const updateProfile = async (data: profileData): Promise<void> => {
    try {
      setLoading(true);
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.username,
        age: formData.age,
        bio: formData.bio,
        drinker: formData.drinker,
        smoker: formData.smoker,
        avatar_url: formData.avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;

      alert("Profile updated!");
      router.refresh();
      router.push("/profile");
    } catch (error) {
      alert("Error updating the data!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateProfile };
}
