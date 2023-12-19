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

export async function fetchUsersLikedProperties(
  userId: string
): Promise<PropertyData[] | null> {
  try {
    //fetch liked properties data
    const { data: propertiesData, error: likedPropertiesError } = await supabase
      .from("propertiesILiked")
      .select("property_id")
      .eq("profile_id", userId);

    if (likedPropertiesError) {
      console.error(likedPropertiesError);
      return null;
    }
    const propertiesIds =
      propertiesData?.map((entry) => entry.property_id) || [];

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

    return propertyData as PropertyData[];
  } catch (error) {
    console.error(error);
    return null;
  }
}
