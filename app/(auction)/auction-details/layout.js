import { Inter } from "next/font/google";
import "../../globals.css";
import Header from "../../components/header.js";
import Footer from "../../components/footer.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auction details",
  description: "Auction details page for DietiDeals24UCM",
};

export default function AuctionDetailsLayout({ children}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header headerType={"headerLoggedPartial"} />
      <main className="flex-1">{children}</main>
      <Footer/>
    </div>
  );
}