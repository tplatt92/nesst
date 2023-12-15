// import NextJsCarousel from "../components/CardCarousell";
"use client";
import ExploreNav from "../components/ExploreNav";
import Footer from "../components/Footer";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import { useState } from "react";

const images = [
  "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

export default function Favourites() {
  const pathname = usePathname();
  const isMobile = useMediaQuery({
    query: "(max-width:640px), { noSsr: true }",
  });
  const [properties, setProperties] = useState<null | any[]>(null);
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-4 lg:px-8 pb-2">
        <ExploreNav setProperties={setProperties} />
        {isMobile && <Footer pathnameUrl={pathname} />}
      </main>
    </>
  );
}
