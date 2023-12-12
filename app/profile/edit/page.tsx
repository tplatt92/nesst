import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import Profile from "../../components/EditAccountForm";
import EditAccountForm from "../../components/EditAccountForm";

export default async function EditProfile() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="w-screen">
      <EditAccountForm session={session} />
    </div>
  );
}
