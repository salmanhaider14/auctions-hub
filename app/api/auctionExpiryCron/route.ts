import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const expiredAuctions = await db.auction.findMany({
      where: {
        endDate: { lte: new Date() },
        OR: [{ isEnded: false }, { isEnded: true, isEmailSent: false }],
      },
      include: {
        bids: {
          orderBy: {
            amount: "desc",
          },
          include: {
            user: true,
          },
        },
      },
    });

    for (const auction of expiredAuctions) {
      if (!auction.isEnded) {
        await db.auction.update({
          where: { id: auction.id },
          data: { isEnded: true },
        });
      }

      if (auction.bids.length > 0 && !auction.isEmailSent) {
        const highestBid = auction.bids[0];
        const winnerData = {
          auctionId: auction.id,
          winnerEmail: highestBid.user.email,
          winnerName: highestBid.user.name,
          highestBid: highestBid.amount,
          auctionName: auction.title,
          userId: highestBid.userId,
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/notifyWinner`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(winnerData),
          }
        );
        const data = await response.json();
        console.log(data.message);
      }
      console.log(`Auction ${auction.id} is processed`);
    }
    return NextResponse.json({ message: "Auction Expiry Cron Job Completed" });
  } catch (error) {
    console.error("Error processing expired auctions:", error);
    return NextResponse.json(
      { message: "Error processing expired auctions:", error },
      { status: 500 }
    );
  }
}
