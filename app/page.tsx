import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" h-screen flex flex-col justify-center text-white overflow-hidden bg-[url('/backgroundImages/home2.jpg')] bg-cover">
      <div className="flex items-center pb-16 px-10 pt-60">
        <Image
          src="/logos/emptyegg.png"
          alt="Nesst Logo"
          width={40}
          height={20}
          className="mr-4"
        />
        <h1 className="text-5xl tracking-[0.4em]">NESST</h1>
      </div>
      <div className="pb-16 px-10">
        <h2 className="text-xl w-60 pb-8">
          Join the world&#39;s largest nomad community
        </h2>
        <p className="text-sm">And find your perfect nest</p>
      </div>
      <div className="flex flex-col items-center justify-center w-screen gap-3 pb-16">
        <Link href="/register" className="w-screen flex justify-center">
          <button className="bg-[#d9a66d] w-5/6 py-2 rounded-full">
            Register
          </button>
        </Link>
        <Link href="/register" className="w-screen flex justify-center">
          <button className="border border-white w-5/6 py-2 rounded-full">
            Log in
          </button>
        </Link>
      </div>
      <div className="flex justify-center gap-8">
        <Image
          src="/logos/google.png"
          alt="Google Logo"
          width={30}
          height={30}
        />
        <Image src="/logos/apple.png" alt="Apple Logo" width={30} height={30} />
        <Image src="/logos/meta.png" alt="Meta Logo" width={30} height={30} />
      </div>
    </div>
  );
}
