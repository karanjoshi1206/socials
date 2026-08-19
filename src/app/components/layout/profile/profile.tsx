"use client";

import useAuth from "@/app/hooks/useAuth";
import { getUser } from "@/serverApi/Users/users";
import { useEffect, useState } from "react";
import EditableProfilePage from "./editProfile";
import { Button } from "@/components/ui/button";
import { USER } from "@/app/models/user";
import AuthButton from "../../ui/authButton/authButton";
import { PageShell } from "@/app/components/layout/pageShell";

const Profile = () => {
  const [userData, setUserData] = useState<USER | null>();
  const [isEditing, setIsEditing] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);
  const { status, session } = useAuth();
  const email = session?.user?.email || "";

  useEffect(() => {
    if (!email) {
      return;
    }

    let cancelled = false;
    getUser({ email }).then((response) => {
      if (!cancelled) {
        setUserData(response.success ? response.data || null : null);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [email, reloadToken]);

  if (status === "loading") {
    return (
      <PageShell width="narrow">
        <div className="h-40 animate-pulse rounded-2xl bg-muted" />
      </PageShell>
    );
  }

  if (!session?.user) {
    return (
      <PageShell width="narrow" className="text-center">
        <p className="mb-4 text-muted-foreground">Sign in to view your profile.</p>
        <AuthButton />
      </PageShell>
    );
  }

  if (isEditing) {
    return (
      <EditableProfilePage
        userData={userData}
        onCancel={() => setIsEditing(false)}
        onSaved={() => {
          setIsEditing(false);
          setReloadToken((token) => token + 1);
        }}
      />
    );
  }

  const rows = [
    { label: "Email", value: userData?.email },
    { label: "Name", value: userData?.name },
    { label: "Username", value: userData?.userName ? `@${userData.userName}` : "Not set" }
  ];

  return (
    <PageShell width="narrow">
      <h1 className="text-2xl font-semibold tracking-tight">{userData?.name || "Profile"}</h1>
      <p className="mt-1 mb-8 text-sm text-muted-foreground">{userData?.userName ? `@${userData.userName}` : "Add a username so your page is easier to share."}</p>
      <div className="divide-y overflow-hidden rounded-2xl border bg-card shadow-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="text-muted-foreground">{row.label}</span>
            <span>{row.value || "—"}</span>
          </div>
        ))}
      </div>
      <Button className="mt-6 w-full" onClick={() => setIsEditing(true)}>
        Edit profile
      </Button>
    </PageShell>
  );
};

export default Profile;
