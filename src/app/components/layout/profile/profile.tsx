import useAuth from "@/app/hooks/useAuth";
import { getUser } from "@/serverApi/Users/users";
import React from "react";
import EditableProfilePage from "./editProfile";
import { Button } from "@/components/ui/button";
import { USER } from "@/app/models/user";
import AuthButton from "../../ui/authButton/authButton";

const Profile = () => {
  const [userData, setUserData] = React.useState<USER | null>();
  const [isEditing, setIsEditing] = React.useState(false);
  const { status, session } = useAuth();

  const fetchUserData = async () => {
    const response = await getUser({ email: session?.user?.email || "" });
    if (response.success) {
      setUserData(response.data || null);
    } else {
      console.error(response);
      setUserData(null);
    }
  };
  React.useEffect(() => {
    fetchUserData();
  }, [session]);
  if (status === "loading") return <div>Loading...</div>;
  if (session?.user) {
    return (
      <>
        {!isEditing && (
          <div className="min-h-screen flex items-center justify-center flex-col bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-md w-full">
              {/* Profile Information */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{userData?.name}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">@{userData?.userName}</p>
              </div>

              {/* Details */}
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-300">Email</span>
                  <span className="text-gray-800 dark:text-white">{userData?.email}</span>
                </div>

                {/* Name */}
                <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-300">Name</span>
                  <span className="text-gray-800 dark:text-white">{userData?.name}</span>
                </div>

                {/* Username */}
                <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-300">Username</span>
                  <span className="text-gray-800 dark:text-white">@{userData?.userName}</span>
                </div>
              </div>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)} className="mt-4">
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        )}
        {isEditing && <EditableProfilePage userData={userData} />}
      </>
    );
  } else {
    return <AuthButton />;
  }
};

export default Profile;
