//desktop navigation bar to be used on medium screens and above [no search bar]
"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";


export default function DesktopNav() {
  const pathnameUrl = usePathname();

  return (
    <nav className="hidden md:flex flex-row items-center relative w-full md:px-8 shadow-lg">
      
        <div className="flex flex-row items-center justify-between w-full gap-4 relative my-4">
          <div className="flex items-center justify-center pl-2">
            <Image
              alt="NESST"
              src="/logos/fullegg.png"
              priority={true}
              width={58}
              height={58}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <div className="flex gap-2 lg:gap-10 lg:pr-8 text-sm lg:text-lg">
            <div
              className={`${
                pathnameUrl === "/explore"
                  ? "text-nesstDarkGrey"
                  : "text-nesstLightGrey"
              } `}
            >
              <Link
                href="/explore"
                className="text-center hover:underline  hover:text-nesstYellow cursor-pointer "
              >
                <p className=" text-md">Explore</p>
              </Link>
            </div>
            <div
              className={`${
                pathnameUrl === "/favourites"
                  ? "text-nesstDarkGrey"
                  : "text-black"
              } `}
            >
              <Link
                href="/favourites"
                className="text-center hover:underline  hover:text-nesstYellow cursor-pointer"
              >
                <p className=" text-md">Favourites</p>
              </Link>
            </div>
            <div
              className={`${
                pathnameUrl === "/messages"
                  ? "text-nesstDarkGrey"
                  : "text-black"
              } `}
            >
              <Link
                href="/messages"
                className="text-center hover:underline  hover:text-nesstYellow cursor-pointer"
              >
                <p className=" text-md">Messages</p>
              </Link>
            </div>
            <div
              className={`${
                pathnameUrl === "/profile" ? "text-nesstDarkGrey" : "text-black"
              } `}
            >
              <Link
                href="/profile"
                className="text-center hover:underline  hover:text-nesstYellow cursor-pointer"
              >
                <p className=" text-md">Profile</p>
              </Link>
            </div>
          </div>
        </div>
    </nav>
  );
}
