import { useRouter } from "next/navigation";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { Database } from "@/types/supabase";

const supabase = createClientComponentClient<Database>();

interface PropertyData {
  id: string;
  name: string | null;
  description: string | null;
  image: string[] | null;
}

export async function fetchLikedProperties(
  userId: string
): Promise<PropertyData[] | null> {
  try {
    //fetch liked properties data
    const { data: propertiesData, error: likedPropertiesError } = await supabase
      .from("propertiesILiked")
      .select("properties_id")
      .eq("profiles_id", userId);
    // 2,4,7
    if (likedPropertiesError) {
      console.error(likedPropertiesError);
      return null;
    }
    const propertiesIds =
      propertiesData?.map((entry) => entry.properties_id) || [];
    console.log(propertiesIds);
    // Fetch properties data from properties table (2,4,7)
    const { data: propertyData, error: propertyError } = await supabase
      .from("properties")
      .select("id, name, description, image")
      .in("id", propertiesIds);

    if (propertyError) {
      console.error(propertyError);
      return null;
    }

    // Return the fetched data
    console.log(propertyData);
    return propertyData as PropertyData[];
  } catch (error) {
    console.error(error);
    return null;
  }
}
