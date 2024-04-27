import db from "@/utils/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "salmanpatrick5@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request, res: NextResponse) {
  const { auctionId, winnerEmail, winnerName, highestBid, auctionName } =
    await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    metadata: {
      auctionId,
    },
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: auctionName,
            description: `Payment for auction ${auctionId} : ${auctionName}`,
          },
          unit_amount: Math.round(highestBid * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/auction/${auctionId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/auction/${auctionId}`,
  });

  const mailOptions = {
    from: "salmanpatrick@gmail.com",
    to: winnerEmail,
    subject: "You won the auction!",
    html: `
      <p>Hi ${winnerName},</p>
      <p>We are thrilled to inform you that you have won the auction for item ${auctionId}!</p>
      <p>To complete your purchase, please use this link to pay securely via Stripe:</p>
        <a href="${session.url}">Pay for Auction ${auctionId}</a>
      <p>Thank you for participating in our auction!</p>
      <p>Sincerely,</p>
      <p>The Auction Platform Team</p>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result.response);
    await db.auction.update({
      where: { id: auctionId },
      data: { isEmailSent: true },
    });
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 500 }
    );
  }
}
