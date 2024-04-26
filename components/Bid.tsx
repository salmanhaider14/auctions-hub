"use client";
import { createBid } from "@/actions/actions";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

const BidComponent = ({
  auctionId,
  startingPrice,
}: {
  auctionId: string;
  startingPrice: number;
}) => {
  const [bidAmount, setBidAmount] = useState(startingPrice + 1); // Set initial bid amount to starting price + 1
  const [isBidding, setIsBidding] = useState(false);
  const { userId } = useAuth();

  const handleBid = async () => {
    if (bidAmount <= startingPrice) {
      console.error(
        "Bid amount must be greater than current highest bid or starting price."
      );
      return;
    }

    try {
      setIsBidding(true); // Set isBidding to true when bidding starts
      if (userId) {
        await createBid(bidAmount, auctionId, userId);
        console.log("Bid Created Successfully");
        // Increment bid amount for next bid
        setBidAmount(bidAmount + 1);
      }
    } catch (error) {
      console.error("Error creating bid", error);
    } finally {
      setIsBidding(false); // Reset isBidding to false after bidding completes or encounters an error
    }
  };

  return (
    <div className="mt-4">
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(parseInt(e.target.value))}
        placeholder="Enter your bid"
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <button
        onClick={handleBid}
        className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isBidding ? "Bidding..." : "Bid"}
      </button>
      {isBidding && (
        <p className="mt-2 text-sm text-gray-600">Bidding in progress...</p>
      )}
    </div>
  );
};

export default BidComponent;
