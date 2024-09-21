"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import React from "react";

const RedirectButton = () => {
  const navigate = useRouter();
  const userInfo = JSON.parse(localStorage.getItem("dbUserData") || "{}");
  console.log({ userInfo });
  return <Button onClick={() => navigate.push(`${userInfo?._id}`)}>Visit your public page</Button>;
};

export default RedirectButton;
