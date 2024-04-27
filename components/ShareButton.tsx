"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";

const ShareButton = () => {
  const router = useRouter();
  const { toast } = useToast();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Share link copied to clipboard",
    });
  };

  return (
    <div className="px-4  sm:px-6">
      <Button
        className="px-4 py-2 text-white rounded-md shadow-md w-24 flex items-center gap-2"
        onClick={copyToClipboard}
      >
        {" "}
        Share
        <Share className="text-sm" size={"15"} />
      </Button>
    </div>
  );
};

export default ShareButton;
