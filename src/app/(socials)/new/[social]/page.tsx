import SocialForm from "@/app/components/ui/socialForm/socialForm";
import { dbConnect } from "@/lib/db/mongoose";
import { getSocialById } from "@/lib/services/socials";
import { Social as SocialModel } from "@/app/models/socials";
import { PageShell } from "@/app/components/layout/pageShell";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Social({ params }: { params: { social: string } }) {
  await dbConnect();
  const response = await getSocialById(params.social);
  const data = (response.body ?? {}) as SocialModel;

  if (response.status !== 200 || !data?._id) {
    return (
      <PageShell width="narrow" className="text-center">
        <p>That platform was not found.</p>
        <Link href="/choose-socials" className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground">
          Choose another
        </Link>
      </PageShell>
    );
  }

  return (
    <PageShell width="narrow">
      <p className="mb-2 text-sm text-muted-foreground">
        <Link href="/choose-socials" className="hover:text-foreground">
          Add
        </Link>
        <span className="mx-2">/</span>
        {data.title}
      </p>
      <h1 className="text-2xl font-semibold tracking-tight">Add {data.title}</h1>
      <p className="mt-1 mb-8 text-sm text-muted-foreground">Enter the username people should find you by.</p>
      <SocialForm socialData={data} />
    </PageShell>
  );
}
