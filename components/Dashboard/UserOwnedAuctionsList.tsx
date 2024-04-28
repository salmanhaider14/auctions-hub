"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import { deleteAuction } from "@/actions/actions";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "../ui/use-toast";

const UserOwnedAuctionsList = ({ auctions }: { auctions: any }) => {
  const itemsPerPage = 8; // Adjust as needed
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(auctions.length / itemsPerPage);

  const indexOfLastAuction = currentPage * itemsPerPage;
  const indexOfFirstAuction = indexOfLastAuction - itemsPerPage;
  const currentAuctions = auctions.slice(
    indexOfFirstAuction,
    indexOfLastAuction
  );
  const { toast } = useToast();

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleDelete = async (auctionId: string) => {
    try {
      await deleteAuction(auctionId);
      toast({
        title: `Auction ${auctionId} deleted successfully`,
      });
    } catch (error) {
      toast({
        title: `Ops! Something went wrong`,
        variant: "destructive",
      });
      console.error("Error deleting Auction", error);
    }
  };
  return (
    <div>
      {" "}
      <Table>
        <TableCaption>A list of your listed auctions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Starting Price</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Ended</TableHead>
            <TableHead className="text-right">Purchased</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentAuctions?.map((auction: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {auction?.auction.id}
              </TableCell>
              <TableCell>{auction?.auction.title}</TableCell>
              <TableCell>{auction?.auction.startingPrice}</TableCell>
              <TableCell>{auction?.auction.endDate.toDateString()}</TableCell>
              <TableCell>{String(auction?.auction.isEnded)}</TableCell>
              <TableCell className="text-right">
                {String(auction?.auction.purchased)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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

export default UserOwnedAuctionsList;
