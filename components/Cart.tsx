import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { CircleX, LucideDelete, ShoppingCart } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import db from "@/utils/db";

import { differenceInMilliseconds } from "date-fns";

import CartItems from "./CartItems";

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
            <SheetDescription>{watchListItems.length} Items</SheetDescription>
          </SheetHeader>
          <div className="w-full">
            <CartItems watchListItems={watchListItems} userId={userId} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Cart;
