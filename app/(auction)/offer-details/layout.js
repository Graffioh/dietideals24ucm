import { Inter } from "next/font/google";
import "../../globals.css";
import Header from "../../components/header.js";
import Footer from "../../components/footer.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "offer details",
  description: "offer details page for DietiDeals24UCM",
};

export default function OfferDetailsLayout({ children}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header headerType={"headerLoggedPartial"} />
      <main className="flex-1">{children}</main>
      <Footer/>
    </div>
  );
}