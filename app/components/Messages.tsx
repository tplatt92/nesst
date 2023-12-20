import { supabase } from "../utils/supabase";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

type Message = {
  id: string;
  created_at: string;
  content: string;
  profile_id: string;
};

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("messages").select("*");
      if (!data) {
        alert("No data found");
        return;
      }
      console.log(data);
      setMessages(data);
    };
    getData();
  }, []);

  function handleInserts(payload: any) {
    const newMessage = payload.new;
    setMessages((currentMessages) => [...currentMessages, newMessage]);
  }

  useEffect(() => {
    const supscription = supabase
      .channel("channelOne")
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
        <li className="w-1/2 bg-gray-100 m-4" key={message.id}>
          {message.content}
        </li>
      ))}
    </ul>
  );
}
