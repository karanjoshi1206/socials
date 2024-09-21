import React from "react";
import JoinUsButton from "./joinUsButton";

const HomePageLoggedOut = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center max-w-xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Welcome to <span className="text-blue-500">Socials</span>
        </h1>

        <p className="text-gray-600 dark:text-gray-300">
          Easily share and manage all your social media profiles in one place.
        </p>

        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Connect</span>, <span className="font-semibold">share</span>, and make it easier for others to find your social presence across platforms.
        </p>

        <p className="text-gray-600 dark:text-gray-300">
          Ready to get started? Sign up today and start sharing your socials with the world!
        </p>

        <div>
          <JoinUsButton />
        </div>
      </div>
    </div>
  );
};

export default HomePageLoggedOut;
