import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import ExploreID from "@/app/components/ExploreID";

export default async function ViewProfile() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session?.user?.id;

  return (
    <div 
      <p>{...userId}</p>
    </div>
  );
}