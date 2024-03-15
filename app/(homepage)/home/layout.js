import { cookies } from "next/headers";

import { Inter } from "next/font/google";
import "../../globals.css";
import Header from "../../components/header.js";
import Footer from "../../components/footer.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DietiDeals24",
  description: "Home page for DietiDeals24UCM",
};

export default async function HomeLayout({ children }) {
  const nextCookies = cookies();

  const tokenCookieStr = nextCookies.has("auth-token")
    ? nextCookies.get("auth-token").value
    : '"no-token"';

  // return token without "..."
  const authToken = tokenCookieStr.replaceAll('"', "");

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header headerType={"headerLogged"} token={authToken} />
      <main className="flex-1 z-0">{children}</main>
      <Footer />
    </div>
  );
}