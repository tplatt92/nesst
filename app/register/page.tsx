"use client";
import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

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
      <div className=" h-screen flex flex-col justify-center bg-black ">
        <div className="col p-16 text-gray-500">
          <Auth
            supabaseClient={supabase}
            view="sign_up"
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
        </div>
      </div>
    </>
  );
}
