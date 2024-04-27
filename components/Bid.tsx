"use client";
import { createBid } from "@/actions/actions";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

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
      <Input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(parseInt(e.target.value))}
        placeholder="Enter your bid"
        className=" w-full "
      />
      <Button
        onClick={handleBid}
        disabled={isBidding}
        className="mt-2 bg-indigo-600 hover:bg-indigo-700 w-20 "
      >
        {isBidding ? "Bidding..." : "Place Bid"}
      </Button>
    </div>
  );
};

export default BidComponent;
