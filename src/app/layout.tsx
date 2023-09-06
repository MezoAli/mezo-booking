import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Providers from "@/components/Providers";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mezo Booking",
  description:
    "book your best hotel rooms where you can find peace and make yourself at your home",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers session={session}>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
