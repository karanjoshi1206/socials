import { USER_SOCIAL } from "@/app/models/socials";
import { getUserHandlesUsingId } from "@/serverApi/Users/users";
import { revalidatePath } from "next/cache";
import Image from "next/image";

export const revalidate = 10;
export const dynamicParams = true; // or false, to 404 on unknown paths

const User = async ({ params }: { params: { userId: string } }) => {
  revalidatePath(`/user/${params.userId}`);
  const getUserData = await getUserHandlesUsingId({ id: params.userId });
  const userHandles = getUserData.data;

  console;

  if (!userHandles?.handles?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors p-4">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-lg w-full transition-colors">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">You dont have any social handles yet.</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors p-4">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-lg w-full transition-colors">
        {/* User Info */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{userHandles.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">@{userHandles.username}</p>
        </div>

        {/* Social Handles */}
        <div className="space-y-4">
          {userHandles.handles.map((handleObj: USER_SOCIAL) => (
            <a
              key={handleObj._id}
              href={`${handleObj.platform.socialBaseUrl}${handleObj.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}/${handleObj.platform.socialLogo}`} alt={handleObj.platform.title} width={32} height={32} className="rounded-full" />
              <div>
                <p className="text-lg font-medium text-gray-800 dark:text-white">{handleObj.platform.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{handleObj.handle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
