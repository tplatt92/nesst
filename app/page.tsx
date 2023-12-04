import Image from "next/image";

'use client'

import Link from 'next/link'
import React from "react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
      <Link href="/">Home</Link>
      <Link href="/messages">Messages</Link>
     <Link href="/profile">Profile</Link>
     <Link href="/register">Register</Link>
     <Link href="/signIn">Sign In</Link>
      </div>
      <div>
      <h1 className="bg-nesstYellow text-white p-1 text-1xl font-serif font-bold font-montserrat">Hello</h1>
    <h1 className="bg-nesstLightGrey text-white p-2 text-2xl font-sans hover:underline font-montserrat">Hello</h1>
    <h1 className="bg-nesstDarkGrey text-white p-3 text-3xl font-mono underline border-solid border-white border-4 text-center font-montserrat">Hello</h1>
      </div>
    </main>
  );
}
