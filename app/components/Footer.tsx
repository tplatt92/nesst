import { HeartIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";

import Link from 'next/link'

export default function Footer() {
  return (<> 
  <div className="flex items-center justify-between py-4 border-t border-gray-200 border-solid" >
      <Link href="/explore" className="flex-1 text-center">
        <MagnifyingGlassIcon className="h-12 text-gray-400 px-8" />
      </Link>

      <Link href="/favourites" className="flex-1 text-center">
        <HeartIcon className="h-12 text-gray-400 px-8" />
      </Link>

      <Link href="/messages" className="flex-1 text-center">
        <ChatBubbleLeftEllipsisIcon className="h-12 text-gray-400 px-8" />
      </Link>

      <Link href="/profile" className="flex-1 text-center">
        <UserIcon className="h-12 text-gray-400 px-8" />
      </Link>
    </div>
  </>);
}


/*
flex w-3/4 border-solid p-4

<Link href="/messages"><ChatBubbleLeftEllipsisIcon className="h-6 w-1/4 text-gray-400"/></Link>*/