import { HeartIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { FooterProps } from "@/types/types";

const Footer: React.FC<FooterProps> = ({ pathnameUrl }) => {
  return (
    <>
      <div
        className="flex items-center justify-evenly py-4 border-t fixed border-gray-200 border-solid bottom-0 w-full bg-white"
        data-testid="footer-id"
      >
        <div
          className={`${
            pathnameUrl === "/explore" ? "text-nesstYellow" : "text-gray-400"
          } `}
        >
          <Link href="/explore" className="flex-1 text-center">
            <MagnifyingGlassIcon className="h-8  px-4" />
            <p className=" text-xs">Explore</p>
          </Link>
        </div>
        <div
          className={`${
            pathnameUrl === "/favourites" ? "text-nesstYellow" : "text-gray-400"
          } `}
        >
          <Link href="/favourites" className="flex-1 text-center">
            <HeartIcon className="h-8  px-4" />
            <p className=" text-xs">Favourites</p>
          </Link>
        </div>
        <div className="relative self-end">
          <Image
            alt="NESST"
            src="/logos/fullegg.png"
            className="flex-1 text-center absolute bottom-5 "
            priority={true}
            width={60}
            height={60}
          />
          <p className="text-xs text-gray-400">My Nesst</p>
        </div>

        <div
          className={`${
            pathnameUrl === "/messages" ? "text-nesstYellow" : "text-gray-400"
          } `}
        >
          <Link href="/messages" className="flex-1 text-center">
            <ChatBubbleLeftEllipsisIcon className="h-8  px-4" />
            <p className=" text-xs ">Messages</p>
          </Link>
        </div>
        <div
          className={`${
            pathnameUrl === "/profile" ? "text-nesstYellow" : "text-gray-400"
          } `}
        >
          <Link href="/profile" className="flex-1 text-center">
            <UserIcon className="h-8  px-4" />
            <p className=" text-xs">Profile</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
