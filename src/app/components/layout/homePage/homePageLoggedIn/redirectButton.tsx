"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const RedirectButton = ({ userId }: { userId?: string }) => {
  const href = userId ? `/${userId}` : "/";

  return (
    <Button asChild variant="outline">
      <Link href={href}>View public page</Link>
    </Button>
  );
};

export default RedirectButton;
