// fetch profile data
// display in fields.
"use client"
import Link from "next/link";
import { supabase } from "../components/AuthForm";
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";


export default async function Profile() {
  const router = useRouter();
const { userId } = router.query;
const [userData, setUserData] = useState(null);

useEffect(() => {
  if (userId) {
    // Fetch data for the specific user when the component mounts
    fetchUserData(userId as string);
  }
}, [userId]);

async function getProfile() {
  const { data, error, status } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.id)
    // .single();

  if (error && status !== 406) {
    throw error;
  }

  return data;
    
}
  const profile = await getProfile();
  console.log(profile);
  return (
    <>
      <div>
        <h1>Profile</h1>
        <Link href={"/profile/edit"}>Edit</Link>
      </div>
    </>
  );
}
