import { cn } from "@/lib/utils";

export function PageShell({
  children,
  className,
  width = "default"
}: {
  children: React.ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
}) {
  const maxWidth = width === "narrow" ? "max-w-md" : width === "wide" ? "max-w-3xl" : "max-w-2xl";

  return (
    <main className={cn("mx-auto w-full px-4 py-10 sm:py-14", maxWidth, className)}>
      {children}
    </main>
  );
}
