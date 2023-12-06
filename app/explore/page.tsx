"use client";

import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";
import Carousel from "../components/CardCarousell";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const osloDummyData = [
  {
    id: 1,
    name: "Oslo Central Apartment",
    description: "A modern apartment in the heart of Oslo.",
    imageURL: [
      "/imagesTest/photo1.webp",
      "/imagesTest/photo2.webp",
      "/imagesTest/photo3.webp",
      "/imagesTest/photo4.webp",
    ],
    location: "Oslo Central",
    bedrooms: 6,
    bathrooms: 3,
    price: "$200 per night",
    date: "15/03-15/05",
  },
  {
    id: 2,
    name: "Scenic View Studio",
    description: "A studio with a beautiful view of Oslo.",
    imageURL: [
      "/imagesTest/photo1.webp",
      "/imagesTest/photo2.webp",
      "/imagesTest/photo3.webp",
      "/imagesTest/photo4.webp",
    ],
    location: "Oslo Waterfront",
    bedrooms: 4,
    bathrooms: 2,
    price: "$150 per night",
    date: "10/10-10/12",
  },
  {
    id: 3,
    name: "Cozy Loft in Oslo",
    description: "A cozy loft apartment in a quiet area of Oslo.",
    imageURL: [
      "/imagesTest/photo1.webp",
      "/imagesTest/photo2.webp",
      "/imagesTest/photo3.webp",
      "/imagesTest/photo4.webp",
    ],
    location: "Quiet Oslo Neighborhood",
    bedrooms: 5,
    bathrooms: 3,
    price: "$180 per night",
    date: "05/01-05/03",
  },
  {
    id: 4,
    name: "Oslo Lakeside Retreat",
    description: "A peaceful retreat by the lakeside in Oslo.",
    imageURL: [
      "/imagesTest/photo1.webp",
      "/imagesTest/photo2.webp",
      "/imagesTest/photo3.webp",
      "/imagesTest/photo4.webp",
    ],
    location: "Oslo Lakeside",
    bedrooms: 6,
    bathrooms: 4,
    price: "$250 per night",
    date: "10/10-04/12",
  },
];
export default function Explore() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 pb-20">
      <nav className="flex flex-row relative justify-between my-4">
        <form className="flex items-center">
          <div className="flex bg-white p-2 border-solid border-2 border-gray-300 rounded-full left-0 h-16 items-center">
            <input className="h-12 items-center rounded-l-full" type="text" placeholder="Search Destinations" />
            <button type="button"><MagnifyingGlassIcon className="h-12 text-white ml-3 bg-yellow-600 p-2 rounded-full" /></button>
          </div>
          <button className="pl-4 mr-2" type="button">Filter</button>
        </form>
      </nav>
            <div className="grid grid-col-1 gap-4" data-testid="card-id">
        {osloDummyData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="relative">
              {/* <Image
                src={item.imageURL}
                alt="property photo"
                width={360}
                height={330}
                className="rounded-lg"
              /> */}
              <Carousel images={item.imageURL} />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl font-monserrat font-semibold">
                {item.name}
              </CardTitle>
              <CardDescription className="text-yellow-600 text-base font-medium">
                {item.location}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="font-medium">{item.price}</p>
              <p className="text-gray-400 ">{item.date}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Footer />
    </main>
  );
}

{
  /* <div>
<h1 className="bg-nesstYellow text-white p-1 text-1xl font-serif font-bold font-montserrat">
  Hello
</h1>
<h1 className="bg-nesstLightGrey text-white p-2 text-2xl font-sans hover:underline font-montserrat">
  Hello
</h1>
<h1 className="bg-nesstDarkGrey text-white p-3 text-3xl font-mono underline border-solid border-white border-4 text-center font-montserrat">
  Hello
</h1>
</div> */
}

{
  /* <button className="material-symbols-outlined absolute top-5 right-4 mt-4 mr-4 text-black text-4xl font-extrabold cursor-pointer focus:text-red-700 bg-white rounded-full bg-opacity-50">
                Favorite
              </button> */
}
