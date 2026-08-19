"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ExternalLink } from "lucide-react";

export function PublicPageLink({
  className,
  children
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("dbUserData") || "{}");
      setUserId(stored?._id || null);
    } catch {
      setUserId(null);
    }
  }, []);

  if (!userId) {
    return null;
  }

  return (
    <Link href={`/${userId}`} className={className}>
      {children ?? "My page"}
    </Link>
  );
}

export function PublicPageMenuItem() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("dbUserData") || "{}");
      setUserId(stored?._id || null);
    } catch {
      setUserId(null);
    }
  }, []);

  if (!userId) {
    return null;
  }

  return (
    <DropdownMenuItem asChild>
      <Link href={`/${userId}`} className="flex cursor-pointer items-center justify-between">
        My page
        <ExternalLink size={16} />
      </Link>
    </DropdownMenuItem>
  );
}
