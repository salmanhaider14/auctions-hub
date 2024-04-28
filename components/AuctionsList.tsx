"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { format } from "date-fns";
import {} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { EllipsisVertical, LucideShoppingCart } from "lucide-react";
import { addToCart } from "@/actions/actions";
import { useToast } from "./ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
const AuctionsList = ({ auctions }: { auctions: any }) => {
  const itemsPerPage = 8; // Adjust as needed
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const filteredAuctions = auctions.filter((auction: any) => {
    return (
      auction.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!priceFilter || auction.startingPrice <= parseFloat(priceFilter))
    );
  });
  const totalPages = Math.ceil(auctions.length / itemsPerPage);

  const indexOfLastAuction = currentPage * itemsPerPage;
  const indexOfFirstAuction = indexOfLastAuction - itemsPerPage;
  const currentAuctions = filteredAuctions.slice(
    indexOfFirstAuction,
    indexOfLastAuction
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const { userId } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const handleAddToCart = async (auctionId: string) => {
    if (!userId) {
      router.push(`${process.env.NEXT_PUBLIC_URL}/sign-in`);
    } else {
      try {
        await addToCart(auctionId, userId);
        toast({
          title: "Item added to the watchlist",
        });
        router.refresh();
      } catch (error) {
        toast({
          title: "Ops something went wrong",
          variant: "destructive",
        });
        console.error("Error while addint to watchlist:", error);
      }
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search auctions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />

        {/* Price Filter */}
        <Popover>
          <PopoverTrigger>
            <EllipsisVertical />
          </PopoverTrigger>
          <PopoverContent>
            {" "}
            <input
              type="number"
              placeholder="Max Price"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentAuctions.map((auction: any) => (
          <Card className="w-64 h-auto" key={auction.id}>
            <Link href={`/auction/${auction.id}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-around">
                  {auction.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-40 overflow-hidden rounded-lg">
                  <Image
                    src={auction.images[0]}
                    alt="Auction Image"
                    objectFit="cover"
                    width={250}
                    height={150}
                  />
                </div>
              </CardContent>
            </Link>
            <CardFooter>
              <div className="flex-col">
                <p>
                  <span className=" font-semibold">Starting Price:</span>{" "}
                  {auction.startingPrice}$
                </p>
                {auction.isEnded ? (
                  <p className=" text-red-600 font-semibold">
                    Auction Is Closed
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">End Date: </span>
                    {format(auction.endDate, "d HH:MM:SS")}
                  </p>
                )}
                {!auction.isEnded && (
                  <Button
                    variant={"secondary"}
                    className="my-2 flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent Link navigation
                      handleAddToCart(auction.id); // Add to Cart function
                    }}
                  >
                    Add to Cart <LucideShoppingCart />
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={() => paginate(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default AuctionsList;
