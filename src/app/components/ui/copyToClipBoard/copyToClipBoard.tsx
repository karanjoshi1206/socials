"use client";
import useToast from "@/app/hooks/useToast";
import { Button } from "@/components/ui/button";
import React from "react";

const CopyToClipBoard = ({ text = "" }) => {
  console.log("copy text",text);
  const { showToast } = useToast();
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    showToast("Copied to clipboard", "success");
  };
  return <Button onClick={handleCopy}>Copy</Button>;
};

export default CopyToClipBoard;
