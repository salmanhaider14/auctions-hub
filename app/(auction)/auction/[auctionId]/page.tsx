import BidComponent from "@/components/Bid";
import Countdown from "@/components/countdown";
import db from "@/utils/db";
import { differenceInMilliseconds } from "date-fns";
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
  if (auction == null) {
    redirect("/");
  }
  const bids = auction?.bids;
  const highestBid = auction?.bids[0];

  const now = new Date();
  const endDate = new Date(auction.endDate);
  const initialTimeRemaining = Math.max(
    0,
    differenceInMilliseconds(endDate, now)
  );
  const auctionEnded = auction.isEnded;

  const emailSent = auction.isEmailSent;

  if (initialTimeRemaining <= 0 && !emailSent) {
    const winnerData = {
      auctionId: params.auctionId,
      winnerEmail: highestBid.user.email,
      winnerName: highestBid.user.name,
      highestBid: highestBid.amount,
      auctionName: auction.title,
    };
    try {
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

      await db.auction.update({
        where: { id: params.auctionId },
        data: { isEnded: true },
      });
    } catch (error) {
      console.error("Error notifying winner:", error);
    }
  }

  return (
    <>
      {auction && (
        <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <h1 className="text-3xl font-bold text-gray-800">
                {auction.title}
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                {auction.description}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Current Price: ${auction.startingPrice}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Highest Bid: $
                {highestBid ? highestBid.amount : auction.startingPrice}
              </p>

              {initialTimeRemaining > 0 ? (
                <Countdown
                  endDate={auction.endDate}
                  initialTime={initialTimeRemaining}
                />
              ) : (
                <p className="mt-2 text-sm text-red-600">Auction is over</p>
              )}

              {initialTimeRemaining > 0 && (
                <BidComponent
                  auctionId={auction.id}
                  startingPrice={auction.startingPrice}
                />
              )}
            </div>

            <div className="px-4 py-5 sm:px-6">
              <ul>
                {bids?.map((bid, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    Bid: ${bid.amount}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
