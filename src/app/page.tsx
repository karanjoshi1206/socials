import { authConfig } from "@/auth";
import { getUserHandles } from "@/serverApi/Users/users";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

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

export default async function Home() {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/api/auth/signin");
    return null; // Ensure no further rendering occurs after redirect
  }

  let userInfo: { name: string } | null = null;
  try {
    userInfo = await getUserInfo(session.user?.email as string);
  } catch (error) {
    console.error("Error fetching user info:", error);
  }

  console.log("User info:", userInfo);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Welcome to the Home Page</h1>
      {userInfo ? (
        <div className="text-lg text-gray-700 dark:text-gray-300">
          <p>Hello, {userInfo.name}!</p>
          {/* Display other user info as needed */}
        </div>
      ) : (
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading user information...</p>
      )}
    </div>
  );
}
