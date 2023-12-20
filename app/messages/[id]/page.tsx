"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import Messages from "../../components/Messages";
export default function Chat() {
  const supabase = createClientComponentClient<Database>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { message } = Object.fromEntries(new FormData(form));

    if (typeof message === "string" && message.trim().length !== 0) {
      form.reset();
      const { data, error } = await supabase
        .from("messages")
        .insert([{ content: message }]);
      console.log({ data });
      if (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex gap-4 p-8 bg-gray-100">
        <p>Avatar</p>
        <h1>Name</h1>
      </header>
      <main className="flex flex-1 justify-between flex-col">
        <div className="overflow-y-scroll">
          <p>content</p>
          <Messages />
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <input
              className="bg-gray-100 py-2 w-full"
              type="message"
              name="message"
            ></input>
          </form>
        </div>
      </main>
    </div>
  );
}
