import { authConfig } from "@/auth";
import { dbConnect } from "@/lib/db/mongoose";
import { getUserHandlesByEmail } from "@/lib/services/users";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import UserSocialCard from "@/app/components/ui/userSocialCard/userSocialCard";
import RedirectButton from "./redirectButton";
import ShareButton from "@/app/components/ui/shareButton/shareButton";
import { USER_SOCIAL } from "@/app/models/socials";
import { PageShell } from "@/app/components/layout/pageShell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { publicPagePath } from "@/lib/username";

async function getUserInfo(email: string) {
  await dbConnect();
  const response = await getUserHandlesByEmail(email);

  if (response.status !== 200 || !response.body) {
    throw new Error("Failed to fetch user info");
  }

  return response.body as {
    userName?: string;
    username?: string;
    name: string;
    handles: Array<USER_SOCIAL>;
    _id: string;
  };
}

const HomePageLoggedIn = async () => {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/");
    return null;
  }

  let userInfo: { userId: string; userName: string; name: string; handles: Array<USER_SOCIAL> } | null = null;
  try {
    const userData = await getUserInfo(session.user?.email as string);
    userInfo = {
      userName: userData.userName || userData.username || "",
      name: userData.name,
      handles: userData.handles,
      userId: userData._id
    };
  } catch (error) {
    console.error("Error fetching user info:", error);
  }

  const firstName = userInfo?.name?.split(" ")[0] || "there";
  const handles = userInfo?.handles ?? [];

  return (
    <PageShell>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Hi, {firstName}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {userInfo?.userName ? `Your page is /${userInfo.userName}` : "Set a username, then share one link."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/choose-socials">Add</Link>
          </Button>
          {userInfo && <RedirectButton username={userInfo.userName} userId={userInfo.userId} />}
          {userInfo?.userName && <ShareButton path={publicPagePath({ userName: userInfo.userName, _id: userInfo.userId })} />}
        </div>
      </div>

      {userInfo && !userInfo.userName && (
        <div className="mb-6 rounded-2xl border bg-card p-4 shadow-sm sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="font-medium">Claim your username</p>
            <p className="mt-1 text-sm text-muted-foreground">Your public page will be /username — pick something unique.</p>
          </div>
          <Button asChild className="mt-3 sm:mt-0">
            <Link href="/profile">Choose username</Link>
          </Button>
        </div>
      )}

      {handles.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-card px-6 py-16 text-center shadow-sm">
          <p className="font-medium">No links yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Add Instagram, GitHub, or anything else you share.</p>
          <Button asChild className="mt-6">
            <Link href="/choose-socials">Add a social</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {handles.map((handle: USER_SOCIAL) => (
            <UserSocialCard key={handle._id} handle={handle} />
          ))}
        </div>
      )}
    </PageShell>
  );
};

export default HomePageLoggedIn;
