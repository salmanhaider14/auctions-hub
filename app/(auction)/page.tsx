import db from "@/utils/db";
import Link from "next/link";

export default async function Home() {
  const auctions = await db.auction.findMany();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800">Auctions</h1>
        </div>
      </header>

      {/* Auctions List */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {auctions.map((auction) => (
            <Link key={auction.id} href={`/auction/${auction.id}`}>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
                <h2 className="text-lg font-semibold text-gray-800">
                  {auction.title}
                </h2>
                <p className="text-sm text-gray-600">
                  Current Price: ${auction.startingPrice}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
