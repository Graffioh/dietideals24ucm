import { Inter } from "next/font/google";
import "../../globals.css";
import Header from "../../../components/dietideals24-ui/header.js";
import Footer from "../../../components/dietideals24-ui/footer.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create account",
  description: "Create Account page for DietiDeals24UCM",
};

export default function CreateAccountLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header headerType={"headerEmpty"} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
