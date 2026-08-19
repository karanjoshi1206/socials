"use client";

import { USER_SOCIAL } from "@/app/models/socials";
import { useState } from "react";
import EditSocialForm from "../socialForm/editSocialForm";
import { updateUserHandle } from "@/serverApi/Users/users";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useToast from "@/app/hooks/useToast";

const EditUserCard = ({ handle }: { handle: USER_SOCIAL }) => {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const handleSave = async (newHandle: string) => {
    const response = await updateUserHandle({
      email: JSON.parse(localStorage.getItem("dbUserData") || "{}")?.email || "",
      platformId: handle._id,
      handle: newHandle
    });

    if (response.success) {
      showToast("Updated", "success");
    } else {
      showToast(response.message || "Could not update", "error");
    }
    setIsEditing(false);
    router.refresh();
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setIsEditing(false);
      }}
      modal
      open={isEditing}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit {handle.platform.title}</DialogTitle>
          <DialogDescription>Change the handle, then save.</DialogDescription>
        </DialogHeader>
        <EditSocialForm handle={handle} handleSave={handleSave} />
      </DialogContent>
    </Dialog>
  );
};

export default EditUserCard;
