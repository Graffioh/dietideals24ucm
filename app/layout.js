import { Inter } from "next/font/google";
import "./globals.css";

import { CookiesProvider } from "next-client-cookies/server";
import { FilterProvider } from "./filterProvider";
import { UserProvider } from "./(auth)/userProvider";


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
            <FilterProvider>
              <main className="flex-1">{children}</main>
            </FilterProvider>
          </UserProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
