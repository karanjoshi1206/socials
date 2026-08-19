import Image from "next/image";
import Link from "next/link";

type SocialCardProps = {
  _id: string;
  title: string;
  socialLogo: string;
};

const SocialCard = ({ title, socialLogo, _id }: SocialCardProps) => {
  return (
    <Link
      href={`/new/${_id}`}
      className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 transition-colors hover:bg-muted"
    >
      {socialLogo && <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/${socialLogo}`} alt="" height={36} width={36} className="rounded-md" />}
      <span className="flex-1 font-medium">{title}</span>
      <span className="text-sm text-muted-foreground">Add</span>
    </Link>
  );
};

export default SocialCard;
