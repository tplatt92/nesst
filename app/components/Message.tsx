import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { Message, Profile, ProfileCache } from "../../types/types.ts";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { Session } from "@supabase/auth-helpers-nextjs";

const MessageItem = ({
  message,
  profile,
  setProfileCache,
}: {
  message: Message;
  profile?: Profile;
  setProfileCache: Dispatch<SetStateAction<ProfileCache>>;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClientComponentClient<Database>();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, username")
        .match({ id: message.profile_id })
        .single();

      if (data) {
        setProfileCache((current) => ({
          ...current,
          [data.id]: data,
        }));
      }
    };
    if (!profile) {
      fetchProfile();
    }
  }, [profile, message.profile_id]);

  return (
    <li
      key={message.id}
      className={
        message.profile_id === userId
          ? "self-end rounded bg-blue-400 px-2"
          : "self-start rounded bg-gray-100 px-2"
      }
    >
      <span className="block text-xs text-gray-500">
        {profile?.username ?? "Loading..."}
      </span>
      <span className="">{message.content}</span>
    </li>
  );
};

export default MessageItem;
