"use client";

import Search from "./Search";
import FilterSheet from "./FilterSheet";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type ExploreNavProps = {
  setProperties: React.Dispatch<React.SetStateAction<null | any[]>>;
};

const ExploreNav: React.FC<ExploreNavProps> = ({ setProperties }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:640px), { noSsr: true}, suppressHydrationWarning={true}",
    //make sure to get rid of the hydration warning
  });

  const pathnameUrl = usePathname();
  return (
    <nav className="flex flex-row items-center gap-4 relative my-4 w-full ">
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
              src="/logos/fullegg.png"
              priority={true}
              width={80}
              height={80}
            />
          </div>
          <Search setProperties={setProperties} />
          <div
            className={`${
              pathnameUrl === "/explore" ? "text-nesstYellow" : "text-black"
            } `}
          >
            <Link
              href="/explore"
              className="flex-1 text-center hover:underline  hover:text-nesstYellow cursor-pointer "
            >
              <p className=" text-md">Explore</p>
            </Link>
          </div>
          <div
            className={`${
              pathnameUrl === "/favourites" ? "text-nesstYellow" : "text-black"
            } `}
          >
            <Link
              href="/favourites"
              className="flex-1 text-center hover:underline  hover:text-nesstYellow cursor-pointer"
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
              className="flex-1 text-center hover:underline  hover:text-nesstYellow cursor-pointer"
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
              className="flex-1 text-center hover:underline  hover:text-nesstYellow cursor-pointer"
            >
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
