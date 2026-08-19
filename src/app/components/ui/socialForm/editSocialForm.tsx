"use client";

import { USER_SOCIAL } from "@/app/models/socials";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field, PrefixField } from "@/app/components/ui/form/field";

type EditSocialFormProps = {
  handle: USER_SOCIAL;
  handleSave: (newHandle: string) => void;
};

const EditSocialForm = ({ handle, handleSave }: EditSocialFormProps) => {
  const [newHandle, setHandle] = useState(handle.handle);
  const prefix = handle.platform.socialBaseUrl || "";
  const cleaned = newHandle.replace(/^@/, "").trim();

  return (
    <div className="space-y-6">
      <Field id="handle" label={`${handle.platform.title} handle`} hint={cleaned ? `${prefix}${cleaned}` : "Username only, without @."}>
        <PrefixField prefix={prefix || `${handle.platform.title.toLowerCase()}/`}>
          <Input
            id="handle"
            name="handle"
            value={newHandle}
            onChange={(e) => setHandle(e.target.value)}
            className="h-11 border-0 shadow-none focus-visible:ring-0"
            placeholder="username"
            autoComplete="off"
          />
        </PrefixField>
      </Field>
      <DialogFooter>
        <Button onClick={() => handleSave(cleaned)} type="button" disabled={!cleaned} className="h-11 w-full sm:w-auto">
          Save handle
        </Button>
      </DialogFooter>
    </div>
  );
};

export default EditSocialForm;
