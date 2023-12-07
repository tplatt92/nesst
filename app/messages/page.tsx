"use client";
import Footer from "../components/Footer";
import { usePathname } from "next/navigation";

import Link from "next/link";

export default function Messages() {
  const pathname = usePathname();
  return (
    <>
      <div>
        <Footer pathnameUrl={pathname} />
      </div>
    </>
  );
}
