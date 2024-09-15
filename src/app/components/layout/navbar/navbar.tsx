"use client";
import { SessionProvider } from "next-auth/react";
import ProfileButton from "@components/ui/profileButton/profileButton";

export default function Navigation() {
  return (
    <nav className="hidden md:flex justify-between items-center p-2 ">
      <h1>Socials</h1>{" "}
      <SessionProvider>
        <ProfileButton />
      </SessionProvider>
    </nav>
  );
}
