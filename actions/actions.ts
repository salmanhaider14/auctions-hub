"use server";

import db from "@/utils/db";

interface AuctionForm {
  title: string;
  description: string;
  startingPrice: number;
  reservePrice: number;
  endDate: string;
  userId: string;
}

export const createAuction = async (auction: AuctionForm) => {
  console.log(auction);
  await db.auction.create({
    data: {
      title: auction.title,
      description: auction.description,
      startingPrice: auction.startingPrice,
      reservePrice: auction.reservePrice,
      endDate: new Date(auction.endDate),
      userId: auction.userId,
    },
  });
};
export const createBid = async (
  amount: number,
  auctionId: string,
  userId: string
) => {
  await db.bid.create({
    data: {
      amount,
      auctionId,
      userId,
    },
  });
};
