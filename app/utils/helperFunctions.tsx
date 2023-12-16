import Image from "next/image";
import Link from "next/link";

export function renderUserPhoto(src: string, alt: string) {
  return (
    <Image
      src={src}
      height={50}
      width={50}
      alt={alt}
      className="rounded-r-full object-cover rounded-b-full border-4 border-gray-300"
    />
  );
}

export function renderSocialLink(href: string, src: string, alt: string) {
  return (
    <Link href={href}>
      <Image src={src} height={40} width={40} alt={alt} />
    </Link>
  );
}
