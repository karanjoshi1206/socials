"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { ArrowRight } from "lucide-react";

const JoinUsButton = () => {
  return (
    <Button
      size="lg"
      className="group px-6 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
      onClick={() => signIn("google")}
    >
      Continue with Google
      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Button>
  );
};

export default JoinUsButton;
