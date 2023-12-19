import { useRouter } from "next/navigation";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/supabase";

const supabase = createClientComponentClient<Database>();

interface NesstsData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  username: string | null;
}

export async function fetchNesstsData(
  userId: string
): Promise<NesstsData[] | null> {
  try {
    //fetch Nessts data
    const { data: NesstsData, error: NesstsError } = await supabase
      .from("nessts")
      .select("profile_id")
      .eq("profile_id", userId);

    if (NesstsError) {
      console.error(NesstsError);
      return null;
    }
    const friendIds = NesstsData?.map((entry) => entry.profile_id) || [];

    // Fetch profile data for Nessts
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, username, avatar_url")
      .in("id", friendIds);

    if (profilesError) {
      console.error(profilesError);
      return null;
    }

    // Return the fetched data
    return profilesData as NesstsData[];
  } catch (error) {
    console.error(error);
    return null;
  }
}
