import { HeartIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";

import Link from "next/link";

import Image from "next/image"; // Add this import statement

export default function Footer() {
  return (
    <>
      <div
        className="flex items-center justify-between py-4 border-t fixed border-gray-200 border-solid bottom-0 w-full bg-white"
        data-testid="footer-id"
      >
        <div>
          <Link href="/explore" className="flex-1 text-center">
            <MagnifyingGlassIcon className="h-8 text-gray-400 px-4" />
            <p className="text-gray-400 text-xs">Explore</p>
          </Link>
        </div>
        <div>
          <Link href="/favourites" className="flex-1 text-center">
            <HeartIcon className="h-8 text-gray-400 px-4" />
            <p className="text-gray-400 text-xs">Favourites</p>
          </Link>
        </div>
        <div className="relative">
          <Image
            alt="NESST"
            src="/logos/fullegg.png" // Use forward slashes instead of backslashes
            className="flex-1 text-center absolute bottom-2 "
            width={60}
            height={60}
          />
          <p className="text-gray-400 text-xs">My Nesst</p>
        </div>

        <div>
          <Link href="/messages" className="flex-1 text-center">
            <ChatBubbleLeftEllipsisIcon className="h-8 text-gray-400 px-4" />
            <p className="text-gray-400 text-xs ">Messages</p>
          </Link>
        </div>
        <div>
          <Link href="/profile" className="flex-1 text-center">
            <UserIcon className="h-8 text-gray-400 px-4" />
            <p className="text-gray-400 text-xs">Profile</p>
          </Link>
        </div>
      </div>
    </>
  );
}

/*
flex w-3/4 border-solid p-4

<Link href="/messages"><ChatBubbleLeftEllipsisIcon className="h-6 w-1/4 text-gray-400"/></Link>*/
