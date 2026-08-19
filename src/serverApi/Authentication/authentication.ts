import { getApiBaseUrl } from "@/lib/api/baseUrl";
import { signinProps } from "./model";

export const userLogin = async ({ userEmail, name }: signinProps) => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: userEmail, name })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
