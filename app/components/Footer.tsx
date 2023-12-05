import { HeartIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";

import Link from 'next/link'

export default function Footer() {
  return (<> 
  <div className="flex items-center justify-between bg-red-200">
  <Link href="/explore"><MagnifyingGlassIcon className="h-20 w-1/4 text-blue-500"/></Link>

  <Link href="/favourites"><HeartIcon className="h-20 w-1/4 text-blue-500"/></Link>
  
  <Link href="/messages"><ChatBubbleLeftEllipsisIcon className="h-20 w-1/4 text-blue-500"/></Link>
  <Link href="/profile"><UserIcon className="h-20 w-1/4 text-blue-500"/></Link>
  </div>
  </>);
}


/*
flex w-3/4 border-solid p-4

<Link href="/messages"><ChatBubbleLeftEllipsisIcon className="h-6 w-1/4 text-blue-500"/></Link>*/