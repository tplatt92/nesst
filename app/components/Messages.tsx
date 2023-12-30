//getting all of the messages data related to the roomID
import { supabase } from "../utils/supabase";
import { useEffect, useState, useRef, useLayoutEffect } from "react";

import MessageItem from "./MessageItem.tsx";
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
    };
    getData();
  }, [roomId]);

  // scrolls to bottom of screen when new message is fetched
  useLayoutEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  // sets messages to include new message
  function handleInserts(payload: any) {
    const newMessage = payload.new;
    setMessages((currentMessages) => [...currentMessages, newMessage]);
  }

  // subscribes to new messages (realtime connection to the messages database for updates)
  useEffect(() => {
    const supscription = supabase
      .channel("channelTwo")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        handleInserts
      );

    const subscriptionObject = supscription.subscribe();

    return () => {
      supabase.removeChannel(subscriptionObject);
    };
  }, [messages]);

  return (
    <ul
      className="flex flex-col self-end space-y-2 p-4 overflow-y-auto w-full"
      ref={messagesRef}
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
