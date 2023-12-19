import { supabase } from "../utils/supabase";
import { useEffect, useState } from "react";

export default function Messages() {
  const [messages, setMessages] = useState<null | any[]>(null);
  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("messages").select("*");
      if (!data) {
        alert("No data found");
        return;
      }
      setMessages(data);
    };
    getData();
  }, []);

  return messages?.map((message) => (
    <div key={message.id}>{message.content}</div>
  ));
}
