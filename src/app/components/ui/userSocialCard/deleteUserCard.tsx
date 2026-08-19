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
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const response = await deleteUserHandle({
      email: JSON.parse(localStorage.getItem("dbUserData") || "{}")?.email || "",
      platformId: handle._id
    });
    if (response.success) {
      showToast("Removed", "success");
    } else {
      showToast(response.message || "Could not delete", "error");
    }
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Remove {handle.platform.title}?</DialogTitle>
          <DialogDescription>This also removes it from your public page.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserCard;
