import BidComponent from "@/components/Bid";
import ImagesDisplay from "@/components/ImagesDisplay";
import Countdown from "@/components/countdown";
import db from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { Separator } from "@radix-ui/react-separator";
import { differenceInMilliseconds } from "date-fns";
import { redirect } from "next/navigation";
import { CircleDollarSign } from "lucide-react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import ShareButton from "@/components/ShareButton";
import { Button } from "@/components/ui/button";
import AddToCart from "@/components/AddToCart";

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
  const { userId } = auth();
  if (auction == null) {
    redirect("/");
  }
  const bids = auction?.bids;
  const highestBid = bids.length > 0 ? auction.bids[0] : null;

  const now = new Date();
  const endDate = new Date(auction.endDate);
  const initialTimeRemaining = Math.max(
    0,
    differenceInMilliseconds(endDate, now)
  );
  const auctionEnded = auction.isEnded;

  const emailSent = auction.isEmailSent;

  // if (initialTimeRemaining <= 0 && !emailSent && highestBid) {
  //   const winnerData = {
  //     auctionId: params.auctionId,
  //     winnerEmail: highestBid.user.email,
  //     winnerName: highestBid.user.name,
  //     highestBid: highestBid.amount,
  //     auctionName: auction.title,
  //     userId: highestBid.userId,
  //   };
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_URL}/api/notifyWinner`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(winnerData),
  //       }
  //     );
  //     const data = await response.json();
  //     console.log(data.message);

  //     await db.auction.update({
  //       where: { id: params.auctionId },
  //       data: { isEnded: true },
  //     });
  //   } catch (error) {
  //     console.error("Error notifying winner:", error);
  //   }
  // } else if (initialTimeRemaining <= 0 && !auctionEnded) {
  //   try {
  //     await db.auction.update({
  //       where: { id: params.auctionId },
  //       data: { isEnded: true },
  //     });
  //   } catch (error) {
  //     console.log("Error updating the auction: ", error);
  //   }
  // }

  return (
    <>
      {auction && (
        <div className="bg-gray-100 dark:bg-neutral-900 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
            <div className="flex gap-5  m-5 flex-wrap md:flex-nowrap">
              {" "}
              <ImagesDisplay images={auction.images} />
              <div className="px-4 py-5 sm:px-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white ">
                  {auction.title}
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-white mb-4">
                  {auction.description}
                </p>
                <p className="mt-2 text-md text-gray-600 dark:text-white">
                  <span className="font-semibold">Starting Price:</span> $
                  {auction.startingPrice}
                </p>
                <p className="mt-2 text-md text-gray-600 dark:text-white">
                  <span className="font-semibold">Highest Bid:</span> $
                  {highestBid ? highestBid.amount : auction.startingPrice}
                </p>
                <p className="mt-2 text-md text-gray-600 dark:text-white">
                  <span className="font-semibold">Total Bids: </span>
                  {bids && bids.length > 0 && bids.length}
                </p>

                {initialTimeRemaining > 0 ? (
                  <Countdown
                    endDate={auction.endDate}
                    initialTime={initialTimeRemaining}
                  />
                ) : (
                  <p className="mt-2 text-red-600 text-semibold text-lg">
                    Auction is closed
                  </p>
                )}

                <SignedIn>
                  {initialTimeRemaining > 0 && !auctionEnded && (
                    <BidComponent
                      auctionId={auction.id}
                      startingPrice={auction.startingPrice}
                    />
                  )}
                </SignedIn>
                <SignedOut>
                  {!auctionEnded && (
                    <p className="text-md my-2 text-yellow-600 font-semibold">
                      Plz sign in to place bids!!
                    </p>
                  )}
                </SignedOut>
              </div>
            </div>
            <div className="flex items-center flex-wrap">
              <ShareButton />
              <AddToCart
                auctionEnded={auctionEnded}
                auctionId={auction.id}
                userId={userId}
              />
            </div>
            <div className="px-4 py-5 sm:px-6">
              {bids && bids.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {/* {bids.map((bid, index) => (
                    <div key={index}>
                      <li className="text-lg flex items-center gap-1  p-2 rounded-md  cursor-pointer">
                        <CircleDollarSign className=" text-yellow-600" />
                        <span className="font-semibold">Bid:</span>${bid.amount}{" "}
                        by {bid.user.name}
                      </li>
                    </div>
                  ))} */}

                  <p className="text-lg text-gray-700 my-2 font-bold">
                    {auctionEnded ? "Winner:" : "Top Bid:"}
                  </p>
                  <li className="text-lg flex items-center gap-1  p-2 rounded-md  cursor-pointer">
                    <CircleDollarSign className=" text-yellow-600" />
                    <span className="font-semibold">Bid:</span>$
                    {highestBid?.amount} by {highestBid?.user.name}
                  </li>
                </ul>
              ) : (
                <p className="text-sm text-gray-600">No bids yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
