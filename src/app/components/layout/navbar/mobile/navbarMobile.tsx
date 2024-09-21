"use client";
import Link from "next/link";
import logo from "@/app/assets/logo.webp";

import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { Menu, Phone } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import ProfileButton from "@/app/components/ui/profileButton/profileButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NavigationMobile() {
  return (
    <nav className="flex justify-between items-center p-2 drop-shadow-2xl md:hidden h-full">
      <Link href={"/"} className="text-white text-lg flex items-center gap-2">
        <h1 className="text-lg font-bold">SOCIALS</h1>
        <Image src={logo} height={40} width={40} alt="SOCIALS" className="rounded-full" />
      </Link>{" "}
      {/* Updated for visibility */}
      <Sheet>
        <SheetTrigger>
          <Menu className="text-white" /> {/* Ensured the menu icon is visible */}
        </SheetTrigger>
        <SheetContent className="bg-gray-900 text-white">
          <SheetHeader>
            <SheetTitle className="text-white">All your socials in one place</SheetTitle>
          </SheetHeader>
          <SheetDescription>
            <SessionProvider>
              <div className="flex flex-col items-center gap-4 mt-10">
                <ProfileButton />
              </div>
            </SessionProvider>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
