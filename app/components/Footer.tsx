import { HeartIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (<> 
  <div className="flex w-3/4 border-solid p-4">
  <HeartIcon className="h-6 w-1/4 text-blue-500"/>
  <MagnifyingGlassIcon className="h-6 w-1/4 text-blue-500"/>
  <ChatBubbleLeftEllipsisIcon className="h-6 w-1/4 text-blue-500"/>
  <UserIcon className="h-6 w-1/4 text-blue-500"/>
  </div>
  </>);
}
