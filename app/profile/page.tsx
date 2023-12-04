"use client";

import Link from "next/link";

export default function Profile() {
  return (
    <>
      <div>
        <Link href="/">Home</Link>
        <Link href="/messages">Messages</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/register">Register</Link>
        <Link href="/signIn">Sign In</Link>
      </div>
    </>
  );
}
