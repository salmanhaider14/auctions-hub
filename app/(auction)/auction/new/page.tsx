"use client";
import { createAuction } from "@/actions/actions";
import db from "@/utils/db";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

interface AuctionForm {
  title: string;
  description: string;
  startingPrice: number;
  reservePrice: number;
  endDate: string;
}

const CreateAuction = () => {
  const [form, setForm] = useState<AuctionForm>({
    title: "",
    description: "",
    startingPrice: 0,
    reservePrice: 0,
    endDate: "",
  });
  const { userId } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsSubmitting(true); // Set isSubmitting to true when form is being submitted
      if (userId != null) {
        await createAuction({ ...form, userId });
        console.log("Auction created successfully");
        // Reset form after successful submission
        setForm({
          title: "",
          description: "",
          startingPrice: 0,
          reservePrice: 0,
          endDate: "",
        });
      }
    } catch (error) {
      console.error("Error creating auction:", error);
    } finally {
      setIsSubmitting(false); // Reset isSubmitting after submission completes
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-6 pb-8 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">Create Auction</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="block">
          <span className="text-gray-700">Title:</span>
          <input
            type="text"
            value={form.title}
            onChange={(event) =>
              setForm({ ...form, title: event.target.value })
            }
            className="block w-full p-2 text-sm text-gray-700 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Description:</span>
          <textarea
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
            className="block w-full p-2 text-sm text-gray-700 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Starting Price:</span>
          <input
            type="number"
            value={form.startingPrice}
            onChange={(event) =>
              setForm({ ...form, startingPrice: event.target.valueAsNumber })
            }
            className="block w-full p-2 text-sm text-gray-700 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Reserve Price:</span>
          <input
            type="number"
            value={form.reservePrice}
            onChange={(event) =>
              setForm({ ...form, reservePrice: event.target.valueAsNumber })
            }
            className="block w-full p-2 text-sm text-gray-700 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">End Date:</span>
          <input
            type="datetime-local"
            value={form.endDate}
            onChange={(event) =>
              setForm({ ...form, endDate: event.target.value })
            }
            className="block w-full p-2 text-sm text-gray-700 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </label>

        <button
          type="submit"
          className={`${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-700"
          } text-white font-bold py-2 px-4 rounded`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Auction..." : "Create Auction"}
        </button>
      </form>
    </div>
  );
};

export default CreateAuction;
