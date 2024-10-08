import db from "@/utils/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const event = await stripe.webhooks.constructEvent(
      await req.text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "checkout.session.completed") {
      const checkout = event.data.object;
      const auctionId = checkout.metadata?.auctionId;
      const userId = checkout.metadata?.userId;

      const updatedAuction = await db.auction.update({
        where: {
          id: auctionId,
        },
        data: {
          purchased: true,
        },
      });

      if (userId && auctionId) {
        const userOwnedAuction = await db.userOwnedAuction.create({
          data: {
            userId: userId,
            auctionId: auctionId,
          },
        });
        console.log("UserOwnedAuction created:", userOwnedAuction.id);
      }

      console.log("Auction Purchased:", updatedAuction.id);
    }
    return Response.json({ message: "Webhook Listening" });
  } catch (error) {
    console.error("Webhook Error:", error);
  }
}
