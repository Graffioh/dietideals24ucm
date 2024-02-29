import { Inter } from "next/font/google";
import "./globals.css";

import { CookiesProvider } from "next-client-cookies/server";
import { UserProvider } from "./providers/userProvider";
import { Toaster } from "@/components/ui/sonner";
import { AuctionFilterProvider } from "./providers/auctionFilterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DietiDeals24",
  description: "DietiDealsUCM description",
  icon: "favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <CookiesProvider>
          <UserProvider>
            <AuctionFilterProvider>
              <main className="flex-1">{children}</main>
              <Toaster />
            </AuctionFilterProvider>
          </UserProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
