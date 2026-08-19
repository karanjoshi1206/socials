"use client";

import useToast from "@/app/hooks/useToast";
import { Social } from "@/app/models/socials";
import { addUserHandle } from "@/serverApi/Users/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, PrefixField } from "@/app/components/ui/form/field";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const SocialForm = ({ socialData }: { socialData: Social }) => {
  const router = useRouter();
  const { showToast } = useToast();
  const [handle, setHandle] = useState("");
  const [saving, setSaving] = useState(false);

  const prefix = socialData.socialBaseUrl || "";
  const cleanedHandle = handle.replace(/^@/, "").trim();
  const testLink = useMemo(() => `${prefix}${cleanedHandle}`, [prefix, cleanedHandle]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cleanedHandle) {
      return;
    }
    setSaving(true);
    const response = await addUserHandle({ formData: { handle: cleanedHandle }, socialData });
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
      <Field
        id="handle"
        label={`${socialData.title} handle`}
        hint={cleanedHandle ? `Opens ${testLink}` : "Use the username only — we attach the platform URL."}
      >
        <PrefixField prefix={prefix || `${socialData.title.toLowerCase()}/`}>
          <Input
            id="handle"
            name="handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            className="h-11 border-0 shadow-none focus-visible:ring-0"
            placeholder="username"
            autoComplete="off"
            autoFocus
            required
          />
        </PrefixField>
      </Field>
      {cleanedHandle && (
        <a href={testLink} target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-foreground">
          Preview link
        </a>
      )}
      <div className="flex gap-2">
        <Button type="submit" disabled={saving || !cleanedHandle} className="h-11 flex-1">
          {saving ? "Saving…" : "Add to my page"}
        </Button>
        <Button type="button" variant="outline" className="h-11" onClick={() => router.push("/choose-socials")}>
          Back
        </Button>
      </div>
    </form>
  );
};

export default SocialForm;
