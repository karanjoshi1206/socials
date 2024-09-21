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
    const response = await updateUserHandle({ email: JSON.parse(localStorage.getItem("dbUserData") || "{}")?.email || "", platformId: handle._id, handle: newHandle });

    if (response.success) {
      showToast("Handle updated successfully", "success");
    } else {
      showToast(response.message || "Failed to update handle", "error");
    }
    setIsEditing(false);
    router.refresh();
  };
  return (
    <>
      <Dialog
        onOpenChange={(e) => {
          if (e === false) {
            setIsEditing(false);
          }
        }}
        modal
        open={isEditing}
      >
        <DialogTrigger asChild>
          <Button onClick={() => setIsEditing(true)} variant="outline">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit {handle.platform.title}</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>
          <EditSocialForm handle={handle} handleSave={handleSave}/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditUserCard;
