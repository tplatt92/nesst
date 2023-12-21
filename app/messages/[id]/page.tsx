"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import Messages from "../../components/Messages";
import { ProfileCache } from "@/types/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AvatarProfile from "../../components/AvatarProfile";
import Link from "next/link";
import Image from "next/image";

interface PropertiesProps {
  id: string;
  name: string | null;
  description: string | null;
  image: string[];
}

export default function Chat() {
  const pathname = usePathname();
  const supabase = createClientComponentClient<Database>();
  const [roomId, setRoomId] = useState<string | null>("");
  const [properties, setProperties] = useState<null | PropertiesProps>(null);

  const actualPathname = pathname.split("/").pop();
  useEffect(() => {
    const getProperty = async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", actualPathname)
        .single();

      if (data) {
        setProperties(data);
      }
      if (error) {
        alert(error.message);
      }
    };
    getProperty();
  }, [actualPathname]); // eslint-disable-line

  // get the room with property id

  useEffect(() => {
    const getRooms = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("property_id", actualPathname);

      if (data) {
        setRoomId(data[0].id);
      }
      if (error) {
        alert(error.message);
      }
    };
    getRooms();
  }, []); // eslint-disable-line

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { message } = Object.fromEntries(new FormData(form));

    if (typeof message === "string" && message.trim().length !== 0) {
      form.reset();
      const { data, error } = await supabase
        .from("messages")
        .insert([{ content: message, room_id: roomId }]);

      if (error) {
        alert(error.message);
      }
    }
  };
  type ImageType = {
    src: string | undefined;
    height: number;
    width: number;
  };
  let src = properties?.image[0];
  type PropertyProfileProps = {
    properties?: { image: ImageType[] };
  };
  //component for header
  function PropertyProfile() {
    return (
      <div>
        <Image
          width={60}
          height={60}
          src={src || ""}
          alt="property"
          className="avatar image rounded-r-full object-cover rounded-b-full border-4 border-white"
          style={{ height: 60, width: 70 }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <header className=" flex items-center gap-8 p-4 pt-8 md:pt-4 bg-gray-100">
        <Link href="/messages">
          <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </div>
        </Link>
        <PropertyProfile />

        <div>
          <h1 className=" text-md font-bold md:text-xl">{properties?.name}</h1>
          <p className="text-sm">{properties?.description}</p>
        </div>
      </header>
      <main className="flex flex-1 justify-between flex-col max-h-[85%]">
        <div className="overflow-y-scroll flex flex-col h-screen">
          <Messages
            roomId={roomId}
            profileCache={{}}
            setProfileCache={function (
              value: React.SetStateAction<ProfileCache>
            ): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <input
              className=" py-2 w-[83%] fixed bottom-2 left-2 flex justify-center shadow-inner rounded-full border-gray-400 border-2"
              type="message"
              name="message"
            ></input>
            <button
              type="submit"
              className="bg-nesstYellow py-2 w-[10%] fixed bottom-2 right-2 flex justify-center border shadow-2xl rounded-full color-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-send-horizontal"
              >
                <path d="m3 3 3 9-3 9 19-9Z" />
                <path d="M6 12h16" />
              </svg>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
