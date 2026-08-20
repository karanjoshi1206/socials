"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FacebookShareButton, FacebookIcon, PinterestShareButton, PinterestIcon, RedditShareButton, RedditIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon } from "next-share";
import CopyToClipBoard from "../copyToClipBoard/copyToClipBoard";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { publicPagePath } from "@/lib/username";

const ShareButton = ({ path, className }: { path?: string; className?: string }) => {
  const [shareUrl, setShareUrl] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");

  useEffect(() => {
    const origin = window.location.origin;
    let nextPath = path;

    if (!nextPath) {
      try {
        nextPath = publicPagePath(JSON.parse(localStorage.getItem("dbUserData") || "{}"));
      } catch {
        nextPath = window.location.pathname;
      }
    }

    const url = nextPath.startsWith("http") ? nextPath : `${origin}${nextPath.startsWith("/") ? nextPath : `/${nextPath}`}`;
    setShareUrl(url);

    QRCode.toDataURL(url, { margin: 1, width: 240, color: { dark: "#1c1917", light: "#ffffff" } })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(""));
  }, [path]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Share this page</DialogTitle>
          <DialogDescription>Scan the QR code or copy the link.</DialogDescription>
        </DialogHeader>
        {qrDataUrl ? (
          // Data URLs from `qrcode` are not remote assets; next/image is the wrong tool here.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={qrDataUrl} alt="QR code for this public page" className="mx-auto h-48 w-48 rounded-xl border bg-white p-2" />
        ) : (
          <div className="mx-auto h-48 w-48 animate-pulse rounded-xl bg-muted" />
        )}
        <p className="truncate text-center text-sm text-muted-foreground">{shareUrl}</p>
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
