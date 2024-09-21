import { authConfig } from "@/auth";
import { getUserHandles } from "@/serverApi/Users/users";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import UserSocialCard from "@/app/components/ui/userSocialCard/userSocialCard";
import RedirectButton from "./redirectButton";
import { USER_SOCIAL } from "@/app/models/socials";

async function getUserInfo(email: string) {
  try {
    const response = await getUserHandles({ email });

    if (!response) {
      throw new Error("Failed to fetch user info");
    }

    return response;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error; // Re-throw to be handled in the component
  }
}

const HomePageLoggedIn = async () => {
  const session = await getServerSession(authConfig);

  if (!session) {
    // redirect("/api/auth/signin");
    redirect("/");

    return null; // Ensure no further rendering occurs after redirect
  }

  let userInfo: { userId: string; userName: string; name: string; handles: Array<USER_SOCIAL> } | null = null;
  try {
    const userData = await getUserInfo(session.user?.email as string);
    userInfo = {
      userName: userData.data.userName,
      name: userData.data.name,
      handles: userData.data.handles,
      userId: userData.data._id
    };
  } catch (error) {
    console.error("Error fetching user info:", error);
  }

  return (
    <div className="min-h-screen ">
      {userInfo ? (
        <div className="w-full h-full mx-auto p-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center lg:text-left">Welcome, {userInfo.name}!</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {userInfo.handles?.map((handle: USER_SOCIAL) => (
              <UserSocialCard key={handle._id} handle={handle}/>
            ))}
          </div>
          <div className="mt-4">
            <RedirectButton />
          </div>
        </div>
      ) : (
        <div className="text-lg text-gray-700 dark:text-gray-300">
          <p>Loading user information...</p>
        </div>
      )}
    </div>
  );
};

export default HomePageLoggedIn;
