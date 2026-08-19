"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

type AuthButtonProps = {
  mode?: "signin" | "signout";
};

const AuthButton = ({ mode = "signin" }: AuthButtonProps) => {
  if (mode === "signout") {
    return (
      <Button variant="ghost" size="sm" onClick={() => signOut()}>
        Sign out
      </Button>
    );
  }

  return (
    <Button size="sm" onClick={() => signIn("google")}>
      Sign in
    </Button>
  );
};

export default AuthButton;
