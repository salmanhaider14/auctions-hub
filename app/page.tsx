import AuctionsList from "@/components/AuctionsList";
import db from "@/utils/db";

export default async function Home() {
  const auctions = await db.auction.findMany();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Discover Exciting Auctions
        </h1>
        <p className="text-lg text-gray-600 text-center">
          Uncover treasures and unique finds in our diverse auction listings.
        </p>
        <p className="text-sm text-gray-600 text-center mt-2">
          Welcome to our auction platform, where every bid tells a story.
          Explore a wide array of items ranging from rare collectibles to
          everyday essentials. Whether you're a seasoned collector or a curious
          browser, there's something for everyone. Start your journey today and
          bid on your next adventure!
        </p>
      </header>

      {/* Auctions List */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <AuctionsList auctions={auctions} />
      </main>
    </div>
  );
}
