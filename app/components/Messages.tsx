import { supabase } from "../utils/supabase";
import { useEffect, useState, useRef } from "react";
import { Session } from "@supabase/supabase-js";
import MessageItem from "./Message";
import { MessagesProps, Profile, ProfileCache } from "../../types/types.ts";

type Message = {
  id: string;
  created_at: string;
  content: string;
  profile_id: string;
};

export default function Messages({
  roomId,
  profileCache,
  setProfileCache,
}: MessagesProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("messages").select("*");
      if (!data) {
        alert("No data found");
        return;
      }

      const newProfiles = Object.fromEntries(
        data
          .map((message) => message.profile)
          .filter(Boolean) // is truthy
          .map((profile) => [profile!.id, profile!])
      );

      setProfileCache((current) => ({
        ...current,
        ...newProfiles,
      }));

      setMessages(data);

      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    };
    getData();
  }, []);

  function handleInserts(payload: any) {
    const newMessage = payload.new;
    setMessages((currentMessages) => [...currentMessages, newMessage]);
  }

  useEffect(() => {
    const supscription = supabase
      .channel("channelTwo")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        handleInserts
      )
      .subscribe();

    return () => {
      supabase.removeChannel(supscription);
    };
  }, []);

  return (
    <ul>
      {messages?.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          profile={profileCache[message.profile_id]}
          setProfileCache={setProfileCache}
        />
      ))}
    </ul>
  );
}
