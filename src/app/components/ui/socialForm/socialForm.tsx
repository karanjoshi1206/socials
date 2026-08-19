"use client";

import useToast from "@/app/hooks/useToast";
import { Social } from "@/app/models/socials";
import { addUserHandle } from "@/serverApi/Users/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SocialForm = ({ socialData }: { socialData: Social }) => {
  const router = useRouter();
  const { showToast } = useToast();
  const [handle, setHandle] = useState("");
  const [saving, setSaving] = useState(false);
  const testLink = `${socialData.socialBaseUrl}${handle}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const response = await addUserHandle({ formData: { handle }, socialData });
    setSaving(false);
    if (response.success) {
      showToast("Added", "success");
      router.push("/");
      router.refresh();
    } else {
      showToast(response.data?.message || "Could not add handle", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="handle">Your {socialData.title} handle</Label>
        <div className="flex overflow-hidden rounded-md border focus-within:ring-1 focus-within:ring-ring">
          {socialData.socialBaseUrl && (
            <span className="hidden max-w-[55%] truncate bg-muted px-3 py-2 text-sm text-muted-foreground sm:inline">
              {socialData.socialBaseUrl}
            </span>
          )}
          <Input
            id="handle"
            name="handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="border-0 shadow-none focus-visible:ring-0"
            placeholder="username"
            required
          />
        </div>
        {handle && (
          <a href={testLink} target="_blank" rel="noopener noreferrer" className="block truncate text-sm text-muted-foreground hover:text-foreground">
            {testLink}
          </a>
        )}
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={saving || !handle.trim()} className="flex-1">
          {saving ? "Saving…" : "Add to my page"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/choose-socials")}>
          Back
        </Button>
      </div>
    </form>
  );
};

export default SocialForm;
