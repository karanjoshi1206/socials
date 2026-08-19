import Image from "next/image";
import { USER_SOCIAL } from "@/app/models/socials";
import EditUserCard from "./editUserCard";
import DeleteUserCard from "./deleteUserCard";
import CopyToClipBoard from "../copyToClipBoard/copyToClipBoard";

const UserSocialCard = ({ handle }: { handle: USER_SOCIAL }) => {
  const href = `${handle?.platform.socialBaseUrl}${handle?.handle}`;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-3">
        {handle?.platform.socialLogo && (
          <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/${handle?.platform.socialLogo}`} alt="" width={36} height={36} className="rounded-full" />
        )}
        <div className="min-w-0">
          <p className="font-medium leading-tight">{handle?.platform.title}</p>
          <p className="truncate text-sm text-muted-foreground">{handle?.handle}</p>
        </div>
      </a>
      <div className="flex shrink-0 gap-2">
        <CopyToClipBoard text={href} />
        <EditUserCard handle={handle} />
        <DeleteUserCard handle={handle} />
      </div>
    </div>
  );
};

export default UserSocialCard;
