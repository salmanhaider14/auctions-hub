import db from "@/utils/db";
import { auth } from "@clerk/nextjs/server";

import UserAuctionsList from "@/components/Dashboard/UserAuctionsList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserOwnedAuctionsList from "@/components/Dashboard/UserOwnedAuctionsList";

const UserOwnedAuctions = async () => {
  const { userId } = auth();
  let auctions;
  if (userId) {
    auctions = await db.userOwnedAuction.findMany({
      where: {
        userId: userId,
      },
      include: {
        auction: true,
      },
    });
  }

  return (
    <div>
      <h1 className="font-bold text-center text-lg">Your Auctions</h1>
      <Link href={`${process.env.NEXT_PUBLIC_URL}`} className="my-4">
        <Button>Explore More</Button>
      </Link>
      <UserOwnedAuctionsList auctions={auctions} />
    </div>
  );
};

export default UserOwnedAuctions;
