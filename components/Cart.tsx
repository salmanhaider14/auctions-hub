import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import db from "@/utils/db";
import Image from "next/image";
import { differenceInMilliseconds } from "date-fns";

const Cart = async () => {
  const { userId } = auth();
  let watchListItems: any = [];
  if (userId) {
    watchListItems = await db.watchlistItem.findMany({
      where: {
        userId: userId,
      },
      include: {
        auction: true,
      },
    });
  }
  const remainingTime = (endDate: string) => {
    const initialTimeRemaining = Math.max(
      0,
      differenceInMilliseconds(endDate, new Date())
    );
    return initialTimeRemaining;
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <ShoppingCart />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Watchlist</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-3 justify-center">
            {watchListItems.map((item: any, index: number) => (
              <div
                className="flex justify-between items-center gap-2"
                key={index}
              >
                <p className="text-gray-600">{item?.auction.title}</p>
                <p className="font-semibold">
                  {remainingTime(item?.auction.endDate) > 0
                    ? item?.auction.endDate.toDateString()
                    : "Closed"}
                </p>
                <Image
                  width={70}
                  height={70}
                  src={item?.auction?.images[0]}
                  alt="Cart Item Image"
                  className="rounded-md"
                />
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Cart;
