"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const JoinUsButton = () => {
  return (
    <Button size="lg" className="px-6" onClick={() => signIn("google")}>
      Continue with Google
    </Button>
  );
};

export default JoinUsButton;
