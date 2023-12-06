// fetch profile data
// display in fields.

// import Link from "next/link";
// import { supabase } from "../components/AuthForm";
// import { notFound } from "next/navigation";

// import Footer from "../components/Footer";

// export const revalidate = 0;

// export async function generateStaticParams() {
//   const { data: profiles } = await supabase
//     .from("profiles")
//     .select("id, bio, username, avatarUrl, age");
//   console.log(profiles);
//   return profiles;
// }

// export default async function Profiles({
//   params: { userId },
// }: {
//   params: { userId: string };
// }) {
//   const { data: profiles } = await supabase
//     .from("profiles")
//     .select()
//     .match({ userId })
//     .single();

//   if (!profiles) {
//     notFound();
//   }

//   const data = JSON.stringify(profiles, null, 2);

//   return (
//     <>
//       <div>
//         <h1>Profile</h1>
//         <Link href={"/profile/edit"}>Edit</Link>
//         <Footer />
//       </div>
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase.tsx";

export default function ClientPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [profiles, setProfiles] = useState<any>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data } = await supabase.from("profiles").select();
      setProfiles(data);
      setIsLoading(false);
    };

    fetchProfiles();
  }, []);

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <pre>{JSON.stringify(profiles, null, 2)}</pre>
  );
}
