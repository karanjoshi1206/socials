"use client";

import useToast from "@/app/hooks/useToast";
import { USER } from "@/app/models/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, PrefixField } from "@/app/components/ui/form/field";
import { updateUserInfo } from "@/serverApi/Users/users";
import { parseUsername } from "@/lib/username";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PageShell } from "@/app/components/layout/pageShell";

const EditableProfilePage = ({
  userData,
  onCancel,
  onSaved
}: {
  userData?: USER | null;
  onCancel: () => void;
  onSaved: () => void;
}) => {
  const router = useRouter();
  const { showToast } = useToast();
  const [name, setName] = useState(userData?.name || "");
  const [username, setUsername] = useState(userData?.userName || "");
  const [saving, setSaving] = useState(false);
  const parsed = useMemo(() => parseUsername(username), [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parsed.ok) {
      showToast(parsed.error, "error");
      return;
    }
    setSaving(true);
    const response = await updateUserInfo({
      email: userData?.email || "",
      name: name.trim(),
      userName: parsed.username
    });
    setSaving(false);
    if (response.success) {
      try {
        const stored = JSON.parse(localStorage.getItem("dbUserData") || "{}");
        localStorage.setItem("dbUserData", JSON.stringify({ ...stored, userName: parsed.username, username: parsed.username }));
      } catch {
        // ignore storage errors
      }
      showToast("Saved", "success");
      router.refresh();
      onSaved();
    } else {
      showToast(response.data?.message || "Could not update profile", "error");
    }
  };

  const usernameHint = parsed.ok
    ? `Your public page will be /${parsed.username}`
    : "Letters, numbers, hyphens, and underscores. 3–20 characters.";

  return (
    <PageShell width="narrow">
      <h1 className="text-2xl font-semibold tracking-tight">Edit profile</h1>
      <p className="mt-1 mb-8 text-sm text-muted-foreground">Pick a unique username. People will open /yourname.</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field id="email" label="Email" hint="Signed in with Google — this cannot change here.">
          <Input id="email" type="email" value={userData?.email || ""} disabled />
        </Field>
        <Field id="name" label="Display name" hint="Shown at the top of your public page.">
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" autoComplete="name" />
        </Field>
        <Field id="username" label="Username" hint={usernameHint} error={!parsed.ok && username.trim() ? parsed.error : undefined}>
          <PrefixField prefix="@" alwaysShowPrefix>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-11 border-0 shadow-none focus-visible:ring-0"
              placeholder="janedoe"
              autoComplete="username"
              required
            />
          </PrefixField>
        </Field>
        <div className="flex gap-2 pt-2">
          <Button type="submit" className="h-11 flex-1" disabled={saving || !name.trim() || !parsed.ok}>
            {saving ? "Saving…" : "Save"}
          </Button>
          <Button type="button" variant="outline" className="h-11" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </PageShell>
  );
};

export default EditableProfilePage;
