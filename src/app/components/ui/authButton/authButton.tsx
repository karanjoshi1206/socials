"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

type AuthButtonProps = {
  mode?: "signin" | "signout";
};
const AuthButton = ({ mode = "signin" }: AuthButtonProps) => {
  const session = useSession();
  console.log("SESSION", session);
  const handleLogin = async () => {
    console.log("LOGIN HAPPENS");
    await signIn("google");
    localStorage.setItem("user", JSON.stringify(session.data?.user));
  };
  return <>{mode === "signin" ? <Button onClick={handleLogin}>Join Socials</Button> : <Button onClick={() => signOut()}>Signout</Button>}</>;
};

export default AuthButton;
