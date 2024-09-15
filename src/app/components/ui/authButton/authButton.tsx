"use client";
import useAuth from "@/app/hooks/useAuth";
import { signIn, signOut } from "next-auth/react";

type AuthButtonProps = {
  mode?: "signin" | "signout";
};
const AuthButton = ({ mode = "signin" }: AuthButtonProps) => {
  const { session } = useAuth();
  console.log("SESSION", session);
  const handleLogin = async () => {
    console.log("LOGIN HAPPENS");
    await signIn("google");
    localStorage.setItem("user", JSON.stringify(session?.user));
  };
  return (
    <>
      {mode === "signin" ? (
        <button className="auth-button" onClick={handleLogin}>
          Sign In
        </button>
      ) : (
        <button className="auth-button" onClick={() => signOut()}>
          Sign Out
        </button>
      )}
    </>
  );
};

export default AuthButton;
