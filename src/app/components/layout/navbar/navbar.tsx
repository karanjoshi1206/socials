"use client";

import Link from "next/link";
import ProfileButton from "@components/ui/profileButton/profileButton";
import { PublicPageLink } from "@/app/components/ui/publicPageLink/publicPageLink";
import useAuth from "@/app/hooks/useAuth";
import { Wordmark } from "@/app/components/ui/brand/wordmark";

export default function Navigation() {
  const { session, status } = useAuth();
  const signedIn = status === "authenticated" && Boolean(session?.user);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4">
        <Wordmark className="text-[15px]" />
        <div className="flex items-center gap-4 text-sm">
          {signedIn && (
            <div className="hidden items-center gap-4 text-muted-foreground sm:flex">
              <Link href="/choose-socials" className="hover:text-foreground">
                Add
              </Link>
              <PublicPageLink className="hover:text-foreground" />
            </div>
          )}
          <ProfileButton />
        </div>
      </nav>
    </header>
  );
}
