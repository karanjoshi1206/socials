"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const RedirectButton = ({ username, userId }: { username?: string; userId?: string }) => {
  const href = username ? `/${username}` : userId ? "/profile" : "/";
  const label = username ? "View public page" : "Set a username";

  return (
    <Button asChild variant="outline">
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default RedirectButton;
