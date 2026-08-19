"use client";

import useToast from "@/app/hooks/useToast";
import { USER } from "@/app/models/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, PrefixField } from "@/app/components/ui/form/field";
import { updateUserInfo } from "@/serverApi/Users/users";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const response = await updateUserInfo({
      email: userData?.email || "",
      name: name.trim(),
      userName: username.replace(/^@/, "").trim()
    });
    setSaving(false);
    if (response.success) {
      showToast("Saved", "success");
      router.refresh();
      onSaved();
    } else {
      showToast(response.data?.message || "Could not update profile", "error");
    }
  };

  return (
    <PageShell width="narrow">
      <h1 className="text-2xl font-semibold tracking-tight">Edit profile</h1>
      <p className="mt-1 mb-8 text-sm text-muted-foreground">This name and username show on your public page.</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field id="email" label="Email" hint="Signed in with Google — this cannot change here.">
          <Input id="email" type="email" value={userData?.email || ""} disabled />
        </Field>
        <Field id="name" label="Display name" hint="Shown at the top of your public page.">
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" autoComplete="name" />
        </Field>
        <Field id="username" label="Username" hint="Short handle for your page, without spaces.">
          <PrefixField prefix="@" alwaysShowPrefix>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-11 border-0 shadow-none focus-visible:ring-0"
              placeholder="janedoe"
              autoComplete="username"
            />
          </PrefixField>
        </Field>
        <div className="flex gap-2 pt-2">
          <Button type="submit" className="h-11 flex-1" disabled={saving || !name.trim()}>
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
