import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import ExploreID from "../../components/ExploreID";

export default async function EditProfile() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="w-screen">
      <ExploreID session={session} />
    </div>
  );
}
