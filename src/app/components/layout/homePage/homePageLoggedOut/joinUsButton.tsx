'use client'
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const JoinUsButton = () => {
  return <Button onClick={() => signIn()}>Join Socials</Button>;
};

export default JoinUsButton;
