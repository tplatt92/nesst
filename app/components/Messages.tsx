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

export default function Messages({ roomId }: MessagesProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef<HTMLUListElement>(null);
  const [profileCache, setProfileCache] = useState<ProfileCache>({});
  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("room_id", roomId);
      if (!data) {
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
      scrollToBottom();
    };
    getData();
  }, [roomId]);

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
      );

    scrollToBottom();

    const subscriptionObject = supscription.subscribe();

    return () => {
      supabase.removeChannel(subscriptionObject);
    };
  }, [messages]);

  return (
    <ul
      ref={messagesRef}
      className="flex flex-col self-end space-y-2 p-4 w-full"
    >
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
