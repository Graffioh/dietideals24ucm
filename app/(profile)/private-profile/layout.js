import { Inter } from "next/font/google";
import "../../globals.css";
import Header from "../../../components/dietideals24-ui/header.js";
import Footer from "../../../components/dietideals24-ui/footer.js";

import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Private Profile",
  description: "private profile page for DietiDeals24UCM",
};

export default function PrivateProfileLayout({ children }) {
  function getTokenFromCookie() {
    const nextCookies = cookies();

    const tokenCookieStr = nextCookies.has("auth-token")
      ? nextCookies.get("auth-token").value
      : '"no-token"';

    // return token without "..."
    return tokenCookieStr.replaceAll('"', "");
  }

  const token = getTokenFromCookie();
  
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header headerType={token !== "no-token" ? "headerPrivateProfile" : "headerEmpty"} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
