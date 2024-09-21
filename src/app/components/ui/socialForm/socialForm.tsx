"use client";
import useToast from "@/app/hooks/useToast";
import { Social } from "@/app/models/socials";
import { addUserHandle } from "@/serverApi/Users/users";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SocialForm = ({ socialData }: { socialData: Social }) => {
  const router = useRouter();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    handle: "",
    redirectUrl: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await addUserHandle({ formData, socialData });
    if (response.success) {
      // alert("Handle added successfully");
      showToast("Handle added successfully", "success");
      router.push("/");
      router.refresh();
    } else {
      console.error(response);
      // alert("Failed to add handle");
      showToast(response.data.message || "Failed to add handle", "error");
    }
  };

  // Generate test link URL dynamically
  const testLink = `${socialData.socialBaseUrl}${formData.handle}`;

  // const testRedirectLink = formData.redirectUrl;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-0 lg:p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg rounded-t-none">
      {/* Pre-field title */}
      <div className="mb-6">
        <label htmlFor="preFieldTitle" className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Title
        </label>
        <input
          readOnly
          type="text"
          id="preFieldTitle"
          name="preFieldTitle"
          value={socialData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Enter pre-field title"
        />
      </div>

      {/* Handle input (with test link) */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Your {socialData.title} Handle</label>
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
          {socialData.socialBaseUrl && (
            <>
              <input type="text" value={socialData.socialBaseUrl.substring(0, socialData.socialBaseUrl.length - 1)} className="w-full px-3 py-2 pr-1 border-none bg-transparent text-black dark:text-white" readOnly />
              <span className="px-3 h-full text-gray-700 dark:text-gray-300">/</span>
            </>
          )}
          <input
            type="text"
            name="handle"
            value={formData.handle}
            onChange={handleChange}
            className="w-full px-3 py-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black rounded-l-none"
            placeholder="Enter handle"
          />
        </div>
        {/* Test Link */}
        {formData.handle && (
          <div className="mt-2">
            <a href={testLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
              Your Link: {testLink}
            </a>
          </div>
        )}
      </div>
      {/* <div className="flex items-center my-4">
        <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
        <p className="mx-4 text-gray-700 dark:text-gray-300 font-semibold">Or use your own URL</p>
        <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
      </div> */}

      {/* Redirect URL field */}
      {/* <div className="mb-6">
        <label htmlFor="redirectUrl" className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Redirect URL
        </label>
        <input
          type="url"
          id="redirectUrl"
          name="redirectUrl"
          value={formData.redirectUrl}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Enter redirect URL"
        />
        {formData.redirectUrl && (
          <div className="mt-2">
            <a href={testRedirectLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
              Your Link: {testRedirectLink}
            </a>
          </div>
        )}
      </div> */}

      {/* Submit Button */}
      <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
        Submit
      </button>
    </form>
  );
};

export default SocialForm;
