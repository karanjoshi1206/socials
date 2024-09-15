// hooks/useAuth.js
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { userLogin } from "@/serverApi/Authentication/authentication";

const useAuth = () => {
  const { data: session, status } = useSession();

  const saveUserToDb = async (user: any) => {
    const dbUserData = await userLogin({ userEmail: user.email || "", name: user.name || "" });
    console.log("DB USER DATA IS ", dbUserData);
    localStorage.setItem("dbUserData", JSON.stringify(dbUserData));
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      localStorage.setItem("user", JSON.stringify(session.user));
      saveUserToDb(session.user);
    } else if (status === "unauthenticated") {
      // Clear user information from local storage on sign out
      localStorage.removeItem("user");
      localStorage.removeItem("dbUserData");
    }
  }, [status, session]);

  return { session, status };
};

export default useAuth;
