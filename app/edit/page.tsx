import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import Profile from "../components/AccountForm";
import AccountForm from "../components/AccountForm";

export default async function ViewProfile() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="w-screen">
      <AccountForm session={session} />
    </div>
  );
}
