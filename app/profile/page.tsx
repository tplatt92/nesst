// fetch profile data
// display in fields.
import Link from "next/link";

export default async function Profile() {
  return (
    <>
      <div>
        <h1>Profile</h1>
        <Link href={"/profile/edit"}>Edit</Link>
      </div>
    </>
  );
}
