"use client";
import Link from "next/link";

import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { Menu, Phone } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import ProfileButton from "@/app/components/ui/profileButton/profileButton";
import { Button } from "@/components/ui/button";

export default function NavigationMobile() {
  return (
    <nav className="flex justify-between items-center p-2 drop-shadow-2xl md:hidden h-full">
      <h1 className="text-white text-lg">Socials</h1> {/* Updated for visibility */}
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
            <Button>
              <Link href="/choose-socials">Create Socials</Link>
            </Button>
          </SheetDescription>
          <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"></div>
          <SheetFooter className="w-[100%] absolute bottom-0 left-[50%] right-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <Link href="#" className="flex justify-center items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
              <Phone className="text-gray-300" /> Contact Us
            </Link>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
