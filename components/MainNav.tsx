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

const MainNav: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-neutral-900 text-white shadow-md">
      <div className="text-lg font-bold drop-shadow-md">
        <Link href={`${process.env.NEXT_PUBLIC_URL}`}>Auctions Hub</Link>
      </div>
      <div className="flex items-center gap-5">
        <Link href={`${process.env.NEXT_PUBLIC_URL}/dashboard`}>Dashboard</Link>
        <SignedIn>
          <UserButton />
          <Cart />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  );
};

export default MainNav;
