import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SocialCardProps {
  _id: string;
  title: string;
  socialLogo: string;
}

const SocialCard: React.FC<SocialCardProps> = ({ title, socialLogo,_id }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
      <div className="flex items-center">
        {/* Social Logo */}
        <div className="w-12 h-w-12 relative">{socialLogo && <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/${socialLogo}`} alt={title} height={40} width={40} objectFit="cover" className="rounded-md" />}</div>

        {/* Social Info */}
        <div className="ml-4 flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        </div>

        {/* Create Button */}
        <div>
          <Button className="bg-blue-600 dark:bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">

            <Link href={`/new/${_id}`}>Create</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialCard;
