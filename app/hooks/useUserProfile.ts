// hooks/useUserProfile.ts
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { profileData } from "@/types/types";

const supabase = createClientComponentClient<Database>();

export const useUserProfile = (userId: string | null) => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<profileData>({
    first_name: null,
    last_name: null,
    username: null,
    age: null,
    bio: null,
    avatar_url: null,
    drinker: null,
    smoker: false,
    occupation: null,
    languages: null,
    personality_type: null,
    star_sign: null,
    location: null,
    nationality: null,
    hobbies: null,
    map(arg0: (profile: any) => import("react").JSX.Element): unknown {
      throw new Error("Method not implemented.");
    },
  });

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);

        const { data, error, status } = await supabase
          .from("profiles")
          .select(
            `first_name, last_name, username, age, avatar_url, bio, drinker, smoker, occupation, languages, personality_type, star_sign, Location, Nationality, Hobbies`
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
            occupation: data.occupation,
            languages: data.languages,
            personality_type: data.personality_type,
            star_sign: data.star_sign,
            location: data.Location,
            nationality: data.Nationality,
            hobbies: data.Hobbies,
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
