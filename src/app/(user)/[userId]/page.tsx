import { USER_SOCIAL } from "@/app/models/socials";
import { getUserHandlesUsingId } from "@/serverApi/Users/users";
import Image from "next/image";

const User = async ({ params }: { params: { userId: string } }) => {
  console.log(params);
  const getUserData = await getUserHandlesUsingId({ id: params.userId });
  const userHandles = getUserData.data;

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
