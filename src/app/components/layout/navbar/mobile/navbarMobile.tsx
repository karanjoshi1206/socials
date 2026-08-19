"use client";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import ProfileButton from "@/app/components/ui/profileButton/profileButton";
import { Wordmark } from "@/app/components/ui/brand/wordmark";

export default function NavigationMobile() {
  return (
    <nav className="flex h-full items-center justify-between p-2 md:hidden">
      <Wordmark />
      <Sheet>
        <SheetTrigger>
          <Menu className="text-foreground" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>socials</SheetTitle>
          </SheetHeader>
          <SheetDescription>
            <div className="mt-10 flex flex-col items-center gap-4">
              <ProfileButton />
            </div>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
