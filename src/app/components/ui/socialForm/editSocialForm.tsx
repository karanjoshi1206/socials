"use client";
import { USER_SOCIAL } from "@/app/models/socials";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EditSocialFormProps = {
  handle: USER_SOCIAL;
  handleSave: (newHandle: string) => void;
};

const EditSocialForm = ({ handle, handleSave }: EditSocialFormProps) => {
  const [newHandle, setHandle] = useState(handle.handle);

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="handle" className="text-right">
            Handle
          </Label>
          <Input id="handle" name="handle" value={newHandle} onChange={(e) => setHandle(e.target.value)} className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => handleSave(newHandle)} type="submit">
          Save changes
        </Button>
      </DialogFooter>
    </>
  );
};

export default EditSocialForm;
