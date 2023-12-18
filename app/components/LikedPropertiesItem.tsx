import React from "react";
import AvatarProfile from "./AvatarProfile";
import Link from "next/link";
import Image from "next/image";

interface PropertyData {
  id: string;
  name: string | null;
  description: string | null;
  image: string[] | null;
}

const LikedPropertiesItem: React.FC<PropertyData> = ({
  id,
  name,
  description,
  image,
}) => {
  //check if image is an array and if it has at least one element in it
  const url = Array.isArray(image) && image?.length > 0 ? `${image[0]}` : "";

  return (
    <div className="flex items-center gap-4 ">
      <div>
        <Image
          src={`${url}`}
          width={240}
          height={240}
          alt="property image"
          className="lg:w-[240px] lg:h-[140px] sm:w-[80px] w-[120px] h-[80px] rounded-xl"
        />
      </div>
      <div className="border-y flex-1 py-8 lg:py-14">
        <div className="flex justify-between items-center font-bold">
          <p className="text-lg lg:text-2xl font-semibold">{name}</p>
        </div>
        <p className="text-sm font-normal">{description}</p>
      </div>
    </div>
  );
};

export default LikedPropertiesItem;
