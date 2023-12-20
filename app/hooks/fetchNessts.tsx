import { useRouter } from "next/navigation";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/supabase";

const supabase = createClientComponentClient<Database>();

export interface NesstsData {
  id: string;
  name: string | null;
  description: string | null;
  image: string[] | null;
}

export async function fetchNesstsData(
  userId: string
): Promise<NesstsData[] | null> {
  try {
    //fetch Nessts data
    const { data: NesstsData, error: NesstsError } = await supabase
      .from("nesst_chats")
      .select("property_id")
      .eq("profile_id", userId);
    console.log(NesstsData);
    if (NesstsError) {
      console.error(NesstsError);
      return null;
    }
    const propertyIds = NesstsData?.map((entry) => entry.property_id) || [];
    console.log(propertyIds);

    // Fetch profile data for Nessts
    const { data: propertiesData, error: propertiesError } = await supabase
      .from("properties")
      .select("id, name, description, image")
      .in("id", propertyIds);

    if (propertiesError) {
      console.error(propertiesError);
      return null;
    }

    // Return the fetched data
    return propertiesData as unknown as NesstsData[];
  } catch (error) {
    console.error(error);
    return null;
  }
}
