import Link from "next/link";
import { cn } from "@/lib/utils";

export function Wordmark({ className, href = "/" }: { className?: string; href?: string | null }) {
  const mark = (
    <span className={cn("font-semibold tracking-tight", className)}>
      socials
    </span>
  );

  if (!href) {
    return mark;
  }

  return (
    <Link href={href} className="inline-flex items-baseline text-foreground">
      {mark}
    </Link>
  );
}
