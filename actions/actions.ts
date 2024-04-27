"use server";

import db from "@/utils/db";
import { put } from "@vercel/blob";

interface AuctionForm {
  title: string;
  description: string;
  startingPrice: number;
  reservePrice: number;
  endDate: string;
  userId: string;
  images: string[];
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
      images: auction.images,
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
export const deleteAuction = async (auctionId: string) => {
  await db.auction.delete({
    where: {
      id: auctionId,
    },
  });
};
export const deleteBid = async (bidId: string) => {
  await db.bid.delete({
    where: {
      id: bidId,
    },
  });
};
export const updateAuction = async (
  auctionId: string,
  auction: AuctionForm
) => {
  await db.auction.update({
    where: {
      id: auctionId,
    },
    data: {
      title: auction.title,
      description: auction.description,
      startingPrice: auction.startingPrice,
      reservePrice: auction.reservePrice,
      endDate: new Date(auction.endDate),
      userId: auction.userId,
      images: auction.images,
    },
  });
};
