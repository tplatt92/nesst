// components/UserConnections.tsx
import React from "react";
import AvatarProfile from "./AvatarProfile";
import Link from "next/link";

interface ConnectionData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  username: string | null;
}

interface UserConnectionsProps {
  connections: ConnectionData[] | null;
}

const UserConnections: React.FC<UserConnectionsProps> = ({ connections }) => {
  if (!connections) {
    return <div>Error fetching connections data.</div>;
  }

  if (connections.length === 0) {
    return <div>No connections found.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {connections.map((connection) => (
        <Link key={connection.id} href={`/profile/${connection.username}`}>
          <div className="p-2 flex items-center gap-4 border rounded-md">
            <AvatarProfile
              uid={connection.id}
              url={`/${connection.avatar_url}`}
              size={60}
            />
            <p className="text-lg font-semibold">
              {connection.first_name} {connection.last_name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserConnections;
