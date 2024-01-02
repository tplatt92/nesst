// components/UserConnections.tsx  [for use in Nomads]
import React from "react";
import AvatarProfile from "./AvatarProfile";
import Link from "next/link";

interface MessageContainerItemProps {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  username: string | null;
}

const MessageContainerItem: React.FC<MessageContainerItemProps> = ({
  first_name,
  last_name,
  avatar_url,
  id,
}) => {
  return (
    <div className="flex items-center gap-4 ">
      <div>
        <AvatarProfile uid={id} url={`/${avatar_url}`} size={80} />
      </div>
      <div className="border-y flex-1 py-8">
        <div className="flex justify-between items-center font-bold">
          <p className="text-lg font-semibold">
            {first_name} {last_name}
          </p>
          <p>19:41</p>
        </div>
        <p className="">What are your thoughts on...</p>
      </div>
    </div>
  );
};

export default MessageContainerItem;
