"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const previewLinks = ["Instagram", "GitHub", "LinkedIn"];

export function LandingPreview() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="mb-4 text-center">
        <p className="font-medium">Your name</p>
        <p className="text-sm text-muted-foreground">@yourname</p>
      </div>
      <div className="space-y-2">
        {previewLinks.map((name) => {
          const isActive = active === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => {
                setActive(name);
                window.setTimeout(() => setActive((current) => (current === name ? null : current)), 420);
              }}
              className={cn(
                "group flex w-full items-center justify-between rounded-xl bg-muted/80 px-4 py-3 text-left text-sm transition-all duration-200",
                "hover:-translate-y-px hover:bg-muted hover:shadow-sm active:translate-y-0",
                isActive && "motion-safe:animate-press-pop ring-1 ring-foreground/15"
              )}
            >
              <span>{name}</span>
              <span className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-1">Open →</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
