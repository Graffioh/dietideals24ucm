import { Inter } from "next/font/google";
import "../../globals.css";
import Header from "../../../components/dietideals24-ui/header.js";
import Footer from "../../../components/dietideals24-ui/footer.js";

import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auction details",
  description: "Auction details page for DietiDeals24UCM",
};

export default async function AuctionDetailsLayout({ children }) {
  function getTokenFromCookie() {
    const nextCookies = cookies();

    const tokenCookieStr = nextCookies.has("auth-token")
      ? nextCookies.get("auth-token").value
      : '"no-token"';

    // return token without "..."
    return tokenCookieStr.replaceAll('"', "");
  }

  const authToken = getTokenFromCookie();

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header headerType={authToken === "no-token" ? "headerEmpty" : "headerLoggedPartial"} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
