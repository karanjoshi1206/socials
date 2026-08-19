"use client";

import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { LogOut, Plus, User } from "lucide-react";
import useAuth from "@/app/hooks/useAuth";
import AuthButton from "@components/ui/authButton/authButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PublicPageMenuItem } from "@/app/components/ui/publicPageLink/publicPageLink";

const ProfileButton = () => {
  const { session, status } = useAuth();

  if (status === "loading") {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />;
  }

  if (!session?.user) {
    return <AuthButton mode="signin" />;
  }

  const names = session.user.name?.split(" ") ?? [];
  const initials = `${names[0]?.[0] ?? ""}${names[1]?.[0] ?? ""}` || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring">
        <Avatar className="h-8 w-8">
          <AvatarImage src={session.user.image || ""} alt="" />
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel className="truncate font-normal text-muted-foreground">{session.user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex cursor-pointer items-center justify-between">
            Profile
            <User size={16} />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/choose-socials" className="flex cursor-pointer items-center justify-between">
            Add a social
            <Plus size={16} />
          </Link>
        </DropdownMenuItem>
        <PublicPageMenuItem />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex cursor-pointer items-center justify-between" onClick={() => signOut()}>
          Sign out
          <LogOut size={16} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
