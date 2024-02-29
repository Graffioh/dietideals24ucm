import { cookies } from "next/headers";

import { Inter } from "next/font/google";
import "../../globals.css";
import Header from "../../components/header.js";
import Footer from "../../components/footer.js";
import getCurrentUserServer from "@/app/(auth)/getCurrentUserServer";

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

  const currentUser = await getCurrentUserServer();

  function isUserAdult(birthDateString) {
    var birthDate = new Date(birthDateString);
    var currentDate = new Date();

    var age = currentDate.getFullYear() - birthDate.getFullYear();
    var m = currentDate.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18;
  }
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header
        headerType={
          isUserAdult(currentUser ? currentUser.birthDate : new Date())
            ? "headerLoggedFull"
            : "headerLoggedPartial"
        }
        token={authToken}
      />
      <main className="flex-1 z-0">{children}</main>
      <Footer />
    </div>
  );
}
