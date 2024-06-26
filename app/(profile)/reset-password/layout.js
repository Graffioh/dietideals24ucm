import { Inter } from "next/font/google";
import "../../globals.css";
import Header from "../../../components/dietideals24-ui/header.js";
import Footer from "../../../components/dietideals24-ui/footer.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Reset password",
  description: "Reset password page for DietiDeals24UCM",
};

export default function ResetPasswordLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header headerType={"headerLoggedPartial"} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
