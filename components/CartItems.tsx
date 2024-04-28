"use client";
import { deleteFromCart } from "@/actions/actions";
import { CircleX } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import Link from "next/link";

const CartItems = ({
  watchListItems,
  userId,
}: {
  watchListItems: any;
  userId: string | null;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const handleDelete = async (id: string, auctionId: string) => {
    try {
      if (userId) {
        await deleteFromCart(id, auctionId, userId);
        toast({
          title: "Item deleted from the watchlist",
        });
        router.refresh();
      } else router.push(`${process.env.NEXT_PUBLIC_URL}/sign-in`);
    } catch (error) {
      toast({
        title: "Ops something went wrong",
        variant: "destructive",
      });
      console.error("Error while deleting from watchlist:", error);
    }
  };
  return (
    <div className="flex flex-col gap-3 justify-center w-full my-3">
      {watchListItems.map((item: any, index: number) => (
        <div
          className="grid grid-cols-4 w-full  items-center gap-4 outline outline-1 p-3 outline-gray-600 rounded-md shadow-md"
          key={index}
        >
          <Link
            href={`${process.env.NEXT_PUBLIC_URL}/auction/${item?.auction.id}`}
          >
            <p className="text-gray-600 dark:text-white">
              {item?.auction.title}
            </p>
          </Link>

          <div className="flex justify-center col-span-2">
            <Image
              width={70}
              height={70}
              src={item?.auction?.images[0]}
              alt="Cart Item Image"
              className="rounded-md "
            />
          </div>
          <div className="flex justify-end">
            {" "}
            <CircleX
              color="red"
              className="cursor-pointer "
              onClick={() => handleDelete(item?.id, item?.auction.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
