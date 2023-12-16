import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import ViewUserProfile from "@/app/components/UserProfile";
import DesktopNav from "../../components/DesktopNav";

export default async function ViewProfile() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="w-screen">
      <DesktopNav />
      <ViewUserProfile session={session} />
    </div>
  );
}
