import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Auction App",
  description: "A cool auction app, Place your bids right now!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <MainNav />
          {children}
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
