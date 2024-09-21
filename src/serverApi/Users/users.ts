// @typescript-eslint/no-explicit-any
import { Social } from "@/app/models/socials";
import { ApiResponse } from "../models/serverApi";

export const getUser = async ({ email }: { email: string }): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users:${email}`, {
      method: "GET"
    });

    const data = await response.json();
    return {
      status: response.status,
      success: response.ok,
      message: response.statusText,
      data
    };
  } catch (error: any) {
    return {
      status: error.status || 500,
      success: false,
      message: error.message || "Failed to fetch user info",
      data: null
    };
  }
};

export const getUserHandles = async ({ email }: { email: string }): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/handles/${email}`, {
      method: "GET"
    });

    const data = await response.json();
    return {
      status: response.status,
      success: response.ok,
      message: response.statusText,
      data
    };
  } catch (error: any) {
    console.error(error);
    return {
      status: error?.status || 500,
      success: false,
      message: error?.message || "Failed to fetch user info",
      data: null
    };
  }
};

export const getUserHandlesUsingId = async ({ id }: { id: string }): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/handles/byId/${id}`, {
      method: "GET"
    });

    const data = await response.json();
    return {
      status: response.status,
      success: response.ok,
      message: response.statusText,
      data
    };
  } catch (error: any) {
    console.error(error);
    return {
      status: error?.status || 500,
      success: false,
      message: error?.message || "Failed to fetch user info",
      data: null
    };
  }
};

export const addUserHandle = async ({ socialData, formData }: { socialData: Social; formData: any }): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/addHandle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        socialPlatformId: socialData._id,
        handle: formData.handle,
        userId: JSON.parse(localStorage.getItem("dbUserData") || "{}")._id
      })
    });
    const data = await response.json();
    console.log("DATA IS ,",data)
    return {
      status: response.status,
      success: response.ok,
      message: response.statusText,
      data
    };
  } catch (error: any) {
    console.log("ERROR ",error)
    return {
      status: error?.status || 500,
      success: false,
      message: error?.message || "Failed to fetch user info",
      data: null
    };
  }
};

export const updateUserHandle = async ({ email, platformId, handle }: { email: string; platformId: string; handle: string }): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/handles`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, platformId, handle })
    });

    const data = await response.json();
    return {
      status: response.status,
      success: response.ok,
      message: response.statusText,
      data
    };
  } catch (error: any) {
    console.error(error);
    return {
      status: error?.status || 500,
      success: false,
      message: error?.message || "Failed to fetch user info",
      data: null
    };
  }
};

export const deleteUserHandle = async ({ email, platformId }: { email: string; platformId: string }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/handles`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, platformId })
    });

    const data = await response.json();
    return {
      status: response.status,
      success: response.ok,
      message: response.statusText,
      data
    };
  } catch (error: any) {
    console.error(error);
    return {
      status: error?.status || 500,
      success: false,
      message: error?.message || "Failed to fetch user info",
      data: null
    };
  }
};
