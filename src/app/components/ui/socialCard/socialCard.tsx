import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type SocialCardProps = {
  _id: string;
  title: string;
  socialLogo: string;
};

const SocialCard = ({ title, socialLogo, _id }: SocialCardProps) => {
  return (
    <Link
      href={`/new/${_id}`}
      className="group flex items-center gap-3 rounded-2xl border bg-card px-4 py-3.5 shadow-sm transition-all hover:-translate-y-px hover:shadow-md"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
        {socialLogo ? (
          <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/${socialLogo}`} alt="" height={28} width={28} className="rounded-md" />
        ) : (
          <span className="text-sm font-medium">{title[0]}</span>
        )}
      </div>
      <span className="flex-1 font-medium">{title}</span>
      <span className="flex items-center gap-0.5 text-sm text-muted-foreground">
        Add
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
};

export default SocialCard;
