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
const AuctionsList = ({ auctions }: { auctions: any }) => {
  const itemsPerPage = 8; // Adjust as needed
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(auctions.length / itemsPerPage);

  const indexOfLastAuction = currentPage * itemsPerPage;
  const indexOfFirstAuction = indexOfLastAuction - itemsPerPage;
  const currentAuctions = auctions.slice(
    indexOfFirstAuction,
    indexOfLastAuction
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentAuctions.map((auction: any) => (
          <Link key={auction.id} href={`/auction/${auction.id}`}>
            <Card className="w-64 h-auto">
              <CardHeader>
                <CardTitle>{auction.title}</CardTitle>
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
                </div>
              </CardFooter>
            </Card>
          </Link>
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
