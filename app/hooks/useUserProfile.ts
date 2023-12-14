// hooks/useUserProfile.ts
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { profileData } from "@/types/types";

const supabase = createClientComponentClient<Database>();

export const useUserProfile = (userId: string | null) => {
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

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);

        const { data, error, status } = await supabase
          .from("profiles")
          .select(
            `first_name, last_name, username, age, avatar_url, bio, drinker, smoker`
          )
          .eq("id", userId)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
            age: data.age,
            bio: data.bio,
            drinker: data.drinker,
            smoker: data.smoker,
            avatar_url: data.avatar_url,
          }));
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getProfile();
    }
  }, [userId]);

  return { loading, formData, setFormData, setLoading };
};
