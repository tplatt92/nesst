//component to render out all properties that a user has favourited
import React from "react";
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
          width={100}
          height={50}
          alt="property image"
          className="rounded-xl"
          priority
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <div className="border-b flex-1 py-8 lg:py-14">
        <div className="flex justify-between items-center font-bold">
          <p className="text-lg lg:text-2xl font-semibold">{name}</p>
        </div>
        <p className="text-sm font-normal">{description}</p>
      </div>
    </div>
  );
};

export default LikedPropertiesItem;
