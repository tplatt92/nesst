"use client";
import React from "react";

import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function DesktopNav() {
  const isMobile = useMediaQuery({
    query: "(max-width:600px), { noSsr: true}",
    //make sure to get rid of the hydration warning
  });

  const pathnameUrl = usePathname();

  return (
    <nav className="flex flex-row items-center relative w-full md:px-8 shadow-lg ">
      {!isMobile && (
        <div className="flex flex-row items-center justify-between w-full gap-4 relative my-4">
          <div className="flex items-center justify-center pl-2">
            <Image
              alt="NESST"
              src="/logos/fullegg.png"
              priority={true}
              width={40}
              height={40}
            />
          </div>
          <div className="flex gap-2 lg:gap-8 lg:pr-8 text-sm lg:text-md">
            <div
              className={`${
                pathnameUrl === "/explore" ? "text-nesstYellow" : "text-black"
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
                  ? "text-nesstYellow"
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
                pathnameUrl === "/messages" ? "text-nesstYellow" : "text-black"
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
                pathnameUrl === "/profile" ? "text-nesstYellow" : "text-black"
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
      )}
    </nav>
  );
}