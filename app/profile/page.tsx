import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import UserProfile from "@/app/components/UserProfile";
import DesktopNav from "../components/DesktopNav";

export default async function ViewProfile() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="w-screen">
      <header className="hidden md:block p-0">
        <DesktopNav />
      </header>
      <UserProfile session={session} />
    </div>
  );
}
