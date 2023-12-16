import { useRouter } from "next/navigation";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/supabase";

const supabase = createClientComponentClient<Database>();

interface ConnectionData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  username: string | null;
}

export async function fetchConnectionsData(
  userId: string
): Promise<ConnectionData[] | null> {
  try {
    //fetch connections data
    const { data: connectionsData, error: connectionsError } = await supabase
      .from("connections")
      .select("friend_id")
      .eq("user_id", userId);

    if (connectionsError) {
      console.error(connectionsError);
      return null;
    }

    console.log(connectionsData);
    const friendIds = connectionsData?.map((entry) => entry.friend_id) || [];
    console.log(friendIds);

    // Fetch profile data for connections
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, username, avatar_url")
      .in("id", friendIds);

    if (profilesError) {
      console.error(profilesError);
      return null;
    }

    // Return the fetched data
    console.log("Profiles Data:", profilesData);
    return profilesData as ConnectionData[];
  } catch (error) {
    console.error(error);
    return null;
  }
}
