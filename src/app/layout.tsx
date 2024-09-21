import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@components/layout/navbar/navbar";
// import NavigationMobile from "./components/layout/navbar/mobile/navbarMobile";
import { Toaster } from "react-hot-toast";
const poppins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800"], subsets: ["latin", "latin-ext"] });

export const metadata = {
  title: "Socials",
  description: "All your socials in one place",
  generator: "Next.js",
  manifest: "/manifest.json",
  // keywords: ["nextjs", "nextjs14", "next14", "pwa", "next-pwa"],
  // themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  // authors: [
  //   { name: "Alldo Faiz Ramadhani" },
  //   {
  //     name: "Alldo Faiz Ramadhani",
  //     url: "https://www.linkedin.com/in/alldofaiz/"
  //   }
  // ],
  // viewport: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  // icons: [
  //   { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
  //   { rel: "icon", url: "icons/icon-128x128.png" }
  // ]
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
