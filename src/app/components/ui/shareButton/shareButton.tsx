"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { FacebookShareButton, FacebookIcon, PinterestShareButton, PinterestIcon, RedditShareButton, RedditIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon } from "next-share";
import CopyToClipBoard from "../copyToClipBoard/copyToClipBoard";
const ShareButton = () => {
  const shareUrl = 'https://socials-blond-ten.vercel.app/' + JSON.parse(localStorage.getItem('dbUserData')||'{}')?._id;
  console.log(shareUrl);
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Share Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Your Profile</DialogTitle>
            <DialogDescription>Connect with your friends and family by sharing your profile</DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 flex-wrap items-center justify-center">
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

          <CopyToClipBoard text={shareUrl} />
        </DialogContent>
      </Dialog>{" "}
    </div>
  );
};

export default ShareButton;
