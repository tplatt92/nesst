"use client";
import { Auth } from "@supabase/auth-ui-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();

  const customTheme = {
    default: {
      colors: {
        brand: "#d9a66d",
        brandButtonText: "#FFF",
      },
    },
  };

  return (
    <Auth
      supabaseClient={supabase}
      view="sign_in"
      appearance={{
        theme: customTheme,
        style: {
          container: { background: "black" },
        },
      }}
      showLinks={true}
      providers={["google", "apple", "facebook"]}
      redirectTo="http://localhost:3000/auth/callback"
    />
  );
}
