import Image from "next/image";
import { USER_SOCIAL } from "@/app/models/socials";
import React from "react";
import Link from "next/link";
import EditUserCard from "./editUserCard";
import DeleteUserCard from "./deleteUserCard";

const UserSocialCard = ({ handle, refreshFunction }: { handle: USER_SOCIAL; refreshFunction: (email: string) => any }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ">
      <div className="p-4 flex flex-col items-start">
        {/* Header with Logo and Title */}
        <div className="flex items-center mb-4 w-full">
          {handle?.platform.socialLogo && (
            <Image
              src={`${process.env.NEXT_PUBLIC_CDN_URL}/${handle?.platform.socialLogo}`}
              alt={handle?.platform.title}
              width={40}
              height={40}
              className="mr-3 rounded-full"
              //   onError={(e) => {
              //     (e.target as HTMLImageElement).src = "/fallback-logo.png"; // Use fallback image if logo fails to load
              //   }}
            />
          )}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{handle?.platform.title}</h2>
        </div>

        {/* Handle and Link */}
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Handle:</strong> {handle?.handle}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <a href={`${handle?.platform.socialBaseUrl}${handle?.handle}`} className="text-blue-500 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
            {handle?.platform.socialBaseUrl}
            {handle?.handle}
          </a>
        </p>

        <div className="flex gap-2" >
          <EditUserCard handle={handle} />

          <DeleteUserCard handle={handle} />
        </div>
      </div>
    </div>
  );
};

export default UserSocialCard;
