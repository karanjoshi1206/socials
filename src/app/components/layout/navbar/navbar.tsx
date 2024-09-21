"use client";
import { SessionProvider } from "next-auth/react";
import ProfileButton from "@components/ui/profileButton/profileButton";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/logo.webp";

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center p-2 ">
      <Link href={"/"} className="text-white text-lg flex items-center gap-2">
        <h1 className="text-lg font-bold">SOCIALS</h1>
        <Image src={logo} height={40} width={40} alt="SOCIALS" className="rounded-full" />
      </Link>{" "}
      <SessionProvider>
        <ProfileButton />
      </SessionProvider>
    </nav>
  );
}
