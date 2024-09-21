"use client";
import useAuth from "@/app/hooks/useAuth";
import { Button } from "@/components/ui/button";
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
  return <>{mode === "signin" ? <Button onClick={handleLogin}>Join Socials</Button> : <Button onClick={() => signOut()}>Join Socials</Button>}</>;
};

export default AuthButton;
