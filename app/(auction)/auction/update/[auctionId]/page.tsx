import AuctionUpdateForm from "@/components/Dashboard/AuctionUpdateForm";
import db from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { auctionId: string };
}) {
  const auction = await db.auction.findUnique({
    where: {
      id: params.auctionId,
    },
  });
  const { userId } = auth();
  if (userId !== auction?.userId) {
    redirect(`${process.env.NEXT_PUBLIC_URL}`);
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center my-3">
        Update Auction
      </h1>
      <AuctionUpdateForm auction={auction} />
    </div>
  );
}
