"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Error = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">Refresh, or go back home.</p>
      <div className="mt-6 flex gap-2">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh
        </Button>
        <Button onClick={() => router.push("/")}>Home</Button>
      </div>
    </div>
  );
};

export default Error;
