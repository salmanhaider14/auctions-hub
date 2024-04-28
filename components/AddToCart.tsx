"use client";
import React from "react";
import { Button } from "./ui/button";
import { redirect, useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { addToCart } from "@/actions/actions";
import { LucideShoppingCart } from "lucide-react";

const AddToCart = ({
  auctionEnded,
  auctionId,
  userId,
}: {
  auctionEnded: boolean;
  auctionId: string;
  userId: string | null;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const handleAddToCart = async (auctionId: string) => {
    if (!userId) {
      router.push(`${process.env.NEXT_PUBLIC_URL}/sign-in`);
    } else {
      try {
        await addToCart(auctionId, userId);
        toast({
          title: "Item added to the watchlist",
        });
        router.refresh();
      } catch (error) {
        toast({
          title: "Ops something went wrong",
          variant: "destructive",
        });
        console.error("Error while addint to watchlist:", error);
      }
    }
  };
  return (
    <div>
      {!auctionEnded && (
        <Button
          variant={"default"}
          className="my-2 flex items-center gap-2"
          onClick={(e) => {
            e.stopPropagation(); // Prevent Link navigation
            handleAddToCart(auctionId); // Add to Cart function
          }}
        >
          Add to Cart <LucideShoppingCart />
        </Button>
      )}
    </div>
  );
};

export default AddToCart;
