"use client";

import Search from "./Search";
import FilterSheet from "./FilterSheet";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";

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
          <p className="text-xs">My Nesst</p>
          <Search setProperties={setProperties} />

          <div>
            <Link href="/explore" className="flex-1 text-center">
              <MagnifyingGlassIcon className="h-8  px-4" />
              <p className=" text-xs">Explore</p>
            </Link>
          </div>
          <div>
            <Link href="/favourites" className="flex-1 text-center">
              <HeartIcon className="h-8  px-4" />
              <p className=" text-xs">Favourites</p>
            </Link>
          </div>
          <div>
            <Link href="/messages" className="flex-1 text-center">
              <ChatBubbleLeftEllipsisIcon className="h-8  px-4" />
              <p className=" text-xs ">Messages</p>
            </Link>
          </div>
          <div>
            <Link href="/profile" className="flex-1 text-center">
              <UserIcon className="h-8  px-4" />
              <p className=" text-xs">Profile</p>
            </Link>
          </div>
          <FilterSheet />
        </div>
      )}
    </nav>
  );
};

export default ExploreNav;
