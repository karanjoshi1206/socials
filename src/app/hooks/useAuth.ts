// hooks/useAuth.js
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { userLogin } from "@/serverApi/Authentication/authentication";
import { Session } from "next-auth";

const useAuth = () => {
  const { data: sessionData, status } = useSession();
  const [session, setSessionData] = useState<Session>(sessionData as Session);

  const saveUserToDb = async (user: { email?: string; name?: string }) => {
    const dbUserData = await userLogin({ userEmail: user.email || "", name: user.name || "" });
    localStorage.setItem("dbUserData", JSON.stringify(dbUserData));
  };

  useEffect(() => {
    if (status === "authenticated" && sessionData?.user) {
      setSessionData(sessionData);
      localStorage.setItem("user", JSON.stringify(sessionData.user));
      saveUserToDb(sessionData.user as { email: string; name: string });
    } else if (status === "unauthenticated") {
      // Clear user information from local storage on sign out
      localStorage.removeItem("user");
      localStorage.removeItem("dbUserData");
    }
  }, [status, sessionData]);

  return { session, status };
};

export default useAuth;
