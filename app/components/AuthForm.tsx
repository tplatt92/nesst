// "use client";
// import { Auth } from "@supabase/auth-ui-react";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { Database } from "@/types/supabase";
// import {
//   // Import predefined theme
//   ThemeSupa,
// } from "@supabase/auth-ui-shared";
// export const supabase = createClientComponentClient<Database>();
// export default function AuthForm() {
//   return (
//     <Auth
//       supabaseClient={supabase}
//       view="sign_in"
//       appearance={{
//         theme: ThemeSupa,
//         style: {
//           button: { borderRadius: "9999px" },
//           input: { borderRadius: "9999px", color: "white" },
//         },
//         variables: {
//           default: {
//             colors: {
//               brand: "#d9a66d",
//               brandAccent: "#d9a66d",
//             },
//           },
//         },
//       }}
//       localization={{
//         variables: {
//           sign_in: {
//             social_provider_text: "Sign in",
//           },
//         },
//       }}
//       showLinks={true}
//       providers={["google", "apple", "facebook"]}
//       redirectTo="http://localhost:3000/auth/login"
//     />
//   );
// }
