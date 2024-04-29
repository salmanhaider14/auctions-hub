import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import Cart from "./Cart";
import ModeToggle from "./ModeToggle";
import Image from "next/image";
import MobileNav from "./MobileNav";

const MainNav: React.FC = () => {
  return (
    <div>
      <nav className="flex justify-between items-center py-4 px-8 bg-neutral-900 text-white dark:bg-gray-900 shadow-md">
        <div className="text-lg font-bold drop-shadow-md">
          <Link
            href={`${process.env.NEXT_PUBLIC_URL}`}
            className="flex items-center gap-2"
          >
            <Image
              width={60}
              height={60}
              src={"/logo.png"}
              alt="Auctions Hub"
            />
            <p className="hidden md:block">Auctions Hub</p>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-5">
          <ModeToggle />
          <Link href={`${process.env.NEXT_PUBLIC_URL}/dashboard`}>
            Dashboard
          </Link>
          <SignedIn>
            <UserButton />
            <Cart />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
        <MobileNav />
      </nav>
    </div>
  );
};

export default MainNav;
