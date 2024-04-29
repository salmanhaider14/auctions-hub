import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { CircleX, LucideDelete, Menu, ShoppingCart } from "lucide-react";
import { auth } from "@clerk/nextjs/server";

import CartItems from "./CartItems";
import ModeToggle from "./ModeToggle";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Cart from "./Cart";

const MobileNav = async () => {
  const { userId } = auth();

  return (
    <div className=" block md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col justify-center gap-10 my-7">
            <Link href={`${process.env.NEXT_PUBLIC_URL}/dashboard`}>
              Dashboard
            </Link>
            <Link href={`${process.env.NEXT_PUBLIC_URL}/privacy-policy`}>
              Privacy Policy
            </Link>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <ModeToggle />
            <SignedIn>
              <UserButton />
              <Cart />
            </SignedIn>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
