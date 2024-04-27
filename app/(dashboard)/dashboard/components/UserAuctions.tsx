import db from "@/utils/db";
import { auth } from "@clerk/nextjs/server";

import UserAuctionsList from "@/components/Dashboard/UserAuctionsList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UserAuctions = async () => {
  const { userId } = auth();
  let auctions;
  if (userId) {
    auctions = await db.auction.findMany({
      where: {
        userId: userId,
      },
    });
  }

  return (
    <div>
      <h1 className="font-bold text-center text-lg">Your Auctions</h1>
      <Link
        href={`${process.env.NEXT_PUBLIC_URL}/auction/new`}
        className="my-4"
      >
        <Button>Create New</Button>
      </Link>
      <UserAuctionsList auctions={auctions} />
    </div>
  );
};

export default UserAuctions;
