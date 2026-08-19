"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FacebookShareButton, FacebookIcon, PinterestShareButton, PinterestIcon, RedditShareButton, RedditIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon } from "next-share";
import CopyToClipBoard from "../copyToClipBoard/copyToClipBoard";
import { useEffect, useState } from "react";

const ShareButton = () => {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    try {
      const id = JSON.parse(localStorage.getItem("dbUserData") || "{}")?._id;
      setShareUrl(id ? `${window.location.origin}/${id}` : window.location.href);
    } catch {
      setShareUrl(window.location.href);
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Share this page</DialogTitle>
          <DialogDescription>Copy the link or send it from an app.</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-3">
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <PinterestShareButton media="" url={shareUrl}>
            <PinterestIcon size={32} round />
          </PinterestShareButton>
          <RedditShareButton url={shareUrl}>
            <RedditIcon size={32} round />
          </RedditShareButton>
          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
        <CopyToClipBoard text={shareUrl} label="Copy link" />
      </DialogContent>
    </Dialog>
  );
};

export default ShareButton;
