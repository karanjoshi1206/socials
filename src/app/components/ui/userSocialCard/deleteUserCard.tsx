"use client";
import useToast from "@/app/hooks/useToast";
import { USER_SOCIAL } from "@/app/models/socials";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { deleteUserHandle } from "@/serverApi/Users/users";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteUserCard = ({ handle }: { handle: USER_SOCIAL }) => {
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = React.useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    const response = await deleteUserHandle({ email: JSON.parse(localStorage.getItem("dbUserData") || "{}")?.email || "", platformId: handle._id });
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
      <Dialog open={isEditing}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsEditing(true)} variant="destructive">
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete {handle.platform.title}</DialogTitle>
            <DialogDescription>Are you sure you want to delete this handle?</DialogDescription>
          </DialogHeader>
          <p>This will update your public page too.</p>
          <DialogFooter>
            <Button onClick={handleDelete} variant={"destructive"}>
              Delete
            </Button>
            <Button onClick={() => setIsEditing(false)} variant={"outline"} type="submit">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteUserCard;
