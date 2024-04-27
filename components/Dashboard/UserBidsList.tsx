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
import { deleteBid } from "@/actions/actions";
import { useToast } from "../ui/use-toast";
import { Pencil, Trash } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";

const UserBidsList = ({ bids }: { bids: any }) => {
  const itemsPerPage = 8; // Adjust as needed
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(bids.length / itemsPerPage);

  const indexOfLastAuction = currentPage * itemsPerPage;
  const indexOfFirstAuction = indexOfLastAuction - itemsPerPage;
  const currentBids = bids.slice(indexOfFirstAuction, indexOfLastAuction);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const { toast } = useToast();
  const handleDelete = async (bidId: string) => {
    try {
      await deleteBid(bidId);
      toast({
        title: `Bid ${bidId} deleted successfully`,
      });
    } catch (error) {
      toast({
        title: `Ops! Something went wrong`,
        variant: "destructive",
      });
      console.error("Error deleting Bid", error);
    }
  };
  return (
    <div>
      {" "}
      <Separator />
      <Table>
        <TableCaption>A list of your placed bids.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Auction Title</TableHead>
            <TableHead>Placed At</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentBids?.map((bid: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{bid.id}</TableCell>
              <TableCell>{bid.amount}$</TableCell>
              <TableCell>{bid.auction.title}</TableCell>

              <TableCell>{bid.createdAt.toDateString()}</TableCell>
              <TableCell className="text-right flex items-center gap-2">
                <Trash
                  color="red"
                  onClick={() => handleDelete(bid.id)}
                  className="cursor-pointer"
                />
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

export default UserBidsList;
