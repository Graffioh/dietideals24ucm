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

  const tokenCookieStr = nextCookies.has("token")
    ? nextCookies.get("token").value
    : '"no-token"';

  // return token without "..."
  const token = tokenCookieStr.replaceAll('"', "");

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
          isUserAdult(currentUser.birthDate)
            ? "headerLoggedFull"
            : "headerLoggedPartial"
        }
        token={token}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
