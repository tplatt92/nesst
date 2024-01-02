// import { useEffect, useState } from "react";
// import { Dispatch, SetStateAction } from "react";
// import { Message, Profile, ProfileCache } from "../../types/types.ts";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { Database } from "@/types/supabase";
// import { Session } from "@supabase/auth-helpers-nextjs";

// const MessageItem = ({
//   message,
//   profile,
//   setProfileCache,
// }: {
//   message: Message;
//   profile?: Profile;
//   setProfileCache: Dispatch<SetStateAction<ProfileCache>>;
// }) => {
//   const [session, setSession] = useState<Session | null>(null);
//   const supabase = createClientComponentClient<Database>();
//   const userId = session?.user?.id;

//   useEffect(() => {
//     const fetchSession = async () => {
//       try {
//         const { data, error } = await supabase.auth.getSession();
//         if (error) {
//           console.error("Error fetching session:", error);
//           return;
//         }
//         if (data) {
//           setSession(data?.session ?? null);
//         } else {
//           setSession(null);
//         }
//       } catch (error) {
//         console.error("An unexpected error occurred:", error);
//       }
//     };

//     fetchSession();
//   }, []); // eslint-disable-line

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const { data } = await supabase
//         .from("profiles")
//         .select("id, username")
//         .match({ id: message.profile_id })
//         .single();

//       if (data) {
//         setProfileCache((current) => ({
//           ...current,
//           [data.id]: data,
//         }));
//       }
//     };
//     if (!profile) {
//       fetchProfile();
//     }
//   }, [profile, message.profile_id]); //eslint-disable-line

//   return (
//     <li
//       key={message.id}
//       className={
//         message.profile_id === userId
//           ? "self-end rounded-xl bg-[#e7d0b6] p-2 text-right "
//           : "self-start rounded-xl  p-2 bg-[#ececec] "
//       }
//     >
//       <span className="block text-xs">{profile?.username ?? "Loading..."}</span>
//       <span className="font-semibold">{message.content}</span>
//     </li>
//   );
// };

// export default MessageItem;
