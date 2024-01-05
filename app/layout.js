import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header.js";
import Footer from "./components/footer.js";

import { CookiesProvider } from 'next-client-cookies/server';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DietiDeals24",
  description: "DietiDealsUCM description",
  icon: "favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <CookiesProvider>
      <html lang="en">
        <head />
        <body>
          <main className="flex-1">{children}</main>
        </body>
      </html>
    </CookiesProvider>
  );
}
