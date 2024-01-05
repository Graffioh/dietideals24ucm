import { cookies } from "next/headers";

import { Inter } from "next/font/google";
import "../globals.css";
import Header from "../components/header.js";
import Footer from "../components/footer.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DietiDeals24",
  description: "Home page for DietiDeals24UCM",
};

export default function HomeLayout({ children }) {
  const nextCookies = cookies();

  const tokenCookieStr = nextCookies.has("token")
    ? nextCookies.get("token").value
    : '"no-token"';

  // return token without "..."
  const token =  tokenCookieStr.replaceAll('"', "");

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header headerType={"headerLoggedFull"} token={token} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
