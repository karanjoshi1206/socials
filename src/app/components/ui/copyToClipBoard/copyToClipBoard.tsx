"use client";

import useToast from "@/app/hooks/useToast";
import { Button } from "@/components/ui/button";

const CopyToClipBoard = ({ text = "", label = "Copy" }: { text?: string; label?: string }) => {
  const { showToast } = useToast();
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    showToast("Copied", "success");
  };
  return (
    <Button variant="outline" size="sm" onClick={handleCopy}>
      {label}
    </Button>
  );
};

export default CopyToClipBoard;
