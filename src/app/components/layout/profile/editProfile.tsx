"use client";

import useToast from "@/app/hooks/useToast";
import { USER } from "@/app/models/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await updateUserInfo({
      email: userData?.email || "",
      name,
      userName: username
    });
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
      <p className="mt-1 mb-8 text-sm text-muted-foreground">Email stays the same.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={userData?.email || ""} disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="yourname" />
        </div>
        <div className="flex gap-2 pt-2">
          <Button type="submit" className="flex-1">
            Save
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </PageShell>
  );
};

export default EditableProfilePage;
