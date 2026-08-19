import { authConfig } from "@/auth";
import { dbConnect } from "@/lib/db/mongoose";
import { getUserHandlesByEmail } from "@/lib/services/users";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import UserSocialCard from "@/app/components/ui/userSocialCard/userSocialCard";
import RedirectButton from "./redirectButton";
import { USER_SOCIAL } from "@/app/models/socials";
import { PageShell } from "@/app/components/layout/pageShell";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
          <p className="mt-1 text-sm text-muted-foreground">Your socials, ready to share.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/choose-socials">Add</Link>
          </Button>
          {userInfo?.userId && <RedirectButton userId={userInfo.userId} />}
        </div>
      </div>

      {handles.length === 0 ? (
        <div className="rounded-2xl border border-dashed px-6 py-16 text-center">
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
