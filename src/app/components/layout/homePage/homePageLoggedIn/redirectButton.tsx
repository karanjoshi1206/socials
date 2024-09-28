"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import React from "react";

const RedirectButton = () => {
  const navigate = useRouter();
  
  const navigateUser = () => {
    const userInfo = JSON.parse(localStorage.getItem("dbUserData") || "{}");
    navigate.push(`${userInfo?._id}`);
  }

  return <Button onClick={navigateUser}>Visit your public page</Button>;
};

export default RedirectButton;
