// fetch profile data
// display in fields.
"use client"
import Link from "next/link";
import { supabase } from "../components/AuthForm";
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";


export default async function Profile() {
const router = useRouter();
const { userId } = router.query;
const [userData, setUserData] = useState(null);

useEffect(() => {
  if (userId) {
    // Fetch data for the specific user when the component mounts
    getProfile(userId as string);
  }
}, [userId]);

async function getProfile(userId: string) {
  try{
  const { data, error, status } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error && status !== 406) {
    throw error;
  }

  return data;}
    catch(error){console.error("error fetching data from supabase", error.message)}
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
