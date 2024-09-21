"use client";
import Profile from "@/app/components/layout/profile/profile";
import { SessionProvider } from "next-auth/react";

const ProfilePage = () => {
  return (
    <div>
      <SessionProvider>
        <Profile />
      </SessionProvider>
    </div>
  );
};

export default ProfilePage;
