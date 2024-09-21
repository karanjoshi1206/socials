import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@components/layout/navbar/navbar";
import NavigationMobile from "./components/layout/navbar/mobile/navbarMobile";
import { Toaster } from "react-hot-toast";
const poppins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800"], subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "Socials",
  description: "All your socials in one place"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} dark`}>
        <Navbar />
        {/* <NavigationMobile /> */}
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
