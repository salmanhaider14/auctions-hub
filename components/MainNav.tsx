import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const MainNav: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-neutral-900 text-white shadow-md">
      <div className="text-lg font-bold drop-shadow-md">Auctions Hub</div>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  );
};

export default MainNav;
