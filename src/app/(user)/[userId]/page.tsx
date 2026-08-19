import ShareButton from "@/app/components/ui/shareButton/shareButton";
import { USER_SOCIAL } from "@/app/models/socials";
import { dbConnect } from "@/lib/db/mongoose";
import { getUserHandlesById } from "@/lib/services/users";
import Image from "next/image";
import { PageShell } from "@/app/components/layout/pageShell";

export const dynamic = "force-dynamic";

const User = async ({ params }: { params: { userId: string } }) => {
  await dbConnect();
  const getUserData = await getUserHandlesById(params.userId);
  const userHandles = getUserData.body as {
    name?: string;
    username?: string;
    handles?: USER_SOCIAL[];
  } | null;

  if (!userHandles?.handles?.length) {
    return (
      <PageShell width="narrow" className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Nothing here yet</h1>
        <p className="mt-2 text-sm text-muted-foreground">This page has no socials to show.</p>
      </PageShell>
    );
  }

  return (
    <PageShell width="narrow">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{userHandles.name}</h1>
        {userHandles.username && <p className="mt-1 text-sm text-muted-foreground">@{userHandles.username}</p>}
      </div>
      <div className="space-y-2">
        {userHandles.handles.map((handleObj: USER_SOCIAL) => (
          <a
            key={handleObj._id}
            href={`${handleObj.platform.socialBaseUrl}${handleObj.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 transition-colors hover:bg-muted"
          >
            <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/${handleObj.platform.socialLogo}`} alt="" width={32} height={32} className="rounded-full" />
            <div className="min-w-0">
              <p className="font-medium leading-tight">{handleObj.platform.title}</p>
              <p className="truncate text-sm text-muted-foreground">{handleObj.handle}</p>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <ShareButton />
      </div>
    </PageShell>
  );
};

export default User;
