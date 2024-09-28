"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Error = () => {
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h3>Oops! Something went wrong</h3>
      <p>Try refreshing the page</p>
      <Button  onClick={handleRefresh} className="mt-4">
        Go back to home
      </Button>
    </div>
  );
};

export default Error;
