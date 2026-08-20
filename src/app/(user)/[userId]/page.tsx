import ShareButton from "@/app/components/ui/shareButton/shareButton";
import { USER_SOCIAL } from "@/app/models/socials";
import { dbConnect } from "@/lib/db/mongoose";
import { getUserHandlesById, getUserHandlesByUsername } from "@/lib/services/users";
import { isMongoObjectId, publicPagePath } from "@/lib/username";
import Image from "next/image";
import { PageShell } from "@/app/components/layout/pageShell";
import { ArrowUpRight } from "lucide-react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type PublicProfile = {
  name?: string;
  username?: string;
  userName?: string;
  handles?: USER_SOCIAL[];
  _id?: string;
};

const User = async ({ params }: { params: { userId: string } }) => {
  await dbConnect();
  const slug = decodeURIComponent(params.userId);

  const getUserData = isMongoObjectId(slug) ? await getUserHandlesById(slug) : await getUserHandlesByUsername(slug);
  const userHandles = (getUserData.status === 200 ? getUserData.body : null) as PublicProfile | null;

  if (!userHandles) {
    return (
      <PageShell width="narrow" className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">That username does not exist.</p>
      </PageShell>
    );
  }

  const canonicalPath = publicPagePath(userHandles);
  if (canonicalPath !== `/${slug}` && userHandles.username) {
    redirect(canonicalPath);
  }

  const sharePath = canonicalPath.startsWith("/") ? canonicalPath : `/${slug}`;

  if (!userHandles.handles?.length) {
    return (
      <PageShell width="narrow" className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{userHandles.name || "This page"}</h1>
        {userHandles.username && <p className="mt-1 text-sm text-muted-foreground">@{userHandles.username}</p>}
        <p className="mt-4 text-sm text-muted-foreground">No socials to show yet.</p>
        <div className="mt-8 flex justify-center">
          <ShareButton path={sharePath} />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell width="narrow">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{userHandles.name}</h1>
        {userHandles.username && <p className="mt-1 text-sm text-muted-foreground">@{userHandles.username}</p>}
      </div>
      <div className="space-y-3">
        {userHandles.handles.map((handleObj: USER_SOCIAL) => (
          <a
            key={handleObj._id}
            href={`${handleObj.platform.socialBaseUrl}${handleObj.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-2xl border bg-card px-4 py-3.5 shadow-sm transition-all hover:-translate-y-px hover:shadow-md"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
              <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/${handleObj.platform.socialLogo}`} alt="" width={28} height={28} className="rounded-md" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium leading-tight">{handleObj.platform.title}</p>
              <p className="truncate text-sm text-muted-foreground">{handleObj.handle}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <ShareButton path={sharePath} />
      </div>
    </PageShell>
  );
};

export default User;
