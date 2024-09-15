import { signinProps } from "./model";

export const userLogin = async ({ userEmail,name }: signinProps) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email:userEmail, name })
    });

    const data = await response.json();
    console.log("ALL OK WITH SIGNIN", data);
    return data;
  } catch (error) {
    console.log("ERROR WITH SIGNIN", error);
    console.error(error);
    return null;
  }
};
