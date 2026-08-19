import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export function Field({
  id,
  label,
  hint,
  error,
  children
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-[13px] font-medium text-foreground">
        {label}
      </Label>
      {children}
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : hint ? (
        <p className="text-sm text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function PrefixField({
  prefix,
  className,
  alwaysShowPrefix = false,
  children
}: {
  prefix: string;
  className?: string;
  alwaysShowPrefix?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex h-11 items-stretch overflow-hidden rounded-lg border border-input bg-card focus-within:border-foreground focus-within:ring-2 focus-within:ring-ring/15",
        className
      )}
    >
      <span
        className={cn(
          "items-center truncate border-r bg-muted/80 px-3 text-sm text-muted-foreground",
          alwaysShowPrefix ? "flex" : "hidden max-w-[48%] sm:flex"
        )}
      >
        {prefix}
      </span>
      {children}
    </div>
  );
}
