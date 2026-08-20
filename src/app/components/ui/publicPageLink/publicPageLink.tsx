"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ExternalLink } from "lucide-react";
import { parseUsername, publicPagePath } from "@/lib/username";

function storedPublicHref(): string | null {
  try {
    const stored = JSON.parse(localStorage.getItem("dbUserData") || "{}");
    const parsed = parseUsername(stored?.userName || stored?.username || "");
    if (parsed.ok) {
      return publicPagePath(stored);
    }
    if (stored?._id) {
      return "/profile";
    }
    return null;
  } catch {
    return null;
  }
}

export function PublicPageLink({
  className,
  children
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    setHref(storedPublicHref());
  }, []);

  if (!href) {
    return null;
  }

  return (
    <Link href={href} className={className}>
      {children ?? "My page"}
    </Link>
  );
}

export function PublicPageMenuItem() {
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    setHref(storedPublicHref());
  }, []);

  if (!href) {
    return null;
  }

  return (
    <DropdownMenuItem asChild>
      <Link href={href} className="flex cursor-pointer items-center justify-between">
        My page
        <ExternalLink size={16} />
      </Link>
    </DropdownMenuItem>
  );
}
