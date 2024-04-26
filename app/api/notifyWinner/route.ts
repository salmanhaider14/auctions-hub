import db from "@/utils/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
  const { auctionId, winnerEmail, winnerName, highestBid } = await req.json();

  const mailOptions = {
    from: "salmanpatrick@gmail.com",
    to: winnerEmail,
    subject: "You won the auction!",
    html: `
      <p>Hi ${winnerName},</p>
      <p>We are thrilled to inform you that you have won the auction for item ${auctionId}!</p>
      <p>Please follow these steps to claim your prize: (Provide instructions here)</p>
      <p>Thank you for participating in our auction!</p>
      <p>Sincerely,</p>
      <p>The Auction Platform Team</p>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result.response);
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
