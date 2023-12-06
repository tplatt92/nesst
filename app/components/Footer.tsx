import { HeartIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";

import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div
        className="flex items-center justify-between py-4 border-t fixed border-gray-200 border-solid bottom-0 bg-white"
        data-testid="footer-id"
      >
        <div>
          <Link href="/explore" className="flex-1 text-center">
            <MagnifyingGlassIcon className="h-10 text-gray-400 px-8" />
            <p className="text-gray-400 text-sm">Explore</p>
          </Link>
        </div>
        <div>
          <Link href="/favourites" className="flex-1 text-center">
            <HeartIcon className="h-10 text-gray-400 px-8" />
            <p className="text-gray-400 text-sm">Favourites</p>
          </Link>
        </div>
        <div>
          <Link href="/messages" className="flex-1 text-center">
            <ChatBubbleLeftEllipsisIcon className="h-10 text-gray-400 px-8" />
            <p className="text-gray-400 text-sm">Messages</p>
          </Link>
        </div>
        <div>
          <Link href="/profile" className="flex-1 text-center">
            <UserIcon className="h-10 text-gray-400 px-8" />
            <p className="text-gray-400 text-sm">Profile</p>
          </Link>
        </div>
      </div>
    </>
  );
}

/*
flex w-3/4 border-solid p-4

<Link href="/messages"><ChatBubbleLeftEllipsisIcon className="h-6 w-1/4 text-gray-400"/></Link>*/
