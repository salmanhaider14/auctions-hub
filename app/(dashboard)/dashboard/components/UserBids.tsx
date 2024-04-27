import db from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import UserBidsList from "@/components/Dashboard/UserBidsList";

const UserBids = async () => {
  const { userId } = auth();
  let bids;
  if (userId) {
    bids = await db.bid.findMany({
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
      <h1 className="font-bold text-center text-lg">Your Bids</h1>
      <UserBidsList bids={bids} />
    </div>
  );
};

export default UserBids;
