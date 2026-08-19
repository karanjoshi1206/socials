import { Social } from "@/app/models/socials";
import { dbConnect } from "@/lib/db/mongoose";
import { getDefaultSocials } from "@/lib/services/socials";
import SocialCard from "../socialCard/socialCard";
import { PageShell } from "@/app/components/layout/pageShell";
import Link from "next/link";

const SocialsList = async () => {
  await dbConnect();
  const socials = await getDefaultSocials();
  const data = Array.isArray(socials.body) ? (socials.body as Social[]) : [];

  return (
    <PageShell>
      <p className="mb-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        Add
      </p>
      <h1 className="text-2xl font-semibold tracking-tight">Choose a platform</h1>
      <p className="mt-1 mb-8 text-sm text-muted-foreground">Pick one, then add your handle.</p>
      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No platforms found. Check the database connection.</p>
      ) : (
        <div className="space-y-2">
          {data.map((social: Social) => (
            <SocialCard key={social._id} {...social} />
          ))}
        </div>
      )}
    </PageShell>
  );
};

export default SocialsList;
