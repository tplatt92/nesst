"use client";
import { Auth } from "@supabase/auth-ui-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import React from "react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Link from "next/link";

export default function Login() {
  const supabase = createClientComponentClient<Database>();
  const customTheme = {
    default: {
      colors: {
        brand: "#d9a66d",
        brandButtonText: "#FFF",
      },
    },
  };

  supabase.auth.onAuthStateChange(async (event) => {
    if (event == "SIGNED_IN") {
      window.location.href = "/explore";
    }
  });

  return (
    <div className=" h-screen flex flex-col justify-center items-center bg-black ">
      <div className="col p-16 text-gray-500">
        <Auth
          supabaseClient={supabase}
          view="sign_in"
          appearance={{
            theme: ThemeSupa,
            style: {
              button: { borderRadius: "9999px" },
              input: { borderRadius: "9999px", color: "white" },
            },
            variables: {
              default: {
                colors: {
                  brand: "#39393a",
                  brandAccent: "#39393a",
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
          showLinks={false}
          providers={["google", "apple", "facebook"]}
        />
        <Link
          className="hover:underline focus:underline text-sm"
          href="/register"
        >
          Don&#39;t have an account? Sign up!
        </Link>
      </div>
    </div>
  );
}
