"use client";
import { Auth } from "@supabase/auth-ui-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();

  return (
    <Auth
      supabaseClient={supabase}
      view="sign_in"
      appearance={{
        theme: ThemeSupa,
        style: {
          button: { borderRadius: "9999px" },
          input: { borderRadius: "9999px" },
        },
        variables: {
          default: {
            colors: {
              brand: "#d9a66d",
              brandAccent: "#d9a66d",
            },
          },
        },
      }}
      localization={{
        variables: {
          sign_in: {
            social_provider_text: "Sign in",
          },
        },
      }}
      showLinks={true}
      providers={["google", "apple", "facebook"]}
      redirectTo="http://localhost:3000/auth/callback"
    />
  );
}
