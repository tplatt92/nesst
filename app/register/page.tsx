"use client";
import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import Link from "next/link";

export default function SignUp() {
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
    <>
      <div className=" h-screen flex flex-col justify-center items-center bg-black ">
        <div className="col p-16 text-gray-500">
          <Auth
            supabaseClient={supabase}
            view="magic_link"
            appearance={{
              theme: ThemeSupa,
              style: {
                button: { borderRadius: "9999px" },
                input: { borderRadius: "9999px", color: "white" },
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
                sign_up: {
                  social_provider_text: "Sign up",
                },
              },
            }}
            showLinks={false}
            providers={["google", "apple", "facebook"]}
            redirectTo="http://localhost:3000/auth/register"
          />
          <Link
            className="hover:underline focus:underline text-sm"
            href="/login"
          >
            Already have an account? Sign in.
          </Link>
        </div>
      </div>
    </>
  );
}
