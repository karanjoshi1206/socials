import Image from "next/image";
import { USER_SOCIAL } from "@/app/models/socials";
import EditUserCard from "./editUserCard";
import DeleteUserCard from "./deleteUserCard";
import CopyToClipBoard from "../copyToClipBoard/copyToClipBoard";
import { ArrowUpRight } from "lucide-react";

const UserSocialCard = ({ handle }: { handle: USER_SOCIAL }) => {
  const href = `${handle?.platform.socialBaseUrl}${handle?.handle}`;

  return (
    <article className="group rounded-2xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-3">
        <a href={href} target="_blank" rel="noopener noreferrer" className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
            {handle?.platform.socialLogo ? (
              <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/${handle.platform.socialLogo}`} alt="" width={28} height={28} className="rounded-md" />
            ) : (
              <span className="text-sm font-medium">{handle?.platform.title?.[0]}</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="flex items-center gap-1 font-medium leading-tight">
              {handle?.platform.title}
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </p>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">{handle?.handle}</p>
          </div>
        </a>
      </div>
      <div className="mt-4 flex gap-2 border-t pt-3">
        <CopyToClipBoard text={href} />
        <EditUserCard handle={handle} />
        <DeleteUserCard handle={handle} />
      </div>
    </article>
  );
};

export default UserSocialCard;
