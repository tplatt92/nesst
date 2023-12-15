import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" h-screen w-screen flex flex-col lg:flex-row items-center lg:justify-between justify-center text-white overflow-hidden bg-[url('/backgroundImages/home2.jpg')] lg:bg-none lg:bg-black bg-cover">
      <div className="lg:bg-[url('/backgroundImages/home5.jpg')] lg:h-screen lg:flex-1 lg:bg-cover lg:flex lg:flex-col lg:items-center">
        <div className="flex items-center pb-16 px-10 pt-60 lg:pt-80">
          <Image
            src="/logos/emptyegg.png"
            alt="Nesst Logo"
            width={40}
            height={20}
            className="mr-4"
          />
          <h1 className="text-5xl lg:text-6xl tracking-[0.4em]">NESST</h1>
        </div>
        <div className="pb-16 px-10 lg:pl-14">
          <h2 className="text-xl lg:text-2xl w-60 lg:w-80 pb-8">
            Join the world&#39;s largest nomad community
          </h2>
          <p className="text-sm lg:text-lg">And find your perfect nest</p>
        </div>
      </div>
      <div className="lg:h-screen lg:mt-[650px]">
        <div className="flex flex-col items-center justify-center w-screen lg:w-[400px] gap-3 lg:gap-8 pb-16">
          <Link
            href="/register"
            className="w-screen lg:w-full flex justify-center"
          >
            <button className="bg-[#d9a66d] w-5/6 md:w-1/2 py-2 rounded-full">
              Register
            </button>
          </Link>
          <Link
            href="/login"
            className="w-screen lg:w-full flex justify-center"
          >
            <button className="border border-white w-5/6 md:w-1/2 py-2 rounded-full">
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
          <Image
            src="/logos/apple.png"
            alt="Apple Logo"
            width={30}
            height={30}
          />
          <Image src="/logos/meta.png" alt="Meta Logo" width={30} height={30} />
        </div>
      </div>
    </div>
  );
}
