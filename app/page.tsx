import db from "@/utils/db";

export default async function Home() {
  const auctions = await db.auction.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {auctions.map((auction) => (
        <h1 key={auction.id}>{auction.title}</h1>
      ))}
    </main>
  );
}
