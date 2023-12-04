"use client";

import Link from "next/link";
import Image from "next/image";
import photo1 from "C:UsersyusraDownloadsDesktopjob preposlo.jpg";

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
    imageURL: { photo1 },
    location: "Oslo Central",
    bedrooms: 6,
    bathrooms: 3,
    price: "$200 per night",
  },
  {
    id: 2,
    name: "Scenic View Studio",
    description: "A studio with a beautiful view of Oslo.",
    imageURL: { photo1 },
    location: "Oslo Waterfront",
    bedrooms: 4,
    bathrooms: 2,
    price: "$150 per night",
  },
  {
    id: 3,
    name: "Cozy Loft in Oslo",
    description: "A cozy loft apartment in a quiet area of Oslo.",
    imageURL: { photo1 },
    location: "Quiet Oslo Neighborhood",
    bedrooms: 5,
    bathrooms: 3,
    price: "$180 per night",
  },
  {
    id: 4,
    name: "Oslo Lakeside Retreat",
    description: "A peaceful retreat by the lakeside in Oslo.",
    imageURL: { photo1 },
    location: "Oslo Lakeside",
    bedrooms: 6,
    bathrooms: 4,
    price: "$250 per night",
  },
];
export default function Explore() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Link href="/">Home</Link>
        <Link href="/messages">Messages</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/register">Register</Link>
        <Link href="/signIn">Sign In</Link>
      </div>
      <div>
        {osloDummyData.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={item.imageURL}
                alt="property photo"
                width={500}
                height={500}
              />
            </CardContent>
            <CardFooter>
              <p>{item.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
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
