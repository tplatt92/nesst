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

export function useUpdateProfile(session: Session | null): ProfileUpdater {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const updateProfile = async (data: profileData): Promise<void> => {
    try {
      setLoading(true);
      const { error } = await supabase.from("profiles").upsert({
        id: session?.user?.id as string,
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        age: data.age,
        bio: data.bio,
        drinker: data.drinker,
        smoker: data.smoker,
        avatar_url: data.avatar_url,
        occupation: data.occupation,
        languages: data.languages,
        personality_type: data.personality_type,
        star_sign: data.star_sign,
        location: data.location,
        nationality: data.nationality,
        hobbies: data.hobbies,
        map(arg0: (profile: any) => import("react").JSX.Element): unknown {
          throw new Error("Method not implemented.");
        },
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
