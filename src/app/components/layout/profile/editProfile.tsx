import useToast from "@/app/hooks/useToast";
import { USER } from "@/app/models/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUserInfo } from "@/serverApi/Users/users";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EditableProfilePage = ({ userData }: { userData?: USER | null }) => {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState(userData?.email || "");
  const [name, setName] = useState(userData?.name || "");
  const [username, setUsername] = useState(userData?.userName || "");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await updateUserInfo({ email, name, userName: username });
    if (response.success) {
      showToast("Profile updated successfully", "success");
      router.refresh();
    } else {
      console.error(response);
      showToast(response.data.message || "Failed to update profile", "error");
    }
    // Add your logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-md w-full">
        {/* Profile Information */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Edit Profile</h1>
        </div>

        {/* Editable Form */}
        <div className="space-y-4">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-600 dark:text-gray-300 mb-2 font-semibold">Email</label>

            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <label className="text-gray-600 dark:text-gray-300 mb-2 font-semibold">Name</label>

            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <label className="text-gray-600 dark:text-gray-300 mb-2 font-semibold">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter your username"
            />
          </div>

          {/* Save Button */}
          <div className="text-center">
            <Button onClick={handleSubmit} variant={"default"}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditableProfilePage;
