import { cn } from "@/lib/utils";

export function PageShell({
  children,
  className,
  width = "default"
}: {
  children: React.ReactNode;
  className?: string;
  width?: "default" | "narrow";
}) {
  return (
    <main className={cn("mx-auto w-full px-4 py-10 sm:py-14", width === "narrow" ? "max-w-md" : "max-w-2xl", className)}>
      {children}
    </main>
  );
}
