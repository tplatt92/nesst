"use client";

import Search from "./Search";
import FilterSheet from "./FilterSheet";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

type ExploreNavProps = {
  setProperties: React.Dispatch<React.SetStateAction<null | any[]>>;
};

const ExploreNav: React.FC<ExploreNavProps> = ({ setProperties }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:640px), { noSsr: true }",
  });

  return (
    <nav className="flex flex-row items-center gap-4 relative my-4 w-full">
      {isMobile ? (
        <>
          <Search setProperties={setProperties} />
          <FilterSheet />
        </>
      ) : (
        <div className="flex flex-row items-center gap-4 relative my-4 w-full">
  <div className="flex items-center justify-center pl-2">
          <Image
          
            alt="NESST"
            src="/logos/fullegg.png" // Use forward slashes instead of backslashe
            priority={true}
            width={100}
            height={100}
          />
         {/* <p className="text-xs text-gray-400">My Nesst</p> */}
        </div>
        
          <Search setProperties={setProperties} />

          <div>
            <Link href="/explore" className="flex-1 text-center">
              <p className=" text-md">Explore</p>
            </Link>
          </div>
          <div>
            <Link href="/favourites" className="flex-1 text-center">
              <p className=" text-md">Favourites</p>
            </Link>
          </div>
          <div>
            <Link href="/messages" className="flex-1 text-center">
              <p className=" text-md">Messages</p>
            </Link>
          </div>
          <div>
            <Link href="/profile" className="flex-1 text-center">
              <p className=" text-md">Profile</p>
            </Link>
          </div>
          <FilterSheet />
        </div>
      )}
    </nav>
  );
};

export default ExploreNav;
