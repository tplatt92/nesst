// components/UserConnections.tsx
import React from "react";
import AvatarProfile from "./AvatarProfile";
import Link from "next/link";

interface MessageContainerItemProps {
  id: string;
  name: string | null;
  description: string | null;
  image: string[] | null;
}

const NesstContainerItem: React.FC<MessageContainerItemProps> = ({
  name,
  description,
  image,
  id,
}) => {
  return (
    <div className="flex items-center gap-4 ">
      <div>
        <AvatarProfile uid={id} url={`${image?.[0]}`} size={80} />
      </div>

      <div className="border-y flex-1 py-8">
        <div className="flex justify-between items-center font-bold">
          <p className="text-lg font-semibold">{name}</p>
        </div>

        <p className="">{description}</p>
      </div>
    </div>
  );
};

export default NesstContainerItem;
