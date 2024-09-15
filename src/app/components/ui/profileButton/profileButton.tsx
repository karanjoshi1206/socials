"use client";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

import { LogOut, Settings, User } from "lucide-react";

import useAuth from "@/app/hooks/useAuth";
import AuthButton from "@components/ui/authButton/authButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PROFILE_LINKS = [
  { title: "Profile", href: "/profile", icon: <User size={20} /> },
  { title: "Settings", href: "/settings", icon: <Settings size={20} /> }
];

const ProfileButton = () => {
  const { session, status } = useAuth();
  if (status === "loading") return <div>Loading...</div>;
  if (session?.user) {
    return (
      <div className="profile-container">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={session.user.image || ""} />
              <AvatarFallback>{session.user.name?.split(" ")[0][0] + (session.user.name?.split(" ")[1][0] || "")}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {PROFILE_LINKS.map((link, index) => (
              <DropdownMenuItem key={index} className="profile-list-none p-2 cursor-pointer transition-colors duration-300 flex justify-between items-center hover:bg-gray-300">
                <Link href={link.href}>{link.title}</Link>
                {link.icon}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem className="profile-list-none p-2 cursor-pointer transition-colors duration-300 flex justify-between items-center hover:bg-gray-300" onClick={() => signOut()}>
              Sign Out
              <LogOut size={20} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  } else {
    return <AuthButton mode="signin" />;
  }
};

export default ProfileButton;
